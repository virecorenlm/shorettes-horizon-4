# Shorette's Bait & Tackle — Redesign Report

Theme: **Shopify Horizon 4.1.5** (Online Store 2.0, block-based)
Store: shorettesbaitandtackle.com
Baseline commit: `0fdbc35` · Delivered through `08b9a52`

---

## 1. Summary of changes

The storefront's visual presentation now follows the supplied desktop reference: a navy
utility strip, a bone header carrying the logo, a prominent search field and account/cart
actions, a dark navigation band, a full-bleed brand hero, species and category navigation,
a five-tile promo grid, a brand strip and a navy trust bar, over a rebuilt dark footer.

The approach was **configuration first, additive second, override last**:

- Horizon already supported most of the reference header (logo/menu/search positioning,
  a second navigation row with its own colours, linklist-driven mega menus, a mobile
  drawer). That structure was **configured**, not rewritten. `sections/header.liquid`
  gained two settings and one option; nothing was removed.
- Five genuinely new layouts became five new sections. All are block-driven and fully
  editable in the theme editor.
- One brand CSS layer (`assets/shorettes-brand.css`) holds shared primitives and
  header/nav refinements. Per-section CSS stays in each section's `{% stylesheet %}`
  block, matching Horizon's own convention. No `!important` was added.

**Nothing was deleted.** All 8 `ai_gen_block_*` blocks (including the 1,479-line
**Community catches**), the Instafeed app block, the Slime Time product list, and all four
app embeds (Shopify Forms, Shopify Inbox, Tapita SEO & Speed, Webrex AI SEO) are intact.
The old generic hero and four empty placeholder sections are **disabled, not removed**, so
their settings remain editable and reversible.

One pre-existing bug was fixed along the way: the sold-out badge had identical background
and text colours, rendering its label invisible.

### Validation performed

| Check | Result |
|---|---|
| `shopify theme check` | 25 offenses, **all pre-existing**: 22 in `snippets/tapita-seo-schema.liquid` (app-installed), 1 `include` deprecation in `layout/theme.liquid` (the Tapita line), 1 unused doc param in `snippets/meta-tags.liquid`, 1 `JSONMissingBlock` for the Instafeed app block (theme-check cannot resolve app blocks locally — its presence confirms Instafeed survived). **Zero offenses in any file created or modified.** |
| JSON validity | All theme JSON parses, including the comment-bannered `settings_data.json` and `templates/index.json`. |
| Section schemas | All five new schemas parse; settings, blocks and presets counted and correct. |
| Responsive | Verified at 390 / 768 / 1024 / 1280 / 1440. No horizontal overflow at any width. Two grid defects found and fixed (see §9). |

---

## 2. Files created (12)

| File | Purpose |
|---|---|
| `assets/shorettes-brand.css` | Brand design system: primitives (type scale, buttons, surfaces, media) plus header, nav and footer refinements. |
| `assets/shorettes-header-search.js` | ~80 lines. Hands the inline search field's query to the existing predictive-search modal. Progressive enhancement only. |
| `snippets/shorettes-brand-vars.liquid` | Emits `--shorettes-*` tokens from theme settings. |
| `snippets/shorettes-icon.liquid` | Original SVG set: 6 species, 7 category, 6 trust/utility icons. |
| `snippets/shorettes-catnav-item.liquid` | Shared icon-plus-label markup for the category nav. |
| `snippets/search-inline.liquid` | The expanded header search field. |
| `sections/shorettes-hero.liquid` | Brand hero. |
| `sections/shorettes-category-nav.liquid` | Shop by species + shop by category. |
| `sections/shorettes-feature-tiles.liquid` | Promotional tile grid. |
| `sections/shorettes-brand-strip.liquid` | Top brands row. |
| `sections/shorettes-trust-bar.liquid` | Four-up trust bar. |
| `DESIGN_REBUILD_PLAN.md` | The pre-implementation audit and plan. |

## 3. Files modified (10)

