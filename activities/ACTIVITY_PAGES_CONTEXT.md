# Activity Pages Context

This folder contains the standalone prototype for Flamingo Yacht Charters activity pages. It was created from the yacht standalone page system in the parent repo, but activity pages are meant to have more per-page flexibility than individual yacht pages.

## Current Prototype

- Main page: `bachelorette-party-boat.html`
- Local assets:
  - `styles.css`
  - `main.js`
  - `shared-header.js`
  - `activity-sidebar.js`
  - `contact.php`
- The current activity page is based on the live source page:
  - `https://flamingoyachtcharters.com/services/bachelorette-party-boat/`
- The current yacht/tier context came from:
  - `https://flamingoyachtcharters.com/yachts/`
  - the standalone yacht pages in the parent repo.

## Design And Layout Intent

Activity pages keep the same broad visual system as the standalone yacht pages:

- Same header/navigation design.
- Same two-column main layout with booking sidebar on desktop.
- Same mobile behavior where the booking sidebar stacks above the content.
- Same itinerary tab pattern.
- Same On Board and contact section style.
- Same footer and lightbox shell.

Activity pages differ from yacht pages in these ways:

- Sidebar pricing can be configured per activity instead of only per boat.
- The bachelorette prototype uses duration tabs in the sidebar (`3 Hours`, `4 Hours`, `6 Hours`) and lists boats as pricing rows.
- Sidebar package accordions can exclude redundant packages through `packages.excludeTitles`.
- A boat-selection section lives between itinerary and On Board.
- The bottom full-width section is long-form activity copy instead of the yacht gallery.

## Bachelorette Prototype Details

The bachelorette page currently includes this boat mix:

- Sandbar Boats:
  - Chris-Craft Catalina 26
  - Formula 40 PC
- Standard Yachts:
  - Fairline Targa 48
  - Sea Ray 480 Sedan Bridge
- Premium Yachts:
  - Fountaine Pajot Sonya 57
  - VG PC 62

The boat section supports:

- Tier filters: `All`, `Sandbar Boats`, `Standard Yachts`, `Premium Yachts`.
- Expandable boat detail panels.
- Links to the matching public yacht pages on `flamingoyachtcharters.com`.

The sidebar intentionally excludes `Bachelorette Package` from the “Purchased a package?” accordion because that package would be redundant on this page.

## Path Assumptions

This folder is standalone in terms of page code and contact handling, but it currently references shared image assets from the parent repo with paths like:

```html
../imgs/General/General01.webp
```

If this folder is moved outside the current repo, either copy the `imgs/` folder alongside it and update paths, or replace those image references with hosted URLs or local assets in the new project.

The contact form posts to the local activity handler:

```html
action="contact.php"
```

The form return path is local:

```html
page_url="bachelorette-party-boat.html"
```

## Important Implementation Notes

- `activity-sidebar.js` is adapted from the parent `shared-sidebar.js`.
- `activity-sidebar.js` adds `packages.excludeTitles`, which filters default package items by title.
- `shared-header.js` is local to this folder and marks `Activities` as current instead of `Yachts`.
- `main.js` is adapted from the parent page script and adds boat filtering plus expandable boat details.
- `contact.php` is adapted from the parent contact handler and labels email content as an activity inquiry.
- Existing parent yacht pages should not be affected by changes inside this folder.

## Known Next Work

The first implementation is structurally complete but still needs design tuning in a later session. Likely areas:

- Refine activity hero image choices and crop behavior.
- Tighten the boat card visual design.
- Improve sidebar pricing density on mobile.
- Decide whether activity pages should keep the same On Board list for every activity or customize it further.
- Decide whether future activity pages should be generated from shared data instead of hand-authored HTML.

## Validation Already Performed

- JavaScript syntax checks passed for:
  - `main.js`
  - `activity-sidebar.js`
  - `shared-header.js`
- Referenced `../imgs/...` paths in `bachelorette-party-boat.html` were checked in the original repo and existed at the time this context file was written.
