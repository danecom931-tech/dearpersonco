# DearPersonCo

This repository holds code for **DearPersonCo**, a Shopify store running the
**Impact theme** (by Maestrooo).

## Scope / brand separation

- This repo is **only** for DearPersonCo.
- It is **not** related to any other store. In particular, the `resilia-*`
  sections belong to a **different, unrelated brand** and must never be added
  here or referenced from here.
- Keep all work in this repo brand-specific to DearPersonCo.

## What's here

- `sections/header.liquid` — the Impact theme Header section. Includes a
  "Clearance menu badge" settings group that highlights a chosen top-level
  drawer link (red text + pill badge, e.g. "UP TO 50% OFF").
- `snippets/navigation-panel.liquid` — renders the drawer/mega-menu links.
  Contains the Clearance-link detection + badge markup.

## Notes

- The Impact header/menu code is intentionally complex and sensitive; make
  surgical, well-understood edits only.
- Menu links themselves are managed in Shopify admin (Online Store →
  Navigation), not hardcoded.