| File | Change |
|---|---|
| `layout/theme.liquid` | Two lines added in `<head>`: render brand tokens, then the brand stylesheet. Nothing existing touched — `content_for_header`, the Tapita include, meta tags, fonts and scripts are untouched. |
| `sections/header.liquid` | Added `search_style` (`Icon` \| `Expanded field`) and `search_placeholder`; added a `center` option to `search_position`; added a `drawer_search_style` local so the mobile drawer always keeps the modal. Defaults preserve today's behaviour exactly. |
| `snippets/search.liquid` | Dispatches to `search-inline` when style is `inline`. The `modal` and `none` paths are unchanged. |
| `sections/header-announcements.liquid` | Added `announcement_layout` (`Rotating` \| `Row`), `contact_text`, `contact_link`, plus row-layout CSS. Default `Rotating` is today's behaviour. |
| `blocks/_announcement.liquid` | `aria-hidden` is now only applied in rotating mode, so row-mode announcements are not hidden from screen readers. |
| `config/settings_schema.json` | Appended a **"Shorette's brand"** settings group (5 colours). Existing groups untouched. |
| `config/settings_data.json` | Brand palette, Oswald display headings, orange primary buttons, squared radii, larger logo. App embeds and `content_for_index` asserted unchanged. |
| `sections/header-group.json` | Reconfigured to the reference structure. All existing section and block ids preserved. |
| `sections/footer-group.json` | Rebuilt content. All existing section and block ids preserved; the disabled custom-liquid section kept. |
| `templates/index.json` | New section order. Existing sections preserved; old hero and four empty placeholders disabled rather than removed. |

## 4. Sections added

| Section | Blocks | Notes |
|---|---|---|
| **Shorette's hero** | — | Eyebrow, headline (multi-line), copy, two CTAs, regional badge. Desktop + mobile image with focal-point support, three overlay styles, five height options. |
| **Shorette's category nav** | `Species`, `Category` | Two groups split by a rule at ≥1100px. Icon or uploaded image per block. |
| **Shorette's feature tiles** | `Tile` (max 6) | Per-tile image, heading, copy, CTA, link, accent (default / orange / slime green), overlay opacity. |
| **Shorette's brand strip** | `Brand` (max 16) | Uploaded logo or wordmark fallback, optional link, optional "view all". |
| **Shorette's trust bar** | `Item` (max 4) | Icon, heading, copy. |

All five carry `presets`, so they appear under **Add section** in the theme editor.

## 5. Settings added

**Theme settings → Shorette's brand** (new group, at the bottom of the list):
`shorettes_color_navy` `#0B171D` · `shorettes_color_blue` `#176B87` ·
`shorettes_color_bone` `#F4F1E8` · `shorettes_color_orange` `#F05A28` ·
`shorettes_color_slate` `#66747A`

**Header section:** `search_style`, `search_placeholder`, and `center` added to `search_position`.

**Announcement bar section:** `announcement_layout`, `contact_text`, `contact_link`.

Changed in **Theme settings** (all revertible in the editor): colour palette
(`foreground` `#000000` → `#0b171d`; brand colours added as `color4`–`color9`; the Slime
Time green `#b6de48` preserved as `color7`), heading font `andada_pro_n4` → `oswald_n7`,
H1/H2 case → uppercase, primary button → orange on white, badge → orange/uppercase/squared,
radii → 2px, logo height 36 → 88 (mobile 28 → 44).

---

## 6. Navigation you need to configure in Shopify admin

**This is the highest-value remaining task.** Navigation is store data, not theme code, so
I did not modify it. `main-menu` is currently flat with 23 top-level items; the reference
expects ~10 with dropdowns. The theme is 100% linklist-driven, so restructuring the menu in
admin is all that is required — no code changes.

Go to **Settings → Navigation → Main menu** and restructure to this, using only handles
that exist today:

