# Flamingo Site Relaunch Plan

## Summary
Create a deployable static site in `site-launch/` from the recovered and rebuilt source folders:

- `site-rebuilt/`: recovered homepage, contact, offers, service source text, recovered header assets.
- `activities/`: activity/service page layout prototype and shared service scripts.
- `yachts/`: finished individual yacht pages and yacht assets.
- `yacht page/`: finished `/yachts/` index.

The homepage and individual yacht page HTML must remain visually/content-wise untouched outside generated routing and asset placement. Service pages must preserve recovered SEO text and original source-content `href` values.

## Implementation Rules
- Build output only in `site-launch/`.
- Keep `site-rebuilt/index.html` as `site-launch/index.html` unchanged.
- Copy `site-rebuilt/css`, `site-rebuilt/js`, and `site-rebuilt/images` into `site-launch/`.
- Copy `yacht page/` into `site-launch/yachts/`.
- Publish each finished yacht page from `yachts/*.html` at `/yacht/<slug>/index.html`, with matching scripts, styles, contact handler, and referenced image assets beside each page.
- Add redirect aliases for plural yacht links and legacy yacht/service paths.
- Rebuild non-redirect service pages with the `activities/bachelorette-party-boat.html` layout pattern:
  - Source content comes from `site-rebuilt/services/<slug>/index.html`.
  - Top panel gets all `.content-body` content before the first `<h2>`.
  - Bottom long-form section gets the first `<h2>` and everything after it.
  - If no `<h2>` exists, put the first three content blocks in the top panel and the rest in the bottom section.
- Preserve source-content `href` values exactly.
- Allowed cleanup: close malformed archive-scraped anchors without changing visible words or link destinations.

## Verification
- Compare rebuilt service source text against recovered service text after normalizing whitespace/entities.
- Confirm source-content `href` values are present unchanged in rebuilt service pages.
- Confirm individual yacht page HTML in `site-launch/yacht/<slug>/index.html` matches the source `yachts/*.html` content.
- Confirm non-WordPress internal routes resolve to files or redirect pages.
- Smoke test key pages through a local static server.

## Notes
- `/wp-content/uploads/...` media links from recovered content are preserved but are not backed by local files because the original WordPress media library is not present.
- `tools/build-site-launch.ps1` is the reproducible build script for regenerating `site-launch/`.
