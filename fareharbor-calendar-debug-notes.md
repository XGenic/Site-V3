# FareHarbor Calendar Debug Notes

Date: 2026-05-14

## Issue

The FareHarbor calendar sometimes loaded expanded with a date/time already selected, especially on desktop. Mobile and desktop did not always match, and local/live behavior differed between browser profiles.

## Root Cause Found

FareHarbor's embedded calendar app runs an internal experiment/feature flag:

`uf_auto_select_avails_cal_embed`

The calendar iframe uses the FareHarbor customer UUID from the `u` query parameter when evaluating that experiment. If the UUID is bucketed into the experiment's enabled state, the small calendar auto-selects the first bookable date and expands the available times. If it is bucketed into the disabled state, the calendar starts compact and shows "Click a date to browse availability."

This explains why different devices/profiles behaved differently: each can have a different FareHarbor UUID in storage.

## Current Workaround

FareHarbor calendar embeds should keep:

`data-cfasync="false"`

and uses:

`force-small=yes`

After FareHarbor writes the generated calendar iframe, a small inline script retargets only that calendar iframe to a known compact experiment bucket:

`00000000-0000-4000-8000-000000000002`

Important detail: the parent FareHarbor/cart/lightframe UUID is left untouched, so visitor/session identity remains unique. Only the visual calendar iframe is pinned to the compact bucket.

## Project-Wide Rollout

As of 2026-05-14, this was applied across the project to FareHarbor calendar embeds, excluding `site-launch/book-now` by request.

Service pages with literal calendar script tags were updated directly:

`site-launch/services/*/index.html`

Yacht pages use config strings:

`site-launch/yacht/*/index.html`

and the generated sidebar calendar is handled in:

`site-launch/assets/yacht/shared-sidebar.js`

The shared sidebar renderer also normalizes its `fareHarborSrc` to include `force-small=yes` before writing the script tag.

## Verification

The compact UUID was checked directly against the FareHarbor iframe URL. Expected markers:

`small-calendar-embed-footer--no-date`

and:

`Click a date to browse availability`

The expanded state usually includes:

`selected-date-header`

The local parent page was also checked in Chromium. Expected parent markers:

`fh-ready`

`fareharbor-ready`

`fareharbor-calendar-wrap`

The cart iframe should keep a generated unique `u` value, while the calendar iframe should contain:

`u=00000000-0000-4000-8000-000000000002`

## If This Breaks Later

Check these first:

1. FareHarbor may have removed or renamed the `u` query parameter.
2. FareHarbor may have ended or changed `uf_auto_select_avails_cal_embed`.
3. FareHarbor may have changed the generated DOM shape, so the inline script no longer finds `currentScript.previousElementSibling.querySelector("iframe")`.
4. Cloudflare Rocket Loader may be touching the scripts if `data-cfasync="false"` is missing from either the FareHarbor script or the inline helper.
5. A different compact UUID may be needed if FareHarbor rebuckets or changes the experiment.

## Safer Long-Term Fix

Ask FareHarbor support whether they can disable automatic availability/date selection for the account or provide an official query parameter for "do not auto-select date." That would be better than relying on experiment bucketing.

## Height / "See More" Overflow

The service calendar card has a parent-side height cap in:

`site-launch/services/styles.css`

Selector:

`.cal`

The relevant cap is:

`max-height: 980px`

The original CSS used `overflow:hidden`, which could clip or visually trap expanded FareHarbor content after a user presses "see more." The current adjustment keeps the height cap but changes the card to:

`overflow-x: hidden`

`overflow-y: auto`

so long availability lists can scroll inside the rounded calendar border instead of spilling or being cut off.
