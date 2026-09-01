# Shorette's Bait & Tackle — Theme Redesign Plan

Target: rebuild the visual presentation of the live Shopify theme to match the supplied desktop
homepage reference, while preserving every piece of existing store functionality.

---

## 1. Current architecture (audit result)

**Theme:** Shopify **Horizon** (not Dawn, not a Dawn derivative). Online Store 2.0, block-based.

| Area | Finding |
|---|---|
| Layout | `layout/theme.liquid` (plus `password.liquid`). Renders `header-group`, `content_for_layout`, `footer-group`, then cart drawer, theme drawer, search modal, quick-add modal. |
| Design tokens | `snippets/theme-styles-variables.liquid` (687 lines) emits a full token set: spacing, radii, layers, type scale, easing. `snippets/color-palette.liquid` derives every colour var from `settings.color_palette` plus the per-component palette settings. |
| Global CSS | `assets/base.css` (1829 lines) plus per-section `{% stylesheet %}` blocks (Horizon convention: CSS lives with the section). |
| Header | `sections/header.liquid` (1819 lines). Already supports logo position L/C/R, menu row top/bottom, search row top/bottom, localization, transparent header, sticky modes, per-row background/text colours, cart bubble styling. Rows are laid out by `snippets/header-row.liquid` into **left / center / right** columns. |
| Navigation | `blocks/_header-menu.liquid` (1068 lines). Driven by a Shopify **linklist** (`menu` setting). Already supports mega menus (`menu_style`: text / featured_collections / featured_products), a dedicated **navigation bar** variant with its own background/text colours, and a mobile **drawer** with accordion plus nested menus. |
| Search | `snippets/search.liquid` renders an **icon** that opens `snippets/search-modal.liquid`. The modal wraps `<predictive-search-component>` (`assets/predictive-search.js`). The component's dialog binding is optional (`get dialog() { return this.closest('dialog-component') }`, guarded by `if (dialog)`), **so it can run inline outside a dialog.** |
| Hero | `sections/hero.liquid` (1498 lines), generic and block-driven, desktop plus mobile media, overlay, height presets. |
| Footer | `sections/footer.liquid` accepts `menu`, `logo`, `text`, `image`, `icon`, `group`, `social-links`, `email-signup`, `payment-icons`, `follow-on-shop`, `@app`. `sections/footer-utilities.liquid` holds copyright / policies / socials (max 3 blocks). |
| Templates | 14 JSON/Liquid templates. `templates/index.json` currently holds 3 empty `_blocks` sections, `hero`, `product-list` (Slime Time), one `_blocks` section holding 9 blocks, and 1 empty `_blocks`. |
| Custom blocks | 8 `ai_gen_block_*.liquid` blocks built for this store, notably **`ai_gen_block_94b69a6` = "Community catches" (1479 lines)**, plus New arrivals, Featured collection, Social proof, YouTube video, and 3 blog blocks. |
| Apps (must not break) | Instafeed (homepage app block), Shopify Forms, Shopify Inbox, Tapita SEO & Speed (also `{% include 'tapita-seo-schema' %}` in `<head>`), Webrex AI SEO Optimizer. |
| Current brand settings | Palette `#ffffff / #000000 / #dfdfdf / #b6de48`. Heading font `andada_pro_n4` (serif), body `catamaran_n4`. Logo and inverse logo already uploaded. Cart type: drawer. |

### Live store data (queried via Shopify Admin API)

- **Store:** Shorette's Bait And Tackle, shorettesbaitandtackle.com, Basic plan, USD.
- **27 collections** exist: `apparel`, `bucktails-1`, `chatter-bait`, `crank-baits`, `fly-fishing`,
  `glide-baits-1`, `hats`, `frontpage`, `hoodies`, `jerkbaits`, `jigging`, `kids-zone`,
  `long-sleeve-shirts`, `marine-batteries-accessories`, `nets`, `rods-reels-rod-racks`, `rubber`,
  `shorts`, `slime-time`, `spinners`, `t-shirts`, `tackle-bags`, `terminal-tackle`,
  `the-used-lure-rack`, `topwater`, `trolling-lures`, `womans`.
- **No collections exist** for species (musky/bass/walleye/pike/panfish/trout), Shorette's
  Originals, Deals, or individual brands. These are handled as configurable, omit-if-empty blocks.
- **Pages:** `contact`, `about-us`, `slime-time`, `musky-guide-service`, `blogs`, `data-sharing-opt-out`.
- **Blogs:** `news` ("The Tackle Blog") plus 2 others.
- **Menus:** `main-menu` (flat, 23 top-level items, needs restructuring in admin), `footer`,
  `customer-account-main-menu`.

---

## 2. Strategy

**Configuration first, additive second, override last.** In priority order:

1. **Drive as much as possible through existing Horizon settings.** The header/nav structure in the
   reference (announcement strip, then logo + search + actions, then a dark nav bar with dropdowns)
   is already expressible with `menu_row: bottom` plus per-row colours plus the mega-menu block.
   No header rewrite.
2. **Add small, well-scoped capabilities** where Horizon genuinely lacks them (inline search field,
   side-by-side announcements), always as new options with the existing behaviour as the default.
3. **Add new sections** only for reference layouts Horizon has no equivalent for: species/category
   nav, feature tile grid, brand strip, trust bar, brand hero.
