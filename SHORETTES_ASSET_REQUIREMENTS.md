# Asset Requirements — Shorette's Bait & Tackle

What the redesigned storefront needs, what already exists in the store, and where each
piece gets uploaded.

Every gap below **degrades gracefully today** — no broken images, no empty boxes. Nothing
here blocks a preview build.

---

## 1. Logo audit — what already exists

Five candidate logo files were found in **Content → Files** and inspected directly
(dimensions, colour type, alpha channel, and sampled background colour):

| File | Style | Canvas | Background | Transparent? | Horizontal? | On the new identity? |
|---|---|---|---|---|---|---|
| `ChatGPT_Image_Dec_20_2025_11_40_24_PM.png` **(current header logo)** | Slime-green dripping wordmark | 1536×1024 | Opaque `#F8F3ED` | ❌ RGB, no alpha | Partly — wordmark on a 3:2 canvas | ❌ Slime Time sub-brand |
| `ChatGPT_Image_Dec_20_2025_10_39_05_PM.png` **(current footer / inverse logo)** | Slime crest badge on a black panel | 1536×1024 | Black panel | Partial | ❌ Badge | ❌ Slime Time sub-brand |
| `ChatGPT_Image_Dec_20_2025_11_28_43_PM.png` | Black "SHORETTE'S" + slime-green "BAIT & TACKLE" | 1536×1024 | Opaque `#F4F0E9` | ❌ | ✅ **Yes** | Partly — black ✅, green accent |
| `ChatGPT_Image_Dec_20_2025_10_37_08_PM.png` (and `…10_37_00_PM.png`) | **Muskie crest, red + chrome on black** | 1536×1024 | Opaque `#000000` | ❌ | ❌ Badge | ✅ **Black + red — matches the stated identity** |
| `ChatGPT_Image_Dec_23_2025_07_24_29_PM.png` | Blue/gold "ice" horizontal wordmark | 1536×1024 | — | ✅ **Has alpha** | ✅ **Yes** | ❌ Blue/gold |

### Three findings that matter

1. **The current header logo is Slime Time artwork, not the master brand.** The storefront
   is currently wearing a sub-brand as its primary identity.
2. **No existing asset is all three of** horizontal, transparent, and black/red. The
   closest are the red muskie crest (right colours, wrong shape) and the ice wordmark
   (right shape, wrong colours).
3. **Both currently-configured logos have opaque backgrounds.** On any header colour that
   is not an exact match, they render as a visible rectangle.

### What was done about it in code

The header's top row is set to **`#F8F3ED`** — sampled from the current logo's own
background — so the logo blends with **no visible rectangle today**. The dark bands
(announcement bar, navigation, footer, trust bar) carry the black/charcoal/red/white
identity as specified.

**This coupling matters:** if you change the logo, update **Theme editor → Header →
Colors → Top row background** to match the new file's background, or upload a transparent
logo and set it to `#FFFFFF` or `#0A0A0A` freely.

---

## 2. Required before launch

### R1 — Primary horizontal logo ⭐ highest priority

| | |
|---|---|
| **Purpose** | Header wordmark. Replaces the Slime Time artwork currently standing in |
| **Content** | `SHORETTE'S` over `BAIT & TACKLE`, muskie/northern identity, optionally `ST. LAWRENCE COUNTRY • NEW YORK` |
| **Aspect ratio** | **4:1 to 5:1** (horizontal lockup, not the 3:2 badge canvas in use now) |
| **Dimensions** | **1600×400 px** (or 2000×400 for a 5:1 lockup). Minimum 2× the rendered height |
| **Format** | **PNG-24 with alpha**, or SVG. Not JPG |
| **Background** | **Transparent** — this is what removes the header-colour coupling |
| **Colours** | Black / charcoal / red / white. Sampled brand red is **`#D21404`** |
| **Desktop height** | 72 px (already set) |
| **Mobile height** | 40 px (already set) |
| **Uploaded at** | Theme settings → **Logo and favicon → Logo** |

### R2 — Inverse logo for dark surfaces

| | |
|---|---|
| **Purpose** | Footer, and any dark header variant. Currently a black-panel badge that shows as a rectangle on non-black backgrounds |
| **Aspect ratio / dimensions** | Same as R1 — 4:1 to 5:1, 1600×400 px |
| **Format** | **PNG-24 with alpha**, transparent |
| **Colours** | White / red version of R1 |
| **Rendered height** | 72 px desktop, 56 px mobile (already set in the footer logo block) |
| **Uploaded at** | Theme settings → **Logo and favicon → Inverse logo** |

Until R2 exists the footer keeps `inverse: true` against a black `#0A0A0A` background,
which is the least visible option with the current asset.

### R3 — Homepage hero image

