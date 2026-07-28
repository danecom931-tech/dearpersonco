# Order reservation timer (checkout countdown)

A Shopify **Checkout UI Extension** that shows a green
`Order reserved for the next 9:59` banner on the checkout page and counts
down (default 10 minutes) — the same urgency tactic Smooche uses.

> **Requires Shopify Plus.** Custom content on the main checkout page is a
> Plus-only feature. DearPersonCo is on Plus, so this works.

This is **not** part of the Impact theme and is **not** an UpCart CSS paste.
It ships as a checkout extension inside a Shopify app and is deployed with the
Shopify CLI. The files here are the two that matter — `src/Checkout.jsx`
(the timer) and `shopify.extension.toml` (targeting + merchant settings).

## What it does

- Renders a `Banner status="success"` (green, with a check icon).
- Counts down `M:SS` every second.
- Persists the deadline in the extension's session storage, so reloading or
  moving between checkout steps does **not** restart the timer.
- When it reaches `0:00` it loops back to the full time (always shows urgency).
  To stop at `0:00` instead, see the commented lines in `src/Checkout.jsx`.
- Two merchant settings, editable live in the checkout editor:
  - **Countdown length (minutes)** — default 10.
  - **Banner text** — default `Order reserved for the next`.

## Deploy (one time)

You need the Shopify CLI and a Partner account. If you don't already have an
app for the store:

```bash
# 1. Create an app (or use an existing one) and let the CLI scaffold a
#    Checkout UI extension so package.json + SDK versions are correct:
shopify app init
cd <your-app>
shopify app generate extension        # choose: Checkout UI extension

# 2. Replace the generated extension's two files with the ones in this folder:
#    - src/Checkout.jsx
#    - shopify.extension.toml
#    (keep the generated package.json / node_modules)

# 3. Preview against the store, then ship it:
shopify app dev        # live preview
shopify app deploy     # publish the extension
```

## Turn it on in the store

1. Shopify admin → **Settings → Checkout → Customize**.
2. In the checkout editor, **Add app block** → **Order reservation timer**.
3. Drag it to the **top** of the checkout (above Express checkout) to match
   Smooche.
4. Set **Countdown length** and **Banner text** in the block's settings.
5. **Save**.

## Notes

- The timer is a **marketing/urgency** element only — it does not actually
  reserve inventory or hold the order. (Smooche's works the same way.)
- No network or Storefront API access is requested, which keeps app review
  and approval simple.