4. **One brand CSS layer** loaded after `base.css`, built on CSS custom properties, with no
   `!important` except where an inline style must be beaten.

**Nothing existing is deleted.** `hero.liquid`, all `ai_gen_block_*`, the Instafeed app block, and
every app embed stay in place.

---

## 3. Files to create

| File | Purpose |
|---|---|
| `assets/shorettes-brand.css` | Brand design system: `--shorettes-*` tokens, shared component classes, targeted Horizon refinements. |
| `snippets/shorettes-brand-vars.liquid` | Emits brand tokens from theme settings so colours stay theme-editor editable. |
| `snippets/shorettes-icon.liquid` | Original inline SVG icon set (species, category, trust icons). |
| `snippets/search-inline.liquid` | Inline predictive-search field for the header, reusing `predictive-search-component`. |
| `sections/shorettes-hero.liquid` | Brand hero: eyebrow, headline, copy, 2 CTAs, regional badge, desktop plus mobile image, focal point, overlay. |
| `sections/shorettes-category-nav.liquid` | "Shop by species" plus "Shop by category" split strip, block-driven. |
| `sections/shorettes-feature-tiles.liquid` | Promotional tile grid (Originals / Slime Time / Community Catches / New Arrivals / Best Sellers). |
| `sections/shorettes-brand-strip.liquid` | Top-brands logo row, block-driven, links to vendor/collection URLs. |
| `sections/shorettes-trust-bar.liquid` | Four-up trust bar with icons. |

## 4. Files to modify

| File | Change | Risk |
|---|---|---|
| `layout/theme.liquid` | Render `shorettes-brand-vars` plus the brand stylesheet after the existing ones. | Low, additive. |
| `sections/header.liquid` | Add `search_style` (`icon` or `inline`) and a `center` option for `search_position`; pass through to `snippets/search`. Existing defaults unchanged. | Low, new settings default to current behaviour. |
| `snippets/search.liquid` | Dispatch to `search-inline` when style is `inline`. | Low. |
| `sections/header-announcements.liquid` | Add `layout` (`carousel` or `row`) and optional contact text/link on the right. Default `carousel` matches today's behaviour. | Low. |
| `config/settings_schema.json` | New "Shorette's brand" settings group (brand colours consumed by the custom sections). | Low, appended group. |
| `config/settings_data.json` | Brand palette, heading font, button/badge/input styling. | **Medium.** This file is admin-owned; changes here are what the merchant sees. Documented in the report so they can revert. |
| `sections/header-group.json` | Reconfigure announcement bar plus header to the reference structure. | Medium, replaces current header config. |
| `sections/footer-group.json` | Rebuild footer content (brand column, 3 menus, contact, newsletter, socials, payment icons). | Medium. |
| `templates/index.json` | Insert new sections in reference order and **keep** the existing `_blocks` section with all 9 blocks (Community Catches, Instafeed, New Arrivals, blog blocks). | Medium, additive. |

## 5. Components that must remain untouched

- `blocks/ai_gen_block_*.liquid` (all 8, especially **Community catches**).
- The Instafeed app block instance in `templates/index.json`.
- All app embeds in `settings_data.json` under `current.blocks` (Forms, Inbox, Tapita, Webrex).
- `{% include 'tapita-seo-schema' %}` and `{{ content_for_header }}` in `layout/theme.liquid`.
- Cart drawer, quick add, predictive search JS, product form, variant picker, facets.
- `snippets/meta-tags.liquid`, the Organization JSON-LD in `header.liquid`, product/collection schema.
- All `templates/*.json` other than `index.json`.

## 6. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Two `predictive-search-component` instances on one page (modal plus inline) colliding on element IDs. | The inline variant uses distinct `id`s and its own `data-section-id`; the modal is untouched. |
| Inline search breaking on mobile. | The inline field is desktop-only; mobile keeps the existing icon-to-modal path. |
| Reference nav names (BRANDS, DEALS, FISHING RESOURCES) have no matching collections. | Nav stays 100% linklist-driven. No hardcoded links. A recommended menu tree using only real handles is documented in the report; the merchant applies it in admin. |
| Species / Originals / Best Sellers collections do not exist. | Every tile and species block has a `url` setting and **renders nothing when unset**, so no broken links are created. |
| Brand logos are third-party trademarks. | No third-party logos are added to the repo. The brand strip takes merchant-uploaded images and falls back to a styled wordmark. |
| `settings_data.json` is auto-generated and may be overwritten by admin edits. | Changes are limited to presentation keys; app embeds and `content_for_index` are preserved byte for byte. Documented for rollback. |
| Font handle validity. | Heading font set to `oswald_n7` (Shopify font library, condensed outdoor character). All CSS references `var(--font-heading--family)`, so a merchant font change flows through with no code edits. |

## 7. Implementation order (commit milestones)

1. Theme audit plus this plan.
2. Global design system (brand tokens, CSS layer, icon set, theme settings).
3. Header, navigation, announcement bar, inline search.
4. Brand hero section.
5. Species / category nav section.
6. Feature tile grid.
7. Brand strip and trust bar.
8. Footer rebuild.
9. Homepage template assembly (`templates/index.json`).
10. Responsive polish, `shopify theme check`, QA and delivery docs.
