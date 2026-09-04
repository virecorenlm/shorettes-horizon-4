# Shopify Navigation Setup — Shorette's Bait & Tackle

Build this in **Shopify Admin → Content → Menus → Main menu** (handle `main-menu`).

The theme reads this linklist directly, so nothing in the code needs to change. Horizon
renders level‑1 items as the navigation band and level‑2 items as dropdowns / mega‑menu
columns automatically.

**Every destination below was verified against the live catalogue.** Items that need
something created first are marked **⚠ CREATE FIRST** and should be left out of the menu
until they exist — the storefront must never link to a handle that does not resolve.

Current state: `main-menu` has **23 flat top‑level items and no children**, which is why
the navigation band currently reads as a long list rather than a retailer's menu.

---

## Level‑1 order

| # | Label | Destination | Notes |
|---|---|---|---|
| 1 | SHOP | `/collections/all` | Catalog root, has children |
| 2 | BAITS | `/collections/all` | Grouping parent, has children |
| 3 | RODS & REELS | `/collections/rods-reels-rod-racks` | Has children |
| 4 | TERMINAL TACKLE | `/collections/terminal-tackle` | Has children |
| 5 | MARINE | `/collections/marine-batteries-accessories` | Has children |
| 6 | APPAREL | `/collections/hoodies` | Has children; see §6 |
| 7 | BRANDS | `/collections/vendors?q=Livingston+Lures` | Has children |
| 8 | SLIME TIME | `/collections/slime-time` | No children |
| 9 | DEALS | `/collections/the-used-lure-rack` | See §9 |
| 10 | FISHING RESOURCES | `/blogs/news` | Has children |

A parent item in Shopify must itself have a destination. Where a group has no natural
landing collection, point the parent at its largest child, as above.

---

## 1. SHOP

| Order | Label | Destination | Handle | Status |
|---|---|---|---|---|
| 1 | All Products | `/collections/all` | — | ✅ |
| 2 | New Arrivals | `/collections/all?sort_by=created-descending` | — | ✅ |
| 3 | Best Sellers | `/collections/all?sort_by=best-selling` | — | ✅ |
| 4 | Shorette's Originals | `/collections/shorettes-originals` | `shorettes-originals` | ⚠ CREATE FIRST |
| 5 | The Used Lure Rack | `/collections/the-used-lure-rack` | `the-used-lure-rack` | ✅ 26 products |
| 6 | Kid's Zone | `/collections/kids-zone` | `kids-zone` | ✅ 46 products |

## 2. BAITS

Ordered by depth, so the strongest categories sit at the top of the dropdown.

| Order | Label | Destination | Handle | Status |
|---|---|---|---|---|
| 1 | Rubber & Soft Plastics | `/collections/rubber` | `rubber` | ✅ 356 |
| 2 | Crankbaits | `/collections/crank-baits` | `crank-baits` | ✅ 122 |
| 3 | Topwater | `/collections/topwater` | `topwater` | ✅ 94 |
| 4 | Jerkbaits | `/collections/jerkbaits` | `jerkbaits` | ✅ 71 |
| 5 | Fly Fishing | `/collections/fly-fishing` | `fly-fishing` | ✅ 62 |
| 6 | Glide Baits | `/collections/glide-baits-1` | `glide-baits-1` | ✅ 26 |
| 7 | Chatterbaits | `/collections/chatter-bait` | `chatter-bait` | ✅ 20 |
| 8 | Jigging | `/collections/jigging` | `jigging` | ✅ 18 |
| 9 | Spinners | `/collections/spinners` | `spinners` | ✅ 11 |
| 10 | Bucktails | `/collections/bucktails-1` | `bucktails-1` | ✅ 5 |
| 11 | Trolling Lures | `/collections/trolling-lures` | `trolling-lures` | ✅ 3 |
| 12 | The Used Lure Rack | `/collections/the-used-lure-rack` | `the-used-lure-rack` | ✅ 26 |

