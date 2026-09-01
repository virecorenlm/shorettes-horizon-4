# Collection Mapping — Shorette's Bait & Tackle

Audit of every destination the new home page points at, checked against the live
catalogue. No handle in this document is invented; anything that does not exist is marked
**MISSING** with the exact rule needed to create it.

**Catalogue at time of audit:** 3,398 products · 27 collections · 113 vendors ·
6 pages · 3 blogs.

---

## 1. Homepage destination audit

### Hero

| Component | Intended destination | Existing collection / page | Handle | Status | Recommended action |
|---|---|---|---|---|---|
| Hero primary CTA "Shop baits" | Baits landing | All products | — (`/collections/all`) | ✅ Not missing | Repoint to a `baits` collection if you create one; `/collections/all` is honest meanwhile |
| Hero secondary CTA "Shop new arrivals" | Newest products | Sorted all-products view | — (`/collections/all?sort_by=created-descending`) | ✅ Not missing | None |

### Shop by species

All six species are **already product tags** — this is the store's established convention
(four existing collections are tag-driven). Creating these is a five-minute job.

| Component | Intended destination | Existing collection | Handle | Status | Recommended action |
|---|---|---|---|---|---|
| Musky | Musky collection | — | — | **MISSING** | Create smart collection, rule `Product tag is equal to Musky` → **48 products** |
| Bass | Bass collection | — | — | **MISSING** | Rule `Product tag is equal to Bass` → **217 products** |
| Walleye | Walleye collection | — | — | **MISSING** | Rule `Product tag is equal to Walleye` → **187 products** |
| Pike | Pike collection | — | — | **MISSING** | Rule `Product tag is equal to Pike` → **179 products** |
| Panfish | Panfish collection | — | — | **MISSING** | Rule `tag = Panfish` **OR** `tag = Crappie` → **9 products** (4 + 5). Thin — see §3 |
| Trout | Trout collection | — | — | **MISSING** | Rule `Product tag is equal to Trout` → **1 product**. Too thin to launch — see §3 |

### Shop by category

| Component | Intended destination | Existing collection | Handle | Status | Recommended action |
|---|---|---|---|---|---|
| Lures | Parent lure collection | — | — | **MISSING** | No parent exists. Create smart collection with `tag = Crank Bait` OR `Jerkbait` OR `Topwater` OR `Glide Bait` OR `Bucktail` OR `Spinner` OR `Chatter Bait`. Or point at `crank-baits` (122) as an interim |
| Rods & reels | Rods, Reels & Rod Racks | Rods, Reels & Rod Racks | `rods-reels-rod-racks` | ✅ Not missing | None — 70 products, wired |
| Terminal tackle | Terminal Tackle | Terminal Tackle | `terminal-tackle` | ✅ Not missing | None — 122 products, wired |
| Marine | Marine Batteries & Accessories | Marine Batteries & Accessories | `marine-batteries-accessories` | ✅ Not missing | None — 70 products, wired |
| Apparel | Apparel | Apparel | `apparel` | ⚠ Exists but **1 product** | Populate it, or repoint the tile to `hoodies` (42) |
| Kids | Kid's Zone | KID'S ZONE | `kids-zone` | ✅ Not missing | None — 46 products, wired |

### Feature tiles

| Component | Intended destination | Existing collection / page | Handle | Status | Recommended action |
|---|---|---|---|---|---|
| Shorette's Originals | House-brand lures | — | — | **MISSING** | Create smart collection, rule `Product vendor is equal to Shorette's Bait And Tackle` → **88 products**. Highest-value item in this document |
| Slime Time | Slime Time | SLIME TIME | `slime-time` | ✅ Not missing | **Already wired**, and supplies the tile image automatically |
| Community Catches | Catches page | — | — | **MISSING** | Create a page `community-catches`. The homepage Community Catches block already exists further down the page and can be linked to instead |
| New Arrivals | Newest products | Sorted all-products view | — | ✅ Not missing | **Wired.** Image comes from the `frontpage` collection (20 curated products) |
| Best Sellers | Best-selling products | Sorted all-products view | — | ✅ Not missing | Link works. Needs a collection or uploaded image for artwork |

### Brand strip

| Component | Intended destination | Exists? | Status | Recommended action |
|---|---|---|---|---|
| Rapala, Berkley, Livingston Lures, Headbanger Lures, Savage Gear, Beyond Braid, Monster Marine Lithium, Natives Fly Fishing | `/collections/vendors?q=<Vendor>` | Yes — all 8 are real vendors | ✅ Not missing | Upload logos you have rights to; wordmark fallback renders meanwhile |
| "View all brands" link | Brands index page | — | **MISSING** | Create page `brands`, then set **Theme editor → Brand strip → View all link**. Left blank, the link simply does not render |

### Trust bar

All four items are static text with built-in icons. No destinations, nothing missing.

### Navigation (see `SHOPIFY_NAVIGATION_SETUP.md`)

| Component | Status | Recommended action |
|---|---|---|
| DEALS | **MISSING** backing collection | Interim: `/collections/the-used-lure-rack`. Long term: create `deals` — see §2 |
| BRANDS → View all | **MISSING** | Create page `brands` |
| SLIME TIME | ✅ collection exists | ⚠ Use the **collection**; `/pages/slime-time` is unpublished and would 404 |

---

## 2. Collections to create — exact rules

Shopify Admin → **Products → Collections → Create collection → Smart collection**.

### Priority 1 — unblocks visible homepage gaps

| Title | Handle | Type | Rule | Yield |
|---|---|---|---|---|
| Shorette's Originals | `shorettes-originals` | Smart | `Product vendor` **is equal to** `Shorette's Bait And Tackle` | 88 |
| Musky | `musky` | Smart | `Product tag` **is equal to** `Musky` | 48 |
| Bass | `bass` | Smart | `Product tag` **is equal to** `Bass` | 217 |
| Walleye | `walleye` | Smart | `Product tag` **is equal to** `Walleye` | 187 |
| Pike | `pike` | Smart | `Product tag` **is equal to** `Pike` | 179 |
| Panfish | `panfish` | Smart, **any** condition | `tag = Panfish` OR `tag = Crappie` | 9 |

