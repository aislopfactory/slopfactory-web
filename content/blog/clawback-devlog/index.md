---
title: "Clawback Devlog: Be the Claw Machine, Keep the Crowd Happy"
date: 2026-10-16T07:00:00.000Z
slug: "clawback-devlog"
summary: "How we built Clawback in about three hours: a claw machine where you slide the prize floor so the claw misses, two meters that pull against each other, a simulation that bots could play before any art existed, and everything drawn and synthesised in code."
tags: ["clawback","devlog","html5 games","game design","game testing","indie dev"]
game: "clawback"
cover: "clawback-devlog-play.png"
---
[Clawback](/games/clawback/) turns the claw machine around. You aren't the one reaching for a prize. You are the machine. A customer drops the claw, and you slide the prize floor left or right so it closes on nothing. But every so often you have to let someone win, or the crowd gets bored and the queue walks away.

This post covers how it came together: the pitch, the one rule everything hangs on, the bots that played it before it had a face, and the code-drawn art and sound. Every screenshot comes from a real build of the game.

![A claw hovering over the prize floor with a rabbit, a seal, a bear and a frog on it. Score 3 and a green x2 badge at the top, a Stock bar at 36 and a Crowd bar in the green](clawback-devlog-play.png)

*A calm moment mid-run. The green Crowd bar means the score counts double.*

## One control, and the claw never lies

The only thing you steer is the floor. You never touch the claw, and the claw always aims at a prize. A shadow shows where it will land, so the first drop teaches the whole game.

That was a deliberate choice. If the claw missed at random, you'd be waiting on luck. Here it never does: the pressure comes from how often the claw drops and how fast it moves, and whether you dodge is down to you. That's also why the sim can be tested properly, which comes up below.

Touch, mouse and keyboard all feed one number, "which way is the floor moving", into the same game logic. On touch, dragging moves the floor by how far your finger moves, up to a speed cap of 240 px/s, rather than snapping to where your finger lands. It's a trade-off. A snap would make dodging trivial, so the cap keeps it fair.

## Two meters that pull against each other

If dodging everything worked, there'd be no game. So there are two meters:

- **Stock** is the prizes left in the machine. A prize that goes home with someone is gone for good, and at zero the run ends.
- **Crowd** is the mood of the queue. Every miss lowers it, every win raises it, and at zero the crowd leaves and the run ends.

Giving prizes away costs stock but keeps the crowd with you, and dodging everything keeps your stock but loses the crowd. The choice you actually make is *which* prize to give. Small, medium and large plushes cost 1, 2 and 3 stock, and they lift the mood by 3, 7 and 12 in the first spec. Score counts customers served, with a bonus for clean shifts, and a ×2 multiplier while the crowd is in the green band.

![The same screen a moment later: the claw closed on a small red bear, a speech bubble reading "Thanks!" over the crowd, and the Crowd bar yellow with a green outline](clawback-devlog-win-thanks.png)

*Someone wins. The crowd says thanks, and the mood bar climbs back toward green.*

## Bots played it before it had any art

Like our last two games, Clawback began as plain logic: a pure `step(state, axis)` function and nothing else. The same seed always replays the same run. Every random draw comes from the seed, a stream name and an index, so the prize belt and the order of customers are identical for everyone on a seed. That's what makes the Daily mode fair: today's date is the seed, and everybody gets the same run.

With a sim like that, five test bots can play 600 seeds each in about two seconds. We used them to check the design before drawing anything:

- A bot that dodges perfectly always loses, because the crowd gets bored (about 35 seconds into a run in the first version).
- A bot that gives every prize away always loses too, because the stock runs out (about 68 seconds).
- A balanced bot lasted a median of 148 seconds.

Then came one tuning pass, and it changed just four numbers. Starting stock went from 40 to 36, a miss now lowers the mood by 4 instead of 5, and medium and large plushes lift it by 9 and 16 instead of 7 and 12. We raised the reward for big plushes rather than making small ones cheaper, because that makes the choice real: small prizes let you last longer, large ones score more. After the pass the balanced bot's median went from 148 to 158 seconds, and a well-played run lasts between about 104 and 172 seconds. The bot that never gives a prize is out at 43 seconds and the one that always does at 62.

## No image files, no audio files

There isn't a single image or sound file in Clawback. The cabinet, the claw, the plushes, the crowd, the HUD and the menus are all drawn on a canvas. The sounds are synthesised with WebAudio, and every effect has a reduced-motion version. The whole release is a 35 KB zip, with the game script at about 79 KB before zipping, around 8% of our 1 MB budget.

![The results card: "Out of stock — Every prize has gone home with someone", a New best! ribbon, score 42, 21 customers served, 18 prizes lost, time 2:41, and Try again, Copy share line and Main menu buttons](clawback-devlog-results.png)

*The results card. Retry takes one tap, and the share line copies without a link.*

## Settings that matter

The settings cover language (English and Korean), sound, reduced motion and a left-hand layout. The left-hand layout is a real mirror of the HUD, not just a hint to hold the phone differently. Reduced motion follows your system setting until you pick your own, so the people who need it get it on their first launch.

![The play screen with the HUD mirrored: pause and sound buttons on the left, the score on the right](clawback-devlog-left-hand.png)

*Left-hand layout.*

## How long it took, and what we haven't checked

From kickoff to release build was 3 hours 13 minutes, including about an hour waiting on a decision. Nothing was cut: Daily and Endless modes, both languages, the Kid customer, effects and settings all shipped.

Here's what we haven't done. Nobody has played Clawback on a real phone, and we skipped the iOS Safari check. Nobody has listened to the audio mix either. The sounds were written and wired up, but a human hasn't judged how they sound. If you try it and something feels off, we'd like to hear about it.

[Take a shift at the machine](/games/clawback/) and see how long you can keep the crowd happy.
