---
name: MARKO
description: Private screening for independent motion design.
colors:
  cobalt: "#0838e8"
  acid-yellow: "#f8f841"
  paper: "#f7f7f7"
  ink: "#14141d"
typography:
  display:
    fontFamily: "Anton, sans-serif"
    fontSize: "11.7vw"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-.025em"
  headline:
    fontFamily: "Anton, sans-serif"
    fontSize: "clamp(48px, 6.3vw, 100px)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-.025em"
  body:
    fontFamily: "Barlow, sans-serif"
    fontSize: "18px"
    lineHeight: 1.5
  label:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "16px"
rounded:
  field: "6px"
  screen: "12px"
  action: "50px"
spacing:
  gutter: "5.2vw"
  mobile-gutter: "6vw"
  section: "100px"
  mobile-section: "60px"
components:
  button-primary:
    backgroundColor: "{colors.acid-yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.action}"
    padding: "17px 28px"
  input:
    textColor: "{colors.paper}"
    rounded: "{rounded.field}"
    padding: "14px"
  film-card:
    rounded: "{rounded.screen}"
---

# Design System: MARKO

## Overview

**Creative North Star: "Private screening"**

The selected visual world is Private screening, expressed on this surface as Screening stage. A saturated stage, monumental condensed type and a quiet work catalogue give the films the strongest visual presence. The composition presents independent motion design broadly through “Motion that gets noticed.”

This documents the implemented replacement, including later user-approved copy and player changes. Human finish review returned SHIP against fresh desktop, mobile, 1280px, hero and iGaming screenshots in `.impeccable/review`. The plate gates in `.impeccable/build/state.json` remain open: the matcher compares actual source posters with generated-comp bottom fragments. User browser approval of the posters (“апрув”) and the human verdict do not mean machine gates passed.

**Key Characteristics:**
- Cobalt stage with acid-yellow actions.
- Condensed display typography with calm readable captions.
- Real film posters, generous spacing and restrained interaction.

## Colors

Cobalt is the primary stage and contact field. Acid yellow identifies calls to action, playback and scroll progress. Paper carries the work catalogue and reading sections; ink anchors service content and text.

**The Stage Rule.** Keep large cobalt fields continuous; yellow identifies action and emphasis rather than unrelated decoration.

## Typography

Anton supplies the wordmark, oversized headline and section headings. Barlow carries body copy, form values and supporting text. Barlow Condensed supplies navigation, service rows, captions and actions. All three are local font files under `assets/fonts/`, loaded with font-display swap.

The desktop headline uses a horizontally compressed span (scaleX .79); below 700px it becomes uncompressed, wraps naturally, and uses a 17vw size. Its approved wording is “Motion that gets noticed.”

**The Reading Rule.** Reserve monumental condensed display type for hierarchy; preserve the calmer body face for explanation.

## Layout

Desktop uses an 89.6% content width with a three-part hero: introduction and verified numbers on the left, portrait player in the center, services and enquiry on the right. The stage columns are 27.2%, 27.9% and 27.2%, with remaining width distributed between them. Selected work follows immediately on paper: four portrait cards followed by two wide cards spanning two columns each. The hero film plus six catalogue films makes seven.

At 1000px and below, controls and supporting layouts tighten, service rows become two columns, and process steps use two columns. At 700px and below, the content width is 88%, the hero becomes one column, the introduction and proof sit together above the player, and services follow it. The player uses a 9/13 frame. Work uses two columns with the final pair each spanning both. Contact and FAQ stack; the header enquiry button disappears while navigation remains. At 1800px and above, the wrapper caps at 1700px and hero type/player receive fixed caps.

## Elevation & Depth

The system is mostly flat: full-width color fields and thin separator rules establish hierarchy. The player uses a one-pixel translucent outline shadow and a dark gradient behind its controls. Film images lift through a subtle scale on hover, without floating card shadows.

## Shapes

Film screens have softly curved corners; actions are pills and playback is circular. Form fields have a smaller curve. Thin rules divide navigation, numbered services and content rows. iGaming adds two rotated card silhouettes in the same cobalt/yellow palette.

## Components

Primary actions use yellow, condensed uppercase text and an arrow; hover turns the surface white and moves it upward by two pixels. Keyboard focus uses a three-pixel current-color outline with five-pixel offset.

Navigation is a simple horizontal text row. Film cards retain the real poster, an overlaid Watch film pill and external captions. Selecting one changes the central player, brings it into view and focuses playback. The player offers play/pause, seek, elapsed/duration, mute, volume and fullscreen; it preserves inline video and its original picture ratio. Loading, failure/retry and direct-file access are explicit states. Playback pauses when the page is hidden or the player leaves view.

The contact form is transparent on cobalt with outlined inputs and a larger textarea. It prepares a mailto draft for user review. The iGaming view exposes a private-portfolio enquiry. Native details/summary provides the FAQ. A thin yellow scroll-progress rule tracks the page. Reduced-motion preference disables smooth scrolling and reduces animation/transition duration.

## Do's and Don'ts

- Do retain the seven real films, including MARKO and 3D Animation.
- Do preserve accessible inline playback and reduced-motion behavior.
- Do use the verified 3+ years and 50+ clients as the only numeric proof.
- Don't reintroduce agency-specific positioning.
- Don't promise revenue, leads or conversion lifts.
- Don't replace source film posters with generated comp fragments.