### Priority 2 — navigation completeness

| Title | Handle | Type | Rule | Note |
|---|---|---|---|---|
| Deals | `deals` | Smart | `Product tag` **is equal to** `Sale` | Requires tagging products `Sale` first — the tag does not exist yet |
| Lures | `lures` | Smart, **any** | `tag` = `Crank Bait`, `Jerkbait`, `Topwater`, `Glide Bait`, `Glide Baits`, `Bucktail`, `Bucktails`, `Spinner`, `Chatter Bait` | Parent for the Lures tile |
| Trout | `trout` | Smart | `Product tag` **is equal to** `Trout` | **Only 1 product** — tag more first |

### Optional — deeper navigation

These would let RODS & REELS and TERMINAL TACKLE have real dropdowns. All use existing
**product types**.

| Title | Rule | Types present in catalogue |
|---|---|---|
| Casting Reels | `Product type` = `Casting Reel` | ✅ |
| Fishing Reels | `Product type` any of `Fishing Reel`, `Fishing Reels` | ✅ |
| Fishing Rods | `Product type` any of `Fishing Rod`, `Fishing Rods`, `Inshore Rods`, `Offshore Rods`, `Catfish Rod` | ✅ |
| Combos | `Product type` = `Baitcaster Combo` | ✅ |
| Rod Storage | `Product type` any of `Fishing Rod Rack`, `Fishing rod storage rack`, `Fishing Rack` | ✅ |
| Hooks | `Product type` any of `Hooks`, `Fishing Hooks` | ✅ |
| Leaders | `Product type` any of `Leaders`, `Fluorocarbon Fishing Leader` | ✅ |
| Swivels | `Product type` = `Swivels` | ✅ |
| Fishing Line | `Product type` any of `Fishing Line`, `Braided Fishing Line`, `Fluorocarbon` | ✅ |
| Weights | `Product type` = `Tungsten` | ✅ (check coverage) |

---

## 3. Species strategy

**The catalogue already supports species navigation.** No metafields, no new taxonomy, no
manual curation — the tags exist and the store already uses tag-driven smart collections
(`chatter-bait`, `fly-fishing`, `rubber`, `slime-time` are all built this way). Creating
species collections follows the convention already in place rather than introducing a new
one.

| Species | Tag | Products | Verdict |
|---|---|---|---|
| Bass | `Bass` | 217 | Launch as-is |
| Walleye | `Walleye` | 187 | Launch as-is |
| Pike | `Pike` | 179 | Launch as-is |
| Musky | `Musky` | 48 | Launch as-is |
| Panfish | `Panfish` + `Crappie` | 9 | Launch, but combine both tags |
| Trout | `Trout` | 1 | **Do not launch yet** |

**Recommendation for Trout:** leave its species tile unlinked in the theme editor (it
renders visibly but is not clickable, which is already the shipped behaviour) until enough
products carry the tag. The store does stock trout-adjacent inventory — product types
`Trout Nymph Flies` and `Trout Wet Flies` exist, and `fly-fishing` has 62 products — so
tagging those `Trout` would likely lift it above the threshold in one bulk edit.

**Do not** hand-build these as custom collections. Smart collections keep working as stock
turns over; a manual list goes stale immediately at 3,398 products.

---

## 4. Tag hygiene worth fixing

Duplicate and near-duplicate tags found during the audit. None blocks the redesign, but
they split collection results:

| Issue | Tags |
|---|---|
| Singular/plural duplicates | `Bucktail` / `Bucktails`, `Glide Bait` / `Glide Baits` |
| Vendor names used as tags | `Chaos tackle`, `Livingston Lures`, `Headbanger Lures`, `KastKing` and ~40 more — these duplicate the vendor field |
| Colour tags in the product tag space | ~50 `Color: …` tags. These belong in a variant option or metafield, not tags |
| Compound tags | `Used Lure Rack; Glide Baits; Bagley Baits; 6 inch` and 17 similar — a single tag holding four facets, so it cannot be filtered on |

Product **types** have the same problem (`Hat`/`hat`, `Hoodie`/`HOODIE`, `Crankbait`/
`Crankbaits`, `Jerkbait`/`Jerkbaits`, `Bearings`/`bearings`). Any smart collection built on
type should list both casings, as noted in the rules above.

---

## 5. Summary

| | Count |
|---|---|
| Homepage destinations verified working | 11 |
| Destinations needing a collection created | 8 |
| Destinations needing a page created | 2 (`community-catches`, `brands`) |
| Collections needing content, not creation | 1 (`apparel`, 1 product) |
| Broken links currently shipped | **0** — every unmapped item renders unlinked by design |
