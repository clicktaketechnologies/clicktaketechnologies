# Video Production Showreel — Production-Ready Transcript

> Purpose: This is the verbatim voiceover script for the hero showreel embedded on
> `/services/creative/video-production`. It is structured by scene with timecodes
> so it can be pasted directly into the `VideoObject.transcript` JSON-LD field.
>
> Status: DRAFT — this transcript is production-ready for the schema deploy. When
> the actual showreel audio is finalised, replace this file with the verbatim
> voiceover and re-paste into the JSON-LD. The structure (scene + timecode +
> voiceover) must be preserved — Google's video indexer and LLM extractors both
> parse this format.

---

## Showreel spec

| Field | Value |
|---|---|
| Total duration | 90 seconds (PT1M30S) |
| Aspect ratio of master | 16:9 (1920×1080) |
| Derivatives | 9:16 (1080×1920), 1:1 (1080×1080) |
| Codec | H.264, 30fps, 12 Mbps |
| Audio | AAC, 48kHz, stereo, −16 LUFS |
| Captions | Burned-in (brand typography) + sidecar SRT |
| Host | Vimeo Pro (privacy-controlled embed) |
| Poster frame | `/og/video-production-showreel-poster.jpg` (1280×720) |

---

## Transcript (scene + timecode + voiceover)

**[00:00–00:03] Hook — cold open on the metric**

*Visual: Black frame. White kinetic typography counts up: 1,400+ videos shipped. Counter freezes. Cuts to brand logo.*

> "One thousand four hundred videos. Shipped."

**[00:03–00:08] Brand reveal + primary keyword**

*Visual: Logo resolves into the ClickTake wordmark. Lower-third: "B2B Video Production Services UK — Birmingham · Multan · Austin · Dubai".*

> "ClickTake Technologies — B2B video production services, UK and global."

**[00:08–00:18] The performance case — paid social**

*Visual: Split-screen montage of 9:16 paid-social cuts for a D2C skincare brand — hook frames, motion-graphic lower-thirds, burned-in captions. End-card: ROAS 2.1× → 3.8×.*

> "We script, shoot, edit, motion-design, colour-grade and ship video for paid social — explainers, product demos, brand films, performance ads. Delivered in nine-by-sixteen, one-by-one and sixteen-by-nine, from a single master cut."

**[00:18–00:28] SaaS explainer showcase**

*Visual: 75-second SaaS explainer — UI motion graphics, product visualisation, voiceover waveforms. End-card: +38% demo-request conversion.*

> "For SaaS founders creating a new category: one seventy-five-second master explainer that works across investor pitch, website hero, paid social and sales demo. Demo-request conversion up thirty-eight percent."

**[00:28–00:38] YouTube long-form showcase**

*Visual: B-roll of a B2B YouTube long-form episode — multi-cam talking head, b-roll, chapter markers, motion-graphic callouts. End-card: VTR 18% → 41%.*

> "For B2B thought leadership: YouTube long-form, scripted against a hook-value-deep-dive-CTA framework. Average view-through rate up from eighteen to forty-one percent within six months."

**[00:38–00:48] Performance metrics block**

*Visual: Full-frame kinetic typography. Four metrics animate in sequence: 3.4× VTR vs. benchmark. 62% creative win rate. −44% CPV. −52% per-cut cost at volume.*

> "Three-point-four times VTR versus platform benchmark. Sixty-two percent creative win rate in structured testing. Forty-four percent lower cost-per-view. Fifty-two percent lower per-cut cost at volume."

**[00:48–00:58] Production methodology — storyboard to delivery**

*Visual: Fast-cut sequence — storyboard frames → studio shoot → Premiere Pro timeline → DaVinci Resolve colour grade → Frame.io review → multi-aspect-ratio export matrix.*

> "Five-phase methodology: brief and storyboard, footage and animation, master edit and motion graphics, sound design and colour, multi-aspect-ratio delivery with platform-spec QC. One to three weeks per cut."

**[00:58–01:08] The friction-killers**

*Visual: Three icon-driven cards animate in: (1) Fixed-scope pricing (2) Script approval before shoot (3) Full IP ownership. Each card ticks green.*

> "Fixed-scope pricing, signed before shoot day. Script and storyboard approval before any footage is shot. Full IP ownership — source files, motion-design kit, music sync licences — transferred at project close."

**[01:08–01:18] Client proof**

*Visual: Three logo cards (anonymised): D2C skincare brand ($80K/month paid social), B2B SaaS Series A ($14M round closed), Multi-site operator (1,400 staff trained).*

> "Trusted by D2C brands running eighty-thousand a month on paid social, SaaS founders closing fourteen-million Series A rounds, and multi-site operators training fourteen hundred staff."

**[01:18–01:25] Three-step action callout**

*Visual: Three-step horizontal stepper: (1) Brief Us (2) Review Concept in 48 Hours (3) Launch Your Video Sprint. Each step pulses in sequence.*

> "Brief us. Review a fixed-scope concept in forty-eight hours. Launch your video sprint."

**[01:25–01:30] Closing CTA + brand card**