The reference mockup also lists *Soft Plastics*, *Jigs* and *Shorette's Originals* under
BAITS. Soft Plastics is already inside `rubber` (its rule is `tag = Rubber OR tag = Soft
Plastic`), Jigs is covered by `jigging`, and Shorette's Originals needs creating.

## 3. RODS & REELS

| Order | Label | Destination | Handle | Status |
|---|---|---|---|---|
| 1 | All Rods, Reels & Racks | `/collections/rods-reels-rod-racks` | `rods-reels-rod-racks` | ✅ 70 |

The mockup's Casting Rods / Spinning Rods / Musky Rods / Casting Reels / Spinning Reels /
Combos / Rod Storage split **does not exist as collections**. The product types to build it
from *do* exist (`Fishing Rod`, `Fishing Rods`, `Casting Reel`, `Fishing Reel`, `Fishing
Reels`, `Baitcaster Combo`, `Fishing Rod Rack`, `Fishing rod storage rack`, `Inshore
Rods`, `Offshore Rods`, `Catfish Rod`). See `SHOPIFY_COLLECTION_MAPPING.md` §Optional for
the rules. Until then keep this a single item — one honest link beats six broken ones.

## 4. TERMINAL TACKLE

| Order | Label | Destination | Handle | Status |
|---|---|---|---|---|
| 1 | All Terminal Tackle | `/collections/terminal-tackle` | `terminal-tackle` | ✅ 122 |

Same situation: `Hooks`, `Fishing Hooks`, `Leaders`, `Swivels`, `Fishing Line`,
`Braided Fishing Line`, `Fluorocarbon Fishing Leader` and `Tungsten` all exist as
**product types** but not as collections.

## 5. MARINE

| Order | Label | Destination | Handle | Status |
|---|---|---|---|---|
| 1 | Batteries & Accessories | `/collections/marine-batteries-accessories` | `marine-batteries-accessories` | ✅ 70 |
| 2 | Tackle Bags | `/collections/tackle-bags` | `tackle-bags` | ✅ 31 |
| 3 | Nets | `/collections/nets` | `nets` | ✅ 12 |

## 6. APPAREL

| Order | Label | Destination | Handle | Status |
|---|---|---|---|---|
| 1 | Hoodies | `/collections/hoodies` | `hoodies` | ✅ 42 |
| 2 | T-Shirts | `/collections/t-shirts` | `t-shirts` | ✅ 39 |
| 3 | Long Sleeve Shirts | `/collections/long-sleeve-shirts` | `long-sleeve-shirts` | ✅ 27 |
| 4 | Hats | `/collections/hats` | `hats` | ✅ 13 |
| 5 | Women's | `/collections/womans` | `womans` | ✅ 11 |
| 6 | Shorts | `/collections/shorts` | `shorts` | ✅ 7 |
| 7 | Kid's Zone | `/collections/kids-zone` | `kids-zone` | ✅ 46 |

⚠ The `apparel` collection **contains only 1 product** despite a description promising the
full lineup. Do not use it as the APPAREL landing page until it is populated — point the
parent at `hoodies` instead, as in the level‑1 table.

## 7. BRANDS

Shopify's built‑in vendor route resolves without any collection being created:
`/collections/vendors?q=<Vendor+Name>`.

| Order | Label | Destination | Products |
|---|---|---|---|
| 1 | Livingston Lures | `/collections/vendors?q=Livingston+Lures` | 167 |
| 2 | Monster Marine Lithium | `/collections/vendors?q=Monster+Marine+Lithium` | 73 |
| 3 | Headbanger Lures | `/collections/vendors?q=Headbanger+Lures` | 51 |
| 4 | Beyond Braid | `/collections/vendors?q=Beyond+Braid` | 38 |
| 5 | Berkley | `/collections/vendors?q=Berkley` | 15 |
| 6 | Rapala | `/collections/vendors?q=Rapala` | 14 |
| 7 | Natives Fly Fishing | `/collections/vendors?q=Natives+Fly+Fishing` | 11 |
| 8 | Savage Gear | `/collections/vendors?q=Savage+Gear` | 8 |
| 9 | KISTLER Fishing | `/collections/vendors?q=KISTLER+Fishing` | 30 |
| 10 | View All Brands | `/pages/view-all-brands` | ⚠ **PUBLISH FIRST** — page exists but is unpublished |

