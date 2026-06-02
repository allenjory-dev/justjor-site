---
title: "How I built a voice-controlled golf score tracker in a day"
description: "Meta sunglasses to WhatsApp to a Python bot to my Obsidian vault. Hands-free score, putts, and clubs while I play. Plus the hallucination bug that almost wrecked it."
pubDate: 2026-06-02
tags: ["life-os", "golf", "ai-agents", "voice-ui", "case-study"]
---

I'm playing nine holes at Confederation Park this Friday. My subscription to 18Birdies expires in August. So today I built the replacement.

Not a full replacement — I'll come back to why — but the part that actually matters: a hands-free voice-controlled score tracker that runs through my Meta Vanguard sunglasses, talks to my Life OS bot, and writes a clean scorecard to my Obsidian vault. Built and tested in a single afternoon.

This is the story of that build, including the part where the bot lied to me for ten minutes before I noticed.

## The setup

I've been building a personal AI assistant called **Life OS** for about a year. Python, Anthropic Claude API, ~108 tools across 20 modules. Talks to me via Telegram, WhatsApp, and my Meta Vanguard sunglasses. Runs 24/7 on my Windows laptop in the basement.

The architecture is the part that matters here:

```
Meta Vanguard glasses
        ↓ (Hey Meta, send WhatsApp to Life OS Bot, ...)
WhatsApp
        ↓ webhook
Cloudflare Tunnel (lifeos.justjor.me)
        ↓
whatsapp_bridge.py (FastAPI)
        ↓
agent_core.py (Claude + 108 tools)
        ↓
Obsidian vault, Calendar, Garmin, Gmail, ledgers, ...
```

The glasses are just a microphone and a speaker. The bot is the brain. Adding a new capability means adding a new tool — Claude figures out when to call it from the user's natural speech.

So building "golf score tracking" is really:

1. Decide what tools the bot needs
2. Write the Python functions
3. Wire them into the tool registry
4. Teach the bot via the system prompt when to use them
5. Restart

That's it.

## What got built

Nine tools, plus three more for post-round queries:

- `start_round(course)` — begins a round, loads par/yardage data
- `took_a_shot(club?)` — logs a stroke, optionally captures which club
- `took_a_putt()` — logs a putt (putts are also strokes)
- `undo_last_shot()` — rolls back the last entry
- `current_score()` — running score vs par
- `next_hole()` — advance to next hole
- `current_hole()` — what hole am I on
- `complete_hole(strokes, putts)` — finalize a hole, advance
- `end_round()` — write scorecard to vault, archive round JSON
- `get_last_round()` — read back the most recent completed round
- `get_recent_rounds(count)` — summary of last N rounds for trends

Voice flow during a round looks like this:

> "Hey Meta, send WhatsApp to Life OS Bot, **shot driver.**"
> *Driver logged, 1 stroke.*
> "Hey Meta, send WhatsApp to Life OS Bot, **shot 7 iron.**"
> *7 iron logged, 2 strokes.*
> "Hey Meta, send WhatsApp to Life OS Bot, **took a putt.**"
> *1 putt, 3 total.*
> "Hey Meta, send WhatsApp to Life OS Bot, **complete hole, 4 with 2 putts.**"
> *Hole 1 bogey logged. Hole 2 next, par 3, 150 yards.*

After the round, the bot writes a markdown scorecard to my vault with a row per hole including which clubs I used. Then I can ask it later: *"what did I shoot on Friday? what clubs did I use on hole 4? how does this compare to my last round?"* — and it answers from the archived data.

## The pivot that almost didn't happen

My first design included a custom **distance-to-pin** feature. The glasses would say "how far am I from the pin," the bot would pull my phone's GPS via an iOS Shortcut posting to a `/gps` endpoint every 60 seconds, compute the Haversine distance to a pin coordinate I'd pre-calibrated, and read back the yardage.

I built all of it. iOS Shortcut, FastAPI endpoint, the math, the works. Spent about an hour on it.

Then I asked a basic research question I should have asked first: *can 18Birdies do this through my glasses already?*

Turns out yes. 18Birdies became a launch partner for Meta's new **Wearables Device Access Toolkit** in 2026. Real-time yardages, club recommendations, social capture — pushed natively to the glasses from a course database with 43,000+ courses pre-mapped. My Fenix 7 Pro also has Garmin Golf built in with the same course library.

Two existing tools do this better than anything I could realistically build. I deleted my GPS code.

The lesson: when the cheap glance gives you the answer, take the answer. Building a worse version of a paid tool you already pay for is just self-flattery.

So distance lives on my wrist (Fenix 7 Pro). Score lives in voice (Life OS bot). The split is the system.

## The bug that lied to me

After I built v1 and restarted the bot, I did a Telegram dry-run. The bot replied perfectly to everything:

