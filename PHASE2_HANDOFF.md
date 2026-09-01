# Phase 2 Handoff — Shorette's Bait & Tackle

Phase 1 delivered the structure. Phase 2 shifted the theme onto the black / charcoal /
red / white identity, wired it to **real store data**, and produced the Shopify-side
configuration guides.

Commits `897a685` → `b1fc3c6`. Working tree clean. **Nothing has been published.**

**Companion documents:** `SHOPIFY_NAVIGATION_SETUP.md` · `SHOPIFY_COLLECTION_MAPPING.md` ·
`SHORETTES_ASSET_REQUIREMENTS.md` · `SHORETTES_THEME_QA.md`

---

## ✅ COMPLETE IN CODE

Nothing below needs any further work from you.

**Brand identity**
- Palette moved to black `#0A0A0A` / charcoal `#17191A` / red `#D21404` / white `#FFFFFF`
  / slate `#6B7378`, all editable in **Theme settings → Shorette's brand**.
- The red is **sampled from the Shorette's muskie crest artwork**, so the interface and the
  logo agree. Measured 5.47:1 against white — passes WCAG AA.
- Design tokens renamed to match what they now hold (`navy→ink`, `blue→charcoal`,
  `orange→red`, `bone→paper`) across the stylesheet and all five sections. 50 legacy
  references, 0 remaining.
- Slime Time green `#B6DE48` preserved as a first-class token.

**Header**
- Announcement bar black, navigation band charcoal, cart bubble red, footer and trust bar
  black — the "black/charcoal backgrounds, red accents, white typography" direction.
- Top row set to `#F8F3ED`, **sampled from the current logo's own background**, so the
  opaque logo file shows no rectangle. See the coupling note in the asset document.
- Nav band: even spacing (`clamp(0.75rem, 1.6vw, 1.75rem)`), red underline on
  hover/focus/active, visible red focus ring on the dark background.
- Logo capped at `min(20rem, 34vw)` so a wide horizontal wordmark cannot crowd the search
  field. Heights set to 72 px desktop / 40 px mobile.
- `_header-menu` now emits `data-menu-handle`, so **DEALS renders in Shorette's red** and
  **SLIME TIME keeps its green** automatically — keyed off the linklist handle, so renaming
  a menu item in admin cannot break it.

**Real-content integration**
- Feature tiles take an **optional collection** that supplies both the image and the link:
  collection image first, then that collection's first product image. The home page shows
  real store photography with nothing uploaded. Slime Time and the curated front-page set
  are wired.
- Brand strip lists **vendors this store actually stocks**, ordered by catalogue depth:
  Rapala, Berkley, Livingston Lures (167 products), Headbanger Lures (51), Savage Gear,
  Beyond Braid (38), Monster Marine Lithium (73), Natives Fly Fishing.
- Footer social placeholders removed; Instagram set from the handle the store's own home
  page states.

**Validation**
- `shopify theme check`: **25 offenses, all pre-existing, 0 introduced.**
- 17 theme JSON files parse. 5 section schemas valid, no duplicate setting or block ids.
- 84 asset references resolve; no dead references.
- No horizontal overflow at 390 px; palette verified in the browser.

---

## 🔧 NEEDS SHOPIFY ADMIN CONFIGURATION

**This is the single highest-value remaining task.** `main-menu` still has 23 flat items
and no children, which is why the nav band reads as a list rather than a retailer's menu.
The theme is 100 % linklist-driven — no code changes needed.

→ Follow **`SHOPIFY_NAVIGATION_SETUP.md`**. It gives the exact 10-parent tree with every
child, destination, handle, and ordering, all verified against the live catalogue.

Two traps that document covers:
- **SLIME TIME must point at the collection, not `/pages/slime-time`** — that page exists
  but is **unpublished** and would 404 for customers.
- **The `apparel` collection holds only 1 product** despite its description. Point the
  APPAREL parent at `hoodies` (42) until it is populated.

---

## 🖼 NEEDS IMAGE ASSETS

→ Full specs in **`SHORETTES_ASSET_REQUIREMENTS.md`**.

| Priority | Asset | Why |
|---|---|---|
| ⭐ 1 | **Horizontal transparent logo, 4:1–5:1, 1600×400 PNG with alpha** | The current header logo is **Slime Time artwork on an opaque background** — the storefront is wearing a sub-brand as its master identity. Five candidate files were audited; **none is horizontal, transparent, and black/red at once** |
| 2 | Inverse (white/red) logo, same geometry | Footer currently uses a black-panel badge |
| 3 | Hero image, 2400×1200, plus a 4:5 mobile crop | Hero shows a black-to-charcoal gradient today |
| 4 | 3 feature-tile images | 2 of 5 already pull real photography automatically |
| 5 | Brand logos (optional) | Text wordmarks render meanwhile; **only upload marks you have rights to** |

---

## 📦 NEEDS NEW COLLECTIONS

→ Exact smart-collection rules in **`SHOPIFY_COLLECTION_MAPPING.md`**.

