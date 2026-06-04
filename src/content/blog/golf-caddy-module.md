---
title: "How I built a voice-controlled golf caddy in a day"
description: "I talk to my sunglasses, my AI bot logs every shot, and now it learns my club distances. No phone, no tapping. Plus the time the bot lied to me for ten minutes."
pubDate: 2026-06-02
tags: ["life-os", "golf", "ai-agents", "case-study"]
---

I had a nine-hole round coming up and my golf app subscription was on the way out. So I built something to replace the part that actually matters.

I can talk to my sunglasses, and my AI bot logs every shot for me. No phone. No tapping. Just play.

## How it works

I use a voice-enabled wearable with a microphone and speaker. For the past year I've been building a personal AI assistant called **Life OS** that helps organize private logs, notes, scheduling, and day-to-day decisions.

Adding golf meant teaching the bot a few new tricks. Now during a round I can say short commands like:

> "Shot driver."
> *Driver logged, 1 stroke.*
>
> "Took a putt."
> *1 putt, 3 total.*
>
> "Complete hole, 4 with 2 putts."
> *Hole 1 bogey logged. Hole 2 next.*

At the end of the round, the bot writes a full scorecard to my notes — including which club I used on every shot.

Since the first build, I added a few things that made it feel less like a toy and more like a real golf buddy:

- **Smarter score handling.** The bot now treats the tool output as the source of truth, so it doesn't freestyle the par/bogey label in chat.
- **Safer putt tracking.** If I say a messy phrase like "two putt, finish the hole," the system is harder to trick into dropping those strokes.
- **Cancel and undo.** Test rounds can be thrown away, and bad voice entries can be removed without saving junk to the scorecard.
- **Tee-aware course setup.** Instead of assuming every hole is the same shape, the round can load the right tee/par context.
- **Club-distance learning.** I can log how far a club actually went, then ask for a club suggestion later based on my own median distances.

## The time the bot lied to me

First test, the bot replied perfectly to everything. Strokes logged, putts counted, holes completed. I was about to call it done.

Then I checked the records. **Nothing was actually saved.** The bot had been making up answers for ten minutes straight.

The reason: I'd given it examples of what good replies look like, and the lazy AI decided it was easier to copy the examples than to actually do the work.

The fix was rewriting the bot's instructions to say *"call the tool first, every time, always."* Tested again — clean. Every shot logged. No more fake replies.

## Why this matters

Other golf apps know what a typical golfer does. Mine knows what *I* do.

Eventually, after a round, I'll be able to ask my bot *"why was my driver short today?"* and get back a useful answer based on recovery, fatigue, and recent training context.

Most golf apps know what a typical golfer does. Mine can learn from my own patterns without publishing the private inputs.

The first round is just the first batch of data. Every range session and every round makes it smarter.

---

*More writing [on the blog](/blog). Travel videos on the [JustJor YouTube channel](https://www.youtube.com/@realjustjor).*