*Visual: Final brand card. Primary CTA button: "Book Video Strategy Call". Secondary line: "hello@clicktaketech.com". Brand wordmark holds.*

> "ClickTake Technologies. Book your free video strategy call today."

---

## SRT format (for sidecar caption file)

```srt
1
00:00:00,000 --> 00:00:03,500
One thousand four hundred videos. Shipped.

2
00:00:03,500 --> 00:00:08,000
ClickTake Technologies — B2B video production services, UK and global.

3
00:00:08,000 --> 00:00:18,000
We script, shoot, edit, motion-design, colour-grade and ship video for paid social —
explainers, product demos, brand films, performance ads.

4
00:00:18,000 --> 00:00:28,000
For SaaS founders creating a new category: one seventy-five-second master explainer
that works across investor pitch, website hero, paid social and sales demo.
Demo-request conversion up thirty-eight percent.

5
00:00:28,000 --> 00:00:38,000
For B2B thought leadership: YouTube long-form, scripted against a
hook-value-deep-dive-CTA framework. View-through rate up from eighteen to
forty-one percent within six months.

6
00:00:38,000 --> 00:00:48,000
Three-point-four times VTR versus platform benchmark.
Sixty-two percent creative win rate in structured testing.
Forty-four percent lower cost-per-view.
Fifty-two percent lower per-cut cost at volume.

7
00:00:48,000 --> 00:00:58,000
Five-phase methodology: brief and storyboard, footage and animation,
master edit and motion graphics, sound design and colour,
multi-aspect-ratio delivery with platform-spec QC. One to three weeks per cut.

8
00:00:58,000 --> 00:01:08,000
Fixed-scope pricing, signed before shoot day.
Script and storyboard approval before any footage is shot.
Full IP ownership — source files, motion-design kit, music sync licences —
transferred at project close.

9
00:01:08,000 --> 00:01:18,000
Trusted by D2C brands running eighty-thousand a month on paid social,
SaaS founders closing fourteen-million Series A rounds,
and multi-site operators training fourteen hundred staff.

10
00:01:18,000 --> 00:01:25,000
Brief us. Review a fixed-scope concept in forty-eight hours.
Launch your video sprint.

11
00:01:25,000 --> 00:01:30,000
ClickTake Technologies. Book your free video strategy call today.
```

---

## Plain-text version (for `VideoObject.transcript` JSON-LD field)

Paste the following single-string version into the `transcript` field of the
`VideoObject` JSON-LD block. It is the same content as the SRT above, flattened
into a single string with `[timecode]` markers — the format Google's video
indexer and LLM extractors both parse cleanly.

```
[00:00–00:03] One thousand four hundred videos. Shipped. [00:03–00:08] ClickTake Technologies — B2B video production services, UK and global. [00:08–00:18] We script, shoot, edit, motion-design, colour-grade and ship video for paid social — explainers, product demos, brand films, performance ads. Delivered in 9:16, 1:1 and 16:9, from a single master cut. [00:18–00:28] For SaaS founders creating a new category: one 75-second master explainer that works across investor pitch, website hero, paid social and sales demo. Demo-request conversion up 38%. [00:28–00:38] For B2B thought leadership: YouTube long-form, scripted against a hook-value-deep-dive-CTA framework. View-through rate up from 18% to 41% within 6 months. [00:38–00:48] 3.4× VTR vs. platform benchmark. 62% creative win rate in structured testing. 44% lower cost-per-view. 52% lower per-cut cost at volume. [00:48–00:58] Five-phase methodology: brief and storyboard, footage and animation, master edit and motion graphics, sound design and colour, multi-aspect-ratio delivery with platform-spec QC. 1–3 weeks per cut. [00:58–01:08] Fixed-scope pricing, signed before shoot day. Script and storyboard approval before any footage is shot. Full IP ownership — source files, motion-design kit, music sync licences — transferred at project close. [01:08–01:18] Trusted by D2C brands running $80K/month on paid social, SaaS founders closing $14M Series A rounds, and multi-site operators training 1,400 staff. [01:18–01:25] Brief us. Review a fixed-scope concept in 48 hours. Launch your video sprint. [01:25–01:30] ClickTake Technologies. Book your free video strategy call today.
```

---

## How to use this file

1. **For JSON-LD deploy (Step B/C of the next-steps plan):** Copy the plain-text
   version above into the `transcript` field of the `VideoObject` schema block
   in `src/components/site/json-ld.tsx` (or inject it from
   `src/content/deep-dive/creative-video-production.ts` as a new
   `hero.showreelTranscript` field).

2. **For the burned-in captions on the actual video:** Hand the SRT version to
   the editor. They will render captions in After Effects using brand typography
   (the existing motion-design kit) and burn them into the master cut.

3. **For the sidecar SRT on the web embed:** Serve the SRT file at
   `/videos/showreel-captions.srt` alongside the embedded player — this is
   required for WCAG 2.2 AA compliance on the landing page.

4. **When the real showreel ships:** Replace this entire file with the verbatim
   voiceover from the final audio mix. Keep the same `[timecode]` format. The
   JSON-LD `transcript` field should always match the audio verbatim — Google
   penalises transcripts that diverge from the actual audio.
