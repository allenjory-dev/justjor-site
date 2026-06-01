---
title: "How I built a personal AI bot that found $4,300/year of unused workplace benefits"
description: "Most employees use 30-40% of the benefits their employer pays for. Here's how I built a bot that found mine, audited the buckets, and claimed $900 in one afternoon."
pubDate: 2026-06-01
tags: ["life-os", "benefits", "ai-agents", "case-study"]
---

Most employees in Canada use **30-40% of the benefits their employer pays for.** The rest expires December 31 every year. It's not because people are lazy. It's because:

- Benefits booklets are 50+ pages of dense insurance jargon
- HR departments can't legally tell you what to claim (liability)
- Brokers don't push optimization — their incentive is selling new plans, not maximizing existing ones
- "I'll figure it out later" → it's December → it's gone

I've been building a personal AI assistant called **Life OS** for the past year. Python, Anthropic Claude API, runs on my Windows laptop 24/7, talks to me through Telegram and WhatsApp. ~89 tools across 19 modules. It tracks my meals, medications, workouts, and finances. It writes to my Obsidian vault. It sends a morning briefing every day at 6:30.

A few weeks ago I asked it a simple question: *"Audit my workplace benefits. Tell me what I'm missing."*

Thirty minutes of conversation later it had:

1. Parsed my 50-page MEBAC employee benefits booklet (City of Calgary, Green Shield)
2. Read my full claims history from the GreenShield+ portal screenshots I uploaded
3. Built a complete YTD usage tracker for every bucket
4. Identified ~$8,500 of unused annual benefits — most of which I had no idea I had
5. Walked me through filing the Garmin watch + Samsung tablet I'd already bought as a $900 Personal Wellness Account claim

Net of tax: roughly $600 in my bank account, for two receipts I'd forgotten I had.

That session also surfaced things I genuinely should have known but didn't:

- **$1,200/year paramedical bucket** I share between massage, chiro, physio, and dietitian — I'd been using massage only
- **$1,500/year mental health bucket** that's completely separate from paramedical — I'd never used it
- **$400 vision bucket** at age 52 — when presbyopia is starting and I really should book an eye exam
- **$150 BP monitor** covered every 5 years — never claimed, and given my father died of an MI at 69, kind of important
- **$130 cold therapy device** covered annually — perfect for the DOMS recovery I've been doing during a training rebuild

The whole audit, including the family-medical-history risk flags it surfaced, was one continuous Telegram conversation.

## Why this works as a service

The pattern is repeatable:

1. **Read the plan booklet** — extract every cap, percentage, and exclusion
2. **Pull the claims history** — see what's already used vs available
3. **Build a YTD usage tracker** — surface unused buckets with deadlines
4. **Match against personal context** — age, family medical history, current conditions, lifestyle
5. **Recommend specific high-value claims** — the BP monitor for someone with cardiac family hx, the dietitian consult for someone managing GERD, the cold therapy device for someone lifting

Most insurance carriers in Canada use similar plan structures (Green Shield, Sun Life, Manulife, Canada Life, Blue Cross cover ~80% of the market). The booklets are dense but the patterns are repeatable. A specialized AI agent can deliver this audit in 30 minutes — work that would take a human 6-10 hours.

## What I'm building from here

The Benefits Maximizer is becoming its own module inside Life OS — and probably the strongest proof-of-work case study for any future Life OS Build Service clients.

If you work in Canada with a typical extended health plan and want to know what you're leaving on the table — get in touch.

---

*If you want to follow along as I build more of this, the rest of the writing lives [on the blog](/blog), and I post longer build journals on the [JustJor YouTube channel](https://www.youtube.com/@realjustjor).*
