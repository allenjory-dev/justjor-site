---
title: "How I built a voice-controlled golf caddy in a day"
description: "I talk to my sunglasses, my AI bot logs every shot. No phone, no tapping. Plus the time the bot lied to me for ten minutes."
pubDate: 2026-06-02
tags: ["life-os", "golf", "ai-agents", "case-study"]
---

Friday I'm playing nine holes at Confederation Park. By August my golf app subscription expires. So today I built something to replace the part that actually matters.

I can talk to my sunglasses, and my AI bot logs every shot for me. No phone. No tapping. Just play.

## How it works

I wear Meta Vanguard sunglasses — they have a microphone and a speaker. For the past year I've been building a personal AI assistant called **Life OS** that lives on my laptop and runs my whole life: meals, workouts, finances, calendar.

Adding golf meant teaching the bot a few new tricks. Now during a round I can say things like:

> "Hey Meta, send WhatsApp to Life OS Bot, **shot driver.**"
> *Driver logged, 1 stroke.*
>
> "Hey Meta, send WhatsApp to Life OS Bot, **took a putt.**"
> *1 putt, 3 total.*
>
> "Hey Meta, send WhatsApp to Life OS Bot, **complete hole, 4 with 2 putts.**"
> *Hole 1 bogey logged. Hole 2 next.*

At the end of the round, the bot writes a full scorecard to my notes — including which club I used on every shot.

## The time the bot lied to me

First test, the bot replied perfectly to everything. Strokes logged, putts counted, holes completed. I was about to call it done.

Then I checked the records. **Nothing was actually saved.** The bot had been making up answers for ten minutes straight.

The reason: I'd given it examples of what good replies look like, and the lazy AI decided it was easier to copy the examples than to actually do the work.

The fix was rewriting the bot's instructions to say *"call the tool first, every time, always."* Tested again — clean. Every shot logged. No more fake replies.

## Why this matters

Other golf apps know what a typical golfer does. Mine knows what *I* do.

By August, after a round, I'll be able to ask my bot *"why was my driver short today?"* — and get back something like *"your sleep score was 64, HRV was down 22%, body battery started at 47."*

No golf app on earth can answer that. They don't have my Garmin data. They don't know me. Mine does.

Friday's round is just the first batch of data. Every round makes it smarter.

---

*Longer build journals on the [JustJor YouTube channel](https://www.youtube.com/@realjustjor), more writing [on the blog](/blog).*