> ⚠ **Vendor routes only resolve when a vendor has published products.**
> `Rapala` (14 products, **0 published**) and `Eagle Claw` (8 products, **0 published**)
> both return **404** and must not be linked. Verified published counts:
> Livingston Lures 81 · Flymen Fishing Company 50 · Headbanger Lures 48 ·
> Monster Marine Lithium 45 · Shorette's Bait And Tackle 40 · Beyond Braid 37 ·
> KISTLER Fishing 30 · Natives Fly Fishing 11 · Savage Gear 8 · Line Cutterz 6 ·
> Berkley 4 · Chaos Tackle 4 · Storm 4.

The store carries **113 vendors**. Shimano, St. Croix, Daiwa, Garmin, Spro and Abu Garcia
appear in the mockup's logo strip but **are not vendors in this store** — do not add them.

## 8. SLIME TIME

| Order | Label | Destination | Handle | Status |
|---|---|---|---|---|
| — | SLIME TIME | `/collections/slime-time` | `slime-time` | ✅ 45 |

⚠ Point this at the **collection**, not `/pages/slime-time`. That page exists but is
**unpublished** and would 404 for customers.

The theme tints any nav item whose handle contains `slime` with the Slime Time green
automatically — no per‑item configuration needed.

## 9. DEALS

There is **no sale or clearance collection**, and no `Sale`/`Clearance`/`Discount` product
tag exists. Two honest options:

- **Recommended interim:** point DEALS at `/collections/the-used-lure-rack`. That
  collection's own description already positions it as the bargain destination
  ("if you're hunting deals … this is the rack you dig through first"). Real, stocked, and
  semantically correct.
- **Better long term:** create a `deals` collection (see `SHOPIFY_COLLECTION_MAPPING.md`)
  and repoint.

The theme renders any nav item whose handle contains `deal` in Shorette's red
automatically.

## 10. FISHING RESOURCES

| Order | Label | Destination | Handle | Status |
|---|---|---|---|---|
| 1 | The Tackle Blog | `/blogs/news` | `news` | ✅ 9 articles |
| 2 | Musky Guide Service | `/pages/musky-guide-service` | `musky-guide-service` | ✅ |
| 3 | About Us | `/pages/about-us` | `about-us` | ✅ |
| 4 | Contact | `/pages/contact` | `contact` | ✅ |
| 5 | Community Catches | `/pages/community-catches` | — | ⚠ CREATE FIRST |

Two further blogs exist — `livingston-lures-titan-titan-jr-…` and `jiggin-for-walleyes` —
each holding a single article. Consider moving those articles into `news` and retiring the
one‑off blogs; they are currently unreachable from any menu.

---

## Optional: footer menus

The footer's **Shop** column currently points at `main-menu`, which will show all ten
parents once you restructure. That works, but a shorter dedicated menu reads better.

**Create `footer-shop`:** All Products · New Arrivals · Best Sellers · Slime Time ·
Kid's Zone · The Used Lure Rack.

Then set it in **Theme editor → Footer → Shop → Menu**.

The **Customer service** column already uses your existing `footer` menu (Search, Your
Privacy Choices, About us). Consider adding Contact and a Shipping/Returns page.

---

## After you finish

1. **Theme editor → Header → Menu → Menu style** is currently *Text* (clean dropdowns).
   Once level‑2 items exist, switching to *Featured collections* renders image‑led mega
   menus using each collection's own image — 24 of your 27 collections already have one.
2. Check the navigation band does not wrap at 1280px. Ten uppercase parents is near the
   practical limit; if it wraps, shorten a label (e.g. "TERMINAL" instead of
   "TERMINAL TACKLE") rather than reducing the font size.
3. Walk the navigation section of `SHORETTES_THEME_QA.md`.