- "Driver logged, 1 stroke."
- "7 iron logged, 2 strokes."
- "1 putt, 3 total."
- "Hole 1 bogey logged. Hole 2 next, par 3, **165 yards.**"

Beautiful. Confident replies, correct format. I was about to celebrate.

Then I checked the audit log. It only contained one entry: `start_round`. None of the shots, putts, or hole completions had actually been recorded as tool calls. The active round JSON file was also untouched — strokes still zero on hole 1.

The bot had hallucinated every reply after start_round. It was generating plausible-sounding responses without calling the tools.

The smoking gun: hole 2 in my course data is 150 yards, not 165. But the system prompt I'd written had an example reply that mentioned "165" (for hole 4, in a sentence demonstrating the reply format). Claude was pattern-matching the example numbers into its replies instead of using the actual tool returns.

This is a known LLM failure mode but it bit hard because the replies looked so confident. If I hadn't checked the audit log I would have walked onto the course Friday and discovered the bug while my buddies watched.

The fix was a prompt rewrite. Three things:

1. **Absolute rule at the top**: "ALWAYS call the tool first. The tool's return values are the ONLY source of truth for numbers. Do NOT invent numbers."
2. **Replaced all specific number examples with format placeholders** — `{yardage}`, `{vs_par}`, `{strokes}`. You can't pattern-match a placeholder.
3. **For each tool, listed exactly which fields it returns** so Claude knows where the real values come from.

Restarted, re-tested. The audit log now shows every tool call. Reply numbers match the data. Hole 2 says 150 yards. The bug is dead.

## Transcription tax

The second problem with voice through glasses is that transcription is messy. My second test produced replies like *"Took a pot — did you mean putt?"* and *"And round — did you mean end round?"* That kind of clarification round-trip is fine over Telegram but kills the flow when you're holding a club waiting to hit.

So I added a section to the golf-mode prompt that lists common transcription mishears and tells the bot to silently auto-correct them in golf context without asking:

- `pot` / `pots` → `putt` / `putts` (always, there are no pots in golf)
- `whole` → `hole`
- `and round` / `either end` → `end round`
- `for` → `4`, `to` → `2`, `tree` → `3`, `ate` → `8` (in number context)
- Phonetic club variants: `pee dub` → `pitching wedge`, `ess dub` → `sand wedge`, `tree wood` → `3 wood`, etc.

The retest after this change produced a reply for *"complete whole 42 pots"* that correctly logged a bogey with 2 putts and advanced to hole 2 — without asking a single clarification question. The bot inferred the user meant *"complete hole, 4 strokes, 2 putts"* and just acted.

That's the difference between a system that demos well and a system that works on the course.

## The architecture that matters

The reason this came together in a single day is that almost none of it was new infrastructure. The hard pieces had already been built for other modules:

- The **WhatsApp bridge** was built months ago for general voice-to-bot interaction
- The **Cloudflare Tunnel** has been forwarding `lifeos.justjor.me` traffic for weeks
- The **108-tool registry** with audit logging, cost capping, and shared state was already there
- The **Obsidian write tools** already exist for meal tracking, diary, and finance
- The **daily smoke test** I built earlier this week catches silent failures across all of it

Adding golf was just plugging another 11 tools into a bus that was already running. The whole module is about 750 lines of Python plus a short addition to the system prompt.

## Why this matters more than score tracking

The unique thing my Life OS does — that no off-the-shelf golf app can do — is correlate the round with **everything else it already knows about me**. After a round, the bot can read my Garmin's HRV, sleep score, body battery, and training load from the same day. It can pull weather conditions. It knows what I ate and when I slept.

By August, when 18Birdies expires, I want to be able to ask:

> "Why was my driver short today?"

…and get back something like:

> *"HRV was down 22% from your 7-day baseline, sleep score was 64, body battery started at 47. Your driver carry on full swings averaged 218 yards over the last 3 rounds; today's average was 204. Recovery profile suggests fatigue, not technique."*

No commercial golf app can answer that question. They don't have my Garmin data or my sleep data. They don't know me. My Life OS does.

That's the angle. Friday's round is just the first 27 data points of clubs and distances. The system gets smarter every round.

## Open questions I'm still thinking about

- **Should `undo` reverse a completed hole?** Right now it only undoes individual shots on the current hole, which isn't what a user would naturally expect after `complete_hole` advances.
- **Should the bot proactively ask about clubs?** Right now club logging is opt-in per shot. The friction of always naming the club might hurt adoption — but without it the V2 caddie can't be built.
- **Does the bot need a "caddie mode" vs a "command mode"?** Right now everything is command mode (terse). Asking "what club should I use for 148 yards into a headwind" should produce a slightly more thoughtful reply once I have club distance averages.

These are V2 problems. V1 ships Friday.

---

*If you want to follow this and the rest of the build, longer journals are on the [JustJor YouTube channel](https://www.youtube.com/@realjustjor), and the rest of the writing lives [on the blog](/blog).*