| Top level | Children (existing collections) |
|---|---|
| **Shop** | link to `/collections/all` |
| **Baits** | Jerkbaits `/collections/jerkbaits` · Glide Baits `/collections/glide-baits-1` · Crankbaits `/collections/crank-baits` · Topwater `/collections/topwater` · Bucktails `/collections/bucktails-1` · Rubber `/collections/rubber` · Chatter Bait `/collections/chatter-bait` · Spinners `/collections/spinners` · Jigging `/collections/jigging` · Trolling Lures `/collections/trolling-lures` · The Used Lure Rack `/collections/the-used-lure-rack` |
| **Rods & Reels** | Rods, Reels & Rod Racks `/collections/rods-reels-rod-racks` |
| **Terminal Tackle** | Terminal Tackle `/collections/terminal-tackle` |
| **Marine** | Marine Batteries & Accessories `/collections/marine-batteries-accessories` · Nets `/collections/nets` · Tackle Bags `/collections/tackle-bags` |
| **Apparel** | Hoodies `/collections/hoodies` · T-shirts `/collections/t-shirts` · Long sleeve `/collections/long-sleeve-shirts` · Hats `/collections/hats` · Shorts `/collections/shorts` · Women's `/collections/womans` · Apparel `/collections/apparel` |
| **Fly Fishing** | `/collections/fly-fishing` |
| **Slime Time** | `/collections/slime-time` |
| **Kid's Zone** | `/collections/kids-zone` |
| **Fishing Resources** | The Tackle Blog `/blogs/news` · Musky Guide Service `/pages/musky-guide-service` · About Us `/pages/about-us` · Contact `/pages/contact` |

**Brands** and **Deals** are in the reference but have no backing data yet — see §8.

Once the menu has children, set the header menu style: **Theme editor → Header → Menu →
Menu style** offers *Text*, *Featured collections* and *Featured products*. It is currently
**Text** (clean dropdowns). Switch it to *Featured collections* if you want image-led mega
menus.

**Optional footer menus.** The footer's "Shop" column currently points at `main-menu`,
which will be long until you restructure it. Consider creating a short `footer-shop` menu
and repointing that column (**Theme editor → Footer → Shop → Menu**). The "Customer
service" column already uses your existing `footer` menu.

## 7. Images and logos you still need to upload

Every one of these degrades gracefully today — no broken images, no empty boxes.

| Where | What | Current fallback |
|---|---|---|
| **Hero → Media → Desktop image** | A wide St. Lawrence fishing shot, ~2400px wide | Navy-to-blue gradient |
| **Hero → Media → Mobile image** | Portrait/square crop of the same scene | Uses the desktop image |
| **Hero → Regional badge → Badge image** | Optional county/region outline | Text badge only, which already looks complete |
| **Feature tiles → each tile → Image** | 5 images (~1400px wide): originals, Slime Time, community catch, new arrivals, best sellers | Solid navy tile; text and CTA still legible |
| **Brand strip → each brand → Logo** | Logos for the 8 seeded brands | Brand name as a styled wordmark |
| **Category nav → any block → Image** | Optional photo per species/category | Built-in SVG icon (already on-brand) |

**Note on brand logos:** no third-party logos were added to the repository, deliberately.
Upload only marks you have permission to display.

Set the **focal point** on the hero image in **Content → Files** — the section reads it and
applies it as `object-position`, so the crop stays right at every width.

## 8. Collections that may need mapping

These exist in the reference but not in the store. Each is **left unlinked on purpose**:
the sections render such items visibly but non-clickable, so no dead links were created.

| Item | Where | Suggested fix |
|---|---|---|
| Musky, Bass, Walleye, Pike, Panfish, Trout | Category nav → Species | Create six smart collections by tag or product type, then set each block's **Link**. |
| **Lures** | Category nav → Category | No parent lure collection exists. Create one, or repoint to `/collections/crank-baits`. |
| **Shorette's Originals** | Feature tiles, tile 1 | Create a collection for your own lures and set the tile's **Link**. |
| **Community Catches** | Feature tiles, tile 3 | No destination page exists. Create a page, or repoint at the Community Catches block further down the home page. |
| **Deals** | Nav (reference) | Create a sale collection, then add it to `main-menu`. |
| **Brands** | Nav + brand strip "view all" | No brands index page. Brand strip links use `/collections/vendors?q=<name>`, which works today. |

Already mapped and live: Rods & reels, Terminal tackle, Marine, Apparel, Kids, Slime Time,
New arrivals (`?sort_by=created-descending`), Best sellers (`?sort_by=best-selling`).

## 9. Limitations

