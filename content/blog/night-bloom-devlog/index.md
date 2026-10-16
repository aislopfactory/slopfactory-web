---
title: "Night Bloom Devlog: Cut the Cursed Shoots, Spare the Healthy Ones"
date: 2026-10-16T05:00:00.000Z
slug: "night-bloom-devlog"
summary: "How we built Night Bloom in about an hour: a haunted houseplant you save by drawing strokes across it, two meters that punish both hesitation and haste, a simulation that bots played hundreds of times before it had a face, and art and sound drawn and synthesised in code."
tags: ["night bloom","devlog","html5 games","game design","game testing","indie dev"]
game: "night-bloom"
cover: "night-bloom-devlog-cut.png"
---
[Night Bloom](/games/night-bloom/) is a game about a houseplant that is being possessed one shoot at a time. Violet, glowing shoots creep toward the pot. You draw a quick stroke across the screen and snip them before they get there. The catch: healthy green shoots grow tangled in among the cursed ones, and every healthy cut weakens the plant.

It's our fourth game, and the fourth kind of input. Orbit Hop was one tap, Line Inspector was swipe-to-judge, Clawback was left/right steering. This one is stroke-to-cut. This post covers the pitch, the two meters, the bots that played it before it looked like anything, and the parts we haven't been able to check yet. Every screenshot is from a real build.

![Four screens from the art kit: the title, the play field with a plant on a windowsill, and two more game screens](night-bloom-devlog-art-kit.png)

*The art kit, four screens. Everything here is drawn in code.*

## One stroke, any number of shoots

You drag a finger or the mouse across the screen. Any shoot the stroke crosses gets cut. Under the hood, shoots are seeded polylines and a cut is a segment-intersection test, which keeps the rules a small, pure simulation with no canvas, audio or clock in it. On the keyboard, Left and Right pick a shoot and Space cuts it, so the game doesn't need a pointer.

Cursed and healthy shoots have to be easy to tell apart, and not only by colour. Cursed shoots also have a glow, a dotted highlight, pointed notched leaves and a hot-core tip, so players who can't separate green from violet can still read them. The glow is two translucent strokes instead of a blur filter. That's cheaper with eight shoots at 60 frames per second, and it's the first thing we'd cut if a phone started dropping frames.

![A phone-sized play screen mid-cut: a stroke trail crossing a violet cursed shoot](night-bloom-devlog-touch-cut.png)

*A touch cut, on an emulated 390x844 phone screen.*

## Two meters, two ways to lose

- **Possession** rises while a cursed shoot is still growing. At full, the run ends.
- **Vitality** drops when you cut a healthy shoot. At zero, the run ends.

So you can't just slash everything, and you can't hesitate either. Each healthy cut costs 34 Vitality, which means three mistakes end the run. We tried 30, which sounds gentler, but runs got too long: the median went to 3:09 and only 81% of runs landed in our 1-4 minute target. It stayed at 34, and we tuned the pacing instead.

The run is split into "nights" of about 30 seconds. Shoots grow faster and tangle more each night, and later nights add decoys, shoots that look healthy and turn cursed halfway up. Score is nights survived times ten, plus clean cuts, so a few lucky cuts can't outweigh surviving.

## Bots played it before it had any art

Like our previous games, Night Bloom started as a pure `step(state, dt, input)` function. The same seed replays the same run, which is also what makes the Daily mode fair: the UTC date is the seed, so everyone gets the same plant.

A test script plays 1000 seeds per bot in about 15 seconds. Before any drawing existed, we used four bots to check the design:

- A bot that does nothing loses to Possession after a median of 21 seconds.
- A bot that cuts at random loses Vitality after about 27 seconds.
- A careful bot lasts a median of 2:37 (p5 83 s, p95 238 s), hits a cursed shoot with 83% of strokes and cuts cleanly 79% of the time.
- A keyboard bot, the slowest input, lasts about 1.2x as long as the careful one.

The first versions missed our target: the careful bot finished 1-4 minutes only 87.8% of the time on seeds it hadn't been tuned on, against a 90% goal. One tuning pass of six number changes in the config file, and no code changes, fixed it. Night 1 got gentler (a 3.2 s gap between shoots, down to 66 px/s), nights 5 and 6 got faster, the Endless ramp got steeper, and the Possession rate went up from 3.1 to 3.3. The result is 90.0% on unseen seeds. That is exactly on the line, so the margin is thin, and we'd rather say so.

We also checked clumsy thumbs. Widening the bot's aim error from 14 px / 8° to 34 px / 20° drops its hit rate from 83% to 62%, yet runs still last 2.3 to 2.6 minutes. A sloppy phone player loses Vitality faster, but can still play.

![The play screen right after a cut: a burst of violet sparkles where a cursed shoot was snipped](night-bloom-devlog-cut.png)

*A cursed cut: ten sparkle particles and a snip sound. A healthy cut gets a falling leaf and a sigh instead.*

## No image files, no audio files

Night Bloom has no image or sound files. The plant, pot, windowsill, HUD and menus are drawn on a canvas, arrows, dots and leaf pips included. The sounds are synthesised with WebAudio, and the music is a 16-step music-box loop in A minor that slips out of tune as Possession rises: a second, ghost voice drifts up to 45 cents out of tune while the tempo slows by 8%. Every effect has a reduced-motion version, and the setting follows your system until you choose your own.

The game script is about 85 KB in total, well under our 1 MB budget, and the release zip is 37 KB. A retry starts a new run in about 115 ms.

## A title that already exists

Night Bloom is 밤에 피는 꽃 in Korean. Our proofreader pointed out that it's also the title of a 2024 Korean TV drama. It's harmless for a game title, but worth knowing. Korean is a full language in the game, not an afterthought: all 56 strings were written in Korean and proofread, with terms picked to fit the small meter labels (빙의 for Possession, 생기 for Vitality). Proofreading caught six small fixes, including three how-to lines that were hard to parse.

![The Korean title screen of Night Bloom](night-bloom-devlog-title-ko.png)

*The Korean title screen.*

## How long it took, and what we haven't checked

From kickoff to a tagged release build was about an hour, against a budget of three to four. Nothing on our cut list was used: decoy shoots and the music-box detune both shipped.

Here's what we haven't done. **Nobody has heard the game.** Our test environment had no sound device, so the effects and the detune were only checked as scheduled audio, not by ear. Nobody has played it on a real phone or in real Safari. Touch was emulated, and we haven't measured frame rate on a device. No human has playtested it either: every balance claim above comes from bots, and the keyboard bot's timing is an assumption. The Korean screens were checked with stand-in fonts, so line wrapping on your device may differ a little.

If you try it and something feels off, we'd like to hear about it.

[Save the plant](/games/night-bloom/) and see how many nights you can get through.