**All six species already exist as product tags** — the store already uses tag-driven smart
collections, so this follows the convention rather than introducing one:

| Collection | Rule | Yields |
|---|---|---|
| **Shorette's Originals** ⭐ | `vendor = Shorette's Bait And Tackle` | **88** |
| Bass | `tag = Bass` | 217 |
| Walleye | `tag = Walleye` | 187 |
| Pike | `tag = Pike` | 179 |
| Musky | `tag = Musky` | 48 |
| Panfish | `tag = Panfish` OR `tag = Crappie` | 9 |
| Trout | `tag = Trout` | **1 — do not launch yet** |

Creating **Shorette's Originals** is the single fastest visual win: one rule, and it fills a
third feature tile with real product photography without any upload.

Also needed: pages `community-catches` and `brands`; a `deals` collection (no `Sale` tag
exists yet — interim is `/collections/the-used-lure-rack`, which its own description
already positions as the bargain rack).

---

## 📞 NEEDS REAL CONTACT / SOCIAL DATA

| Item | Where | State |
|---|---|---|
| Phone number | Header → Announcement bar → **Contact text** + **Contact link** | **Empty.** Not invented |
| Facebook | Footer → Utilities → Social links → `facebook_url` | **Blanked.** Was `https://www.facebook.com/` |
| YouTube | same | **Blanked.** Was `https://www.youtube.com/` |
| TikTok | same | **Blanked.** Was `https://www.tiktok.com/` |
| X / Twitter | same | **Blanked.** Was `https://x.com/` |
| Instagram | same | Set to `instagram.com/shorettesbaitandtackle` — **derived from your own home page copy, please confirm** |

Blank means the icon does not render, which is better than sending a customer to a
platform's login wall.

**Free-shipping threshold:** already a plain theme-editor text field — Header →
Announcement bar → first message ("Free shipping on orders over $75"). Verified not
hardcoded anywhere in Liquid or CSS. No code change needed to edit it.

---

## 👀 NEEDS LIVE THEME PREVIEW

**The Liquid has still never been rendered against live data.** Responsive checks used a
static harness built from the shipped CSS.

Shopify CLI state changed since Phase 1: it previously reported *"not authorized to develop
in this store"*; it now reports **logged out entirely** and starts a device-code flow.
I did not complete that flow — authenticating on your behalf is not something I'll do.

```bash
shopify theme push --unpublished --theme "Shorettes Redesign Preview"
```

That opens a browser device-code prompt on first run. Log in as the store owner or a staff
account with **Themes** permission. `--unpublished` creates a new theme; it cannot touch
the live one.

Then walk **`SHORETTES_THEME_QA.md`** — 120 items, with regression checks marked `[R]`.

---

## 🚧 BLOCKERS

| # | Blocker | Impact | Owner |
|---|---|---|---|
| 1 | **Shopify CLI not authenticated** | No live preview, no push. Everything else is ready | You — log in |
| 2 | **No horizontal transparent logo exists** | Header shows Slime Time sub-brand artwork; header background is pinned to `#F8F3ED` to hide its opaque edge | You — commission R1/R2 |
| 3 | `main-menu` is flat | Nav band reads as a list; no dropdowns | You — 30 min in admin |

None blocks the others. All three can proceed in parallel.

**Not blockers:** missing species collections, missing tile images, missing contact data —
every one degrades to a designed empty state, and **zero broken links ship**.

---

## ▶ EXACT NEXT STEPS

1. **Log into the Shopify CLI** and push to an unpublished theme (§Needs live theme
   preview). Nothing else can be visually confirmed until this happens.
2. **Create `shorettes-originals`** — one smart rule, 88 products. Biggest visual gain per
   minute spent.
3. **Restructure `main-menu`** per `SHOPIFY_NAVIGATION_SETUP.md`.
4. **Create the five viable species collections** (skip Trout).
5. **Commission the horizontal logo** (R1 + R2). When it lands, set **Header → Colors →
   Top row background** to `#FFFFFF` or `#0A0A0A` — the `#F8F3ED` pin exists only to hide
   the current logo's opaque edge.
6. **Upload the hero image** and set its focal point in Content → Files.
7. **Fill in the phone number and social URLs.**
8. **Walk `SHORETTES_THEME_QA.md`** on the preview theme.
9. Send back screenshots of the rendered preview — that is what a final visual polish pass
   needs, and it is the one thing that cannot be done from the repository.

---

## Open question for you

The mockup shows a **warm off-white header with orange CTAs**; Phase 2's brief specified
**black / charcoal / red / white**. I applied the stated identity to the dark bands
(announcement, nav, footer, trust) and red to all accents, while keeping the header row
light — which matches both the mockup's structure and, practically, the only way the
current opaque logo renders cleanly.

If you want the **main header row dark** as well, it is a one-field change once a
transparent logo exists: **Header → Colors → Top row background** → `#0A0A0A`, and **Top
row text** → `#FFFFFF`. Say the word and I'll set it.