1. **No live preview was possible.** `shopify theme list --store shorettesbaitandtackle.com`
   returned *"You are not authorized to use the CLI to develop in the provided store"*, so
   I could not render the real theme. Responsive verification used a static harness built
   from the shipped CSS. **The Liquid itself has not been rendered against live data** —
   preview on an unpublished theme before publishing (§11).
2. **Two grid defects were found and fixed** during that check: an orphaned last tile in
   the two-column range, and a leaked `grid-column: 1 / -1` that reordered the five-across
   row at ≥1100px. Both are fixed and re-verified.
3. **`oswald_n7` is not verified against Shopify's live font library.** It is a standard
   library family, but if the theme editor rejects it, pick any heading font in **Theme
   settings → Typography → Heading**; all CSS reads `var(--font-heading--family)`, so no
   code change is needed.
4. **Navigation is unchanged.** The nav renders whatever `main-menu` contains today, which
   is 23 flat items. The reference's dropdowns appear only after §6.
5. **The desktop account control shows a single label**, not the reference's two-line
   "My Account / Sign In · Register". That is Horizon's account button; changing it would
   mean overriding customer-account markup, which risks account functionality.
6. **`config/settings_data.json` is admin-owned.** Editing theme settings in admin
   rewrites it. Changes there will not conflict with the code, but keep this repo in sync.
7. **The announcement row hides announcements 3+ below 750px** to prevent crowding. All
   remain in the DOM and reappear on larger screens.

## 10. Recommended next steps

1. Preview on an unpublished theme and walk `SHORETTES_THEME_QA.md` (highest priority —
   nothing here has run against live data).
2. Restructure `main-menu` (§6). This is what makes the header look like the reference.
3. Upload the hero image and the five tile images (§7).
4. Create the species collections and Shorette's Originals (§8).
5. Set the real phone number: **Theme editor → Header → Announcement bar → Contact text**
   (e.g. `Call Us: (315) 649-7387`) and **Contact link** (`tel:+13156497387`). The
   reference shows this; it is blank because I would not hardcode contact details.
6. Replace the placeholder social URLs in **Footer → Utilities → Social links** — they are
   currently the generic `facebook.com` / `instagram.com` roots carried over from before.
7. Upload brand logos you have rights to (§7).

## 11. Exact Theme Editor steps after deployment

**Deploy to an unpublished theme first.**

```bash
shopify theme push --unpublished --theme "Shorette's redesign"
```

Then in **Online Store → Themes → Shorette's redesign → Customize**:

1. **Theme settings → Shorette's brand** — confirm the five colours read
   `#0B171D`, `#176B87`, `#F4F1E8`, `#F05A28`, `#66747A`.
2. **Theme settings → Typography → Heading** — confirm Oswald loaded. If not, pick a bold
   condensed face.
3. **Header → Announcement bar** — Layout is *Row*; edit the three messages; add
   **Contact text** and **Contact link**.
4. **Header** — confirm Search style is *Expanded field*, Position *Center*, Menu row
   *Bottom*. Adjust **Search placeholder** if you want different copy.
5. **Header → Menu** — after restructuring `main-menu` (§6), optionally switch **Menu
   style** to *Featured collections* for image-led mega menus.
6. **Home page → Shorette's hero** — upload Desktop and Mobile images; set the two button
   links (currently `/collections/all` and the new-arrivals sort).
7. **Home page → Shorette's category nav** — set a **Link** on each of the six species
   blocks and on **Lures** once those collections exist.
8. **Home page → Shorette's feature tiles** — upload the five images; set links for
   *Shorette's originals* and *Community catches*.
9. **Home page → Shorette's brand strip** — upload logos; optionally set **View all label**
   and **View all link** to show the trailing link.
10. **Home page → Shorette's trust bar** — adjust the four headings and copy.
11. **Footer** — confirm the logo (it uses your **inverse** logo on the navy background),
    tagline, contact text; replace the social URLs; repoint the **Shop** menu if you create
    `footer-shop`.
12. Scroll the whole home page at desktop and mobile widths, then publish.

**To roll back:** `git revert` to `0fdbc35`, or in admin use **Online Store → Themes →
Actions** to keep the currently published theme live — this work has not touched it.