| | |
|---|---|
| **Purpose** | Full-bleed hero behind the headline. Currently a black-to-charcoal gradient |
| **Content** | St. Lawrence water, angler or boat, with **calm space on the left third** for the headline |
| **Aspect ratio** | ~16:9 to 21:9 |
| **Dimensions** | **2400×1200 px** minimum |
| **Format** | Photographic JPG (the section serves a responsive `srcset` from 540 px up) |
| **Desktop / mobile** | **Both.** Mobile wants a separate portrait or square crop |
| **Uploaded at** | Home page → **Shorette's hero → Media → Desktop image** and **Mobile image** |
| **Also do** | Set the **focal point** in Content → Files. The section reads it and applies `object-position`, so the crop stays right at every width |

### R4 — Mobile hero image

Same source as R3, cropped **4:5 or 1:1**, 1200×1500 px. Falls back to the desktop image,
which crops tightly on a phone.

### R5 — Feature tile images (3 still needed)

Five tiles. **Two already pull real store photography automatically** — the tile section
now takes an optional collection and uses that collection's image, then its first product
image.

| Tile | Status | Action |
|---|---|---|
| Slime Time | ✅ Wired to the `slime-time` collection | None |
| New Arrivals | ✅ Wired to the `frontpage` collection | None |
| Shorette's Originals | ❌ Needs art | Create the `shorettes-originals` collection (88 products) and select it — it will then supply the image, no upload needed |
| Community Catches | ❌ Needs art | Upload an angler-with-fish photo |
| Best Sellers | ❌ Needs art | Select any collection, or upload |

| | |
|---|---|
| **Aspect ratio** | ~3:2 landscape; tiles render 260 px tall by default |
| **Dimensions** | **1400×930 px** |
| **Format** | Photographic JPG. A dark scrim sits over them, so mid-to-dark images read best |
| **Desktop / mobile** | One image serves both |
| **Uploaded at** | Home page → **Shorette's feature tiles → [tile] → Image**, or set **Collection** instead |

### R6 — Real contact details

Not an image, but launch-blocking for the header.

| | |
|---|---|
| **Purpose** | Phone number in the announcement bar, as in the mockup |
| **Uploaded at** | Header → **Announcement bar → Contact text** (e.g. `Call Us: (315) 649-7387`) and **Contact link** (`tel:+13156497387`) |
| **Why blank** | The store's phone number was not invented. It is empty until you set it |

---

## 3. Optional upgrades

### O1 — Brand logos (8)

| | |
|---|---|
| **Purpose** | Replace the text wordmarks in the brand strip |
| **Aspect ratio** | Free; height is normalised to 34 px |
| **Dimensions** | ~480×160 px, 2× the rendered height |
| **Format** | **PNG with alpha**, or SVG. Single-colour or grayscale reads best in a row |
| **Uploaded at** | Home page → **Shorette's brand strip → [brand] → Logo** |

⚠ **Only upload marks you have permission to display.** No third-party logos ship in this
repository. The wordmark fallback is a legitimate permanent choice.

### O2 — Species and category photography

The 13 built-in SVG icons (6 species, 7 category) are original artwork and are already
on-brand. Photography is optional.

| | |
|---|---|
| **Aspect ratio** | 1:1 |
| **Dimensions** | 240×240 px |
| **Format** | PNG with alpha for cut-outs; JPG for photos |
| **Uploaded at** | Home page → **Shorette's category nav → [block] → Image** |

### O3 — Hero regional badge

| | |
|---|---|
| **Purpose** | Optional emblem above "LOCAL WATER / LOCAL KNOWLEDGE / BETTER FISHING" |
| **Dimensions** | 520×520 px, **transparent PNG**, single colour |
| **Uploaded at** | Home page → **Shorette's hero → Regional badge → Badge image** |

The text badge already looks complete without it.

### O4 — Favicon

Currently inherits `shop.brand.logo`. A dedicated **512×512 px** square crop of the muskie
crest would read better in a browser tab. Theme settings → **Logo and favicon → Favicon**.

### O5 — Collection images

24 of 27 collections already have images. Three do not: **`chatter-bait`** (20 products),
**`fly-fishing`** (62), **`spinners`** (11). Worth adding — they surface in mega menus if
you switch the header menu style to *Featured collections*.

---

## 4. Summary

| | Count |
|---|---|
| Required before launch | **6** (2 logos, 2 hero crops, 3 tile images, contact details) |
| Optional upgrades | 5 groups |
| Assets already in place and reused | 24 collection images, 13 original SVG icons, 5 candidate logos |
| Placeholders shipping to production | **0** — every gap falls back to a designed empty state |

**Fastest path to the biggest visual gain:** create the `shorettes-originals` collection
(one smart rule, 88 products) — that fills a third feature tile with real product
photography without uploading anything.
