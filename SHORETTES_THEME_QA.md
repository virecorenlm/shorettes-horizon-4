# Shorette's Bait & Tackle — Theme QA Checklist

Run this against an **unpublished** theme before publishing.

```bash
shopify theme push --unpublished --theme "Shorette's redesign"
```

Why this matters: the Shopify CLI has no development session for this store, so the Liquid
in this redesign has **never been rendered against live data**. Responsive behaviour was
verified against a static harness built from the shipped CSS, but everything below needs a
real pass. Items marked **[R]** are regression checks on functionality the redesign touched
and could plausibly have broken.

---

## Breakpoints

Check each at 1440, 1280, 1024, 768 and 390 px.

| # | Check | ✓ | Vire's Notes |
|---|---|---|---|
| 1 | No horizontal scrollbar on `<body>` at any width | ✅ | Playwright measured `body.scrollWidth == innerWidth` at 1440, 1280, 1024, 768 and 390 px. |
| 2 | Header does not wrap or overlap; logo, search and actions stay on one row ≥990px | ☐ | Requires live/manual verification; not established by current source and automated evidence. |
| 3 | Navigation row is a single line ≥990px; no items clipped | ✅ | Rendered navigation stayed on one row at desktop widths; no body overflow was measured. |
| 4 | Hero text never overlaps the regional badge | ☐ | Custom hero is enabled and currently has no image. No overlap was visible at 1440/390, but all intermediate widths still need visual confirmation. |
| 5 | Feature tiles: 1-up at 390, 2-up at 768/1024 (last tile full width), 5-across ≥1100 | ✅ | `sections/shorettes-feature-tiles.liquid` defines 1-up, 2-up with odd-last span, and 5-across at the requested breakpoints. |
| 6 | Tile order left to right is Originals, Slime Time, Community, New Arrivals, Best Sellers | ✅ | `templates/index.json` block order is Originals, Slime Time, Community, New Arrivals, Best Sellers. |
| 7 | Category nav: 3-up at 390, 6-up at 768, two columns with divider ≥1100 | ✅ | `sections/shorettes-category-nav.liquid` defines 3-up, 6-up, then two groups with divider from 1100px. |
| 8 | Trust bar: 1-up at 390, 2-up at 768, 4-up ≥1100 | ✅ | `sections/shorettes-trust-bar.liquid` defines 1, 2 and 4 columns at the requested breakpoints. |
| 9 | Long labels ("Terminal tackle", "Real customer support") wrap without clipping | ☐ | Requires live/manual verification; not established by current source and automated evidence. |
| 10 | Footer columns stack cleanly on mobile; accordions open and close | ☐ | Requires live/manual verification; not established by current source and automated evidence. |

## Desktop (≥1100px)

| # | Check | ✓ | Vire's Notes |
|---|---|---|---|
| 11 | Announcement bar shows all three messages side by side with dot separators | ✅ | Three announcement blocks render side-by-side in live preview with dot separators. |
| 12 | Announcement contact text appears right-aligned once set | ✅ | Contact markup follows the announcements and desktop row CSS uses `justify-content: space-between`; field is currently blank. |
| 13 | Header top row is bone `#F4F1E8`; navigation row is navy `#0B171D` | ❌ | FAIL: checklist expects `#F4F1E8` / `#0B171D`; committed settings are `#f8f3ed` / `#17191a`. |
| 14 | Logo renders at 88px tall and is not stretched | ❌ | FAIL: global logo height is configured as 72px, not 88px (`config/settings_data.json`). |
| 15 | Search field is centred, spans the free space, capped at 40rem | ✅ | Search occupies the center free space and is capped at 40rem in `assets/shorettes-brand.css`. |
| 16 | Cart badge is orange with white text **[R]** | ✅ | Configured cart badge colors are `#d21404` with `#ffffff` text. |
| 17 | Cart icon **and** the "Cart" label both show | ✅ | Live desktop preview shows both cart glyph and “Cart” label. |
| 18 | Sticky header hides on scroll down and returns on scroll up **[R]** | ☐ | Scroll-up sticky mode is configured, but hide/return behavior still needs a real scroll test. |
| 19 | Hero headline uses the condensed display face, uppercase | ✅ | Enabled custom hero renders an uppercase condensed display heading. |
| 20 | Orange primary CTA, outlined secondary CTA; both hover correctly | ✅ | Primary and outlined CTA classes and hover styles are present in `shorettes-hero.liquid` / brand CSS. |

## Tablet (768–1024px)

| # | Check | ✓ | Vire's Notes |
|---|---|---|---|
| 21 | Search is reachable: either the inline field or the drawer icon, never neither | ✅ | Inline search is rendered at tablet widths and the drawer supplies search where inline search hides. |
| 22 | On a touch tablet the drawer opens and its search icon works **[R]** | ☐ | Requires live/manual verification; not established by current source and automated evidence. |
| 23 | Species and category groups stack with clear separation | ✅ | Requires live/manual verification; not established by current source and automated evidence. |
| 24 | Hero badge sits below the copy without crowding it | ☐ | Requires visual confirmation at both 768 and 1024; configuration alone cannot establish crowding. |

## Mobile (≤749px)

| # | Check | ✓ | Vire's Notes |
|---|---|---|---|
| 25 | Hamburger opens the drawer; nested menus expand as accordions **[R]** | ☐ | Drawer accordion configuration exists, but opening and nested expansion still require a touch/mobile interaction pass. |
| 26 | Drawer closes on Escape and on backdrop tap **[R]** | ☐ | Escape/backdrop handlers exist, but both close paths still require live mobile interaction. |
| 27 | Search icon opens the predictive-search modal **[R]** | ☐ | Search-modal implementation exists; mobile icon-to-modal behavior still requires live mobile interaction. |
| 28 | Cart icon and badge visible and tappable **[R]** | ☐ | Requires live/manual verification; not established by current source and automated evidence. |
| 29 | Announcement bar shows the first two messages, no overflow | ✅ | Mobile row CSS hides announcement blocks from the third onward; live 390px screenshot shows the first two. |
| 30 | Hero uses the mobile image when one is set; headline stays readable | ☐ | FAIL condition avoided only because no custom mobile or desktop hero image is configured; must retest after adding imagery. |
| 31 | Every tap target is at least 44×44px | ☐ | Requires rendered measurement of every interactive target; a global 44px token does not prove every app/custom control complies. |
| 32 | No layout shift as the hero image loads | ☐ | Requires measured CLS after a hero image is configured. |

## Home page

| # | Check | ✓ | Vire's Notes |
|---|---|---|---|
| 33 | Section order: hero → category nav → tiles → Slime Time products → existing blocks → brand strip → trust bar | ✅ | Enabled section order in `templates/index.json` matches the required sequence. |
| 34 | **Community Catches renders exactly as before** **[R]** | ☐ | Community Catches renders, but “exactly as before” requires comparison with the old theme. |
| 35 | **Instafeed loads and shows posts** **[R]** | ✅ | Live preview loaded 10 current Instafeed posts and post-dialog markup. Theme Check’s local `JSONMissingBlock` warning is an app-extension false positive for the live theme. |
| 36 | New Arrivals, Social proof, YouTube and the three blog blocks all render **[R]** | ❌ | FAIL: New Arrivals and Social proof blocks are explicitly disabled in `templates/index.json`; the combined requirement cannot pass. |
| 37 | Slime Time product list shows real products with prices **[R]** | ❌ | FAIL: the area labeled Slime Time is configured against `frontpage` and `hoodies`, not the `slime-time` collection. |
| 38 | The old hero and four empty placeholders do **not** render (disabled) | ✅ | Old hero and four placeholder `_blocks` sections are disabled in `templates/index.json`. |
| 39 | Unlinked species and Lures show but are not clickable — no dead links | ✅ | Blank species/Lures destinations render as `<span>`, not dead anchors. |
| 40 | Tiles without images show solid navy with legible text, not a broken image | ✅ | Missing tile images omit `<img>` and retain navy background with legible white text. |
| 41 | Brand wordmarks render where no logo is uploaded | ✅ | Brand blocks without uploaded logos render text wordmarks. |

## Navigation

| # | Check | ✓ | Vire's Notes |
|---|---|---|---|
| 42 | Every top-level item comes from the configured header menu; nothing is hardcoded **[R]** | ✅ | Header now uses dedicated `horizon-4-main-menu`; desktop and drawer markup iterate the configured linklist, with no hardcoded menu labels. |
| 43 | Dropdowns open on hover and on keyboard focus **[R]** | ☐ | Hover/focus code exists, but the automated hover probe did not expose the submenu; requires direct keyboard/mouse confirmation. |
| 44 | Mega-menu columns align and do not overflow the viewport | ☐ | Requires a visual pass with each dropdown open. |
| 45 | Active page link shows the orange active state | ✅ | Active links receive `menu-list__link--active`, styled with the signal orange/red token. |
| 46 | Tab order runs logo → search → account → cart → nav; no focus traps | ☐ | Requires complete keyboard traversal in the rendered preview. |
| 47 | Escape closes an open dropdown and returns focus to its trigger **[R]** | ☐ | Escape/focus-return code exists but requires a live interaction test. |

## Predictive search

| # | Check | ✓ | Vire's Notes |
|---|---|---|---|
| 48 | Typing in the inline field opens the modal and carries the text across | ☐ | Modal opened during automated search, but modal input/caret handoff was not measured reliably. |
| 49 | The caret lands at the end of the modal input, not the start | ☐ | Requires explicit caret-position measurement after modal handoff. |
| 50 | Results appear and are clickable **[R]** | ✅ | Typing “Titan” opened predictive search with 46 visible product links. |
| 51 | Closing the modal does **not** immediately reopen it (focus-loop regression) | ✅ | Escape closed the modal; it remained closed after the follow-up wait. |
| 52 | Enter in the inline field with JS disabled submits to `/search?q=…` | ✅ | Inline search is a real GET form to Shopify search with query field `q`. |
| 53 | "View all results" reaches the full search page **[R]** | ☐ | Requires clicking the rendered “View all results” control. |
| 54 | The search page's own input still works **[R]** | ☐ | Requires a direct `/search` interaction test. |
| 55 | View source: exactly **one** `id="predictive-search-results"` in the DOM | ✅ | Rendered DOM contained exactly one `#predictive-search-results` at every tested width and on product/collection pages. |
| 56 | Console is clean — no duplicate custom-element registration errors | ❌ | FAIL: no duplicate custom-element registration appeared, but the console was not clean: CSP framing, 403 resource and Monorail network errors were recorded. |

## Product pages

| # | Check | ✓ | Vire's Notes |
|---|---|---|---|
| 57 | Gallery, zoom and thumbnails work **[R]** | ✅ | Live BigMakk page rendered seven media controls; clicking “Zoom media 1” opened one dialog. |
| 58 | Variant picker switches variants; price and image update **[R]** | ❌ | FAIL: selecting available “Grape Ape” did not change the checked variant in either browser test path. |
| 59 | Add to cart works and the drawer opens **[R]** | ❌ | FAIL: Add to Cart added the item, but the configured cart drawer did not open. |
| 60 | Sale badge is orange with white text and readable | ✅ | Sale badge is configured `#d21404` with white text. |
| 61 | **Sold-out badge text is visible** (was invisible before this work) | ✅ | Sold-out badge has explicit dark background and white text. |
| 62 | Compare-at price shows struck through **[R]** | ✅ | Compare-at price uses `<s>` with line-through styling. |
| 63 | Inventory messaging and accelerated checkout render **[R]** | ❌ | FAIL: accelerated checkout renders, but the active product block order contains no inventory-message block. |
| 64 | Product JSON-LD still present in view-source **[R]** | ✅ | Live BigMakk page contained two JSON-LD scripts, including product structured data. |

## Collection pages

| # | Check | ✓ | Vire's Notes |
|---|---|---|---|
| 65 | Product grid, cards, prices and badges render **[R]** | ✅ | Live Slime Time collection rendered product cards, prices and sold-out badges with no broken images. |
| 66 | Filters and sorting work **[R]** | ☐ | Filter and sort controls render, but changing them still needs an interaction test. |
| 67 | Pagination or infinite scroll works **[R]** | ☐ | No pagination control rendered on the tested collection; infinite-scroll behavior was not exercised. |
| 68 | Quick add works on desktop and mobile **[R]** | ☐ | 21 quick-add controls rendered, but desktop/mobile activation was not exercised. |
| 69 | Collection banner and description render **[R]** | ✅ | Live collection rendered its H1, description metadata and product grid. |
| 70 | `/collections/all?sort_by=created-descending` and `…best-selling` both resolve (hero and tile CTAs) | ✅ | Both required sorted collection URLs returned HTTP 200. |
| 71 | `/collections/vendors?q=Berkley` resolves (brand strip links) | ✅ | `/collections/vendors?q=Berkley` returned HTTP 200. |

## Cart

| # | Check | ✓ | Vire's Notes |
|---|---|---|---|
| 72 | Cart drawer opens from the header **[R]** | ✅ | Header Cart trigger opened the cart drawer (`aria-expanded=true`) in live preview. |
| 73 | Quantity changes update totals **[R]** | ✅ | Quantity changed from 1 to 2 and total changed from $32.99 to $65.98. |
| 74 | Remove works **[R]** | ✅ | Remove emptied the isolated QA cart. |
| 75 | Discount code field works **[R]** | ☐ | Discount input renders, but applying a code still requires a visible disclosure/manual test. |
| 76 | Checkout button reaches Shopify checkout **[R]** | ☐ | Checkout control renders; checkout navigation was intentionally not completed. |
| 77 | Cart page (`/cart`) renders correctly **[R]** | ✅ | Live cart page rendered item, quantity, total, discount and checkout controls. |
| 78 | Badge count updates after add and after remove **[R]** | ❌ | FAIL: cart badge remained 0 after a successful add; it was also 0 after removal. |

## Customer account

| # | Check | ✓ | Vire's Notes |
|---|---|---|---|
| 79 | Account link in the header reaches login **[R]** | ☐ | Account control renders; destination/login redirect still needs direct verification. |
| 80 | Login, register, and password reset all work **[R]** | ☐ | Requires unauthenticated login/register/reset flow testing. |
| 81 | Order history and profile render **[R]** | ☐ | Requires a real customer test account. |
| 82 | Account text and icon are legible on the bone header | ✅ | Live header shows legible account icon/text; configured foreground/background contrast passes AA. |

## Footer

| # | Check | ✓ | Vire's Notes |
|---|---|---|---|
| 83 | Inverse logo renders legibly on navy | ☐ | Inverse logo is configured and rendered; final legibility remains a human visual judgment. |
| 84 | Tagline "BUILT FOR THE WATER WE FISH." shows in the display face | ✅ | Exact tagline is configured uppercase in the display font. |
| 85 | Shop and Customer service menus populate from their linklists **[R]** | ✅ | Live preview shows populated Shop and Customer service linklists. |
| 86 | Newsletter form submits and confirms **[R]** | ☐ | Newsletter form renders; submission would create customer/contact data and was not performed. |
| 87 | Social icons link out correctly (replace the placeholder URLs first) | ☐ | Instagram link renders; destination and any desired additional networks require manual review. |
| 88 | Policy links resolve to the real Shopify policy pages **[R]** | ☐ | Policy disclosure renders; each live policy destination still needs clicking. |
| 89 | Payment icons render | ✅ | Live preview rendered American Express, Apple Pay, Bancontact, Diners Club, Discover, Google Pay, Mastercard, PayPal, Shop Pay and Visa icons. |
| 90 | Copyright and "Powered by Shopify" show **[R]** | ✅ | Live footer shows copyright and Powered by Shopify. |
| 91 | All footer text meets contrast on navy | ☐ | Core palette passes AA, but complete footer/app-injected text still needs a visual contrast pass. |

## Accessibility

| # | Check | ✓ | Vire's Notes |
|---|---|---|---|
| 92 | Exactly **one** `<h1>` on the home page (Horizon's visually-hidden shop name; the hero is an `<h2>`) | ✅ | Rendered home DOM contained exactly one H1 at all five tested widths. |
| 93 | Heading order descends without skipping | ✅ | Source and rendered accessibility tree follow H1 → H2 → H3 without a detected skip. |
| 94 | Every interactive element has a visible focus ring | ❌ | FAIL: enabled Community Catches inputs set `outline: none` and only change border color, so not every interactive element has a visible focus ring. |
| 95 | Whole page is keyboard-navigable; drawer and modal trap focus correctly **[R]** | ☐ | Focus-trap implementation exists, but whole-page keyboard traversal still requires manual testing. |
| 96 | Skip-to-content link works **[R]** | ☐ | Skip link targets the existing `#MainContent` element. |
| 97 | Announcement row: no visible message is `aria-hidden="true"` | ✅ | Row-mode announcements explicitly render `aria-hidden="false"`. |
| 98 | Tile overlay links are `aria-hidden` with `tabindex="-1"`; the visible CTA is what screen readers announce | ✅ | Tile overlays use `aria-hidden="true"` and `tabindex="-1"`; visible CTAs remain normal anchors. |
| 99 | Decorative SVG icons are `aria-hidden="true"`; labels carry the meaning | ❌ | FAIL: enabled blog block contains decorative calendar, author and arrow SVGs without `aria-hidden="true"`. |
| 100 | Uploaded images have meaningful alt text | ✅ | Live audit found meaningful alt text on content/product images. Empty alt attributes belonged only to decorative Instafeed icons. |
| 101 | Contrast ≥4.5:1 for body text — check orange on white, bone on navy, slate on white | ✅ | Measured ratios: orange/white 5.466:1, bone/navy 16+:1, slate/white 4.829:1. |
| 102 | `prefers-reduced-motion` suppresses the tile hover zoom | ✅ | Tile zoom is gated by `prefers-reduced-motion: no-preference`; reduced mode removes image transitions. |
| 103 | Screen-reader pass over the header, nav and home page | ☐ | Requires a real screen-reader pass. |

## SEO

| # | Check | ✓ | Vire's Notes |
|---|---|---|---|
| 104 | Title and meta description render on home, product, collection **[R]** | ✅ | Live home, BigMakk product and Slime Time collection all rendered non-empty title, meta description and canonical URL. |
| 105 | Canonical URLs correct **[R]** | ✅ | Canonical markup uses Shopify `canonical_url`; live URLs matched home/product/collection routes. |
| 106 | Organization JSON-LD in the header **[R]** | ✅ | Header emits Organization JSON-LD. |
| 107 | Product and collection structured data intact **[R]** | ☐ | Product structured data is live; collection structured-data semantics still need rendered JSON-LD inspection. |
| 108 | **Tapita SEO** and **Webrex SEO** app embeds still active **[R]** | ✅ | Tapita and Webrex embeds are configured and enabled. Theme Check reports only inherited/app integration warnings. |
| 109 | Nav links are real crawlable `<a href>` elements, not JS handlers | ✅ | Rendered navigation uses real crawlable anchors; live DOM exposed the expected hrefs. |
| 110 | No new 404s from this redesign — click every home page link | ❌ | FAIL: crawl checked 47 unique homepage links; Rapala vendor link returned HTTP 404. All other checked links resolved. |
| 111 | `/sitemap.xml` and `/robots.txt` unchanged **[R]** | ☐ | `/sitemap.xml` and `/robots.txt` both return HTTP 200, but “unchanged” requires an old-theme baseline. |

## Performance

| # | Check | ✓ | Vire's Notes |
|---|---|---|---|
| 112 | Lighthouse mobile ≥ the pre-redesign baseline — measure the old theme first | ☐ | Requires Lighthouse runs against both old-theme baseline and horizon-4. |
| 113 | Hero image is `loading="eager"` `fetchpriority="high"`; everything below the fold is lazy | ❌ | FAIL: active custom hero has no image configured, so no eager/high-priority hero image renders. Below-fold laziness is therefore not sufficient to pass this combined check. |
| 114 | Hero serves an appropriately sized `srcset` candidate, not the 3000px source, on mobile | ❌ | FAIL: no active hero image is configured, so no mobile hero srcset candidate is actually emitted. |
| 115 | CLS < 0.1 — watch the header height settle and the hero image load | ☐ | Requires a measured Lighthouse/browser CLS value. |
| 116 | Only two font families load (Oswald + Catamaran); no unused weights | ✅ | Current settings load only Catamaran regular and Oswald bold. |
| 117 | `shorettes-brand.css` and `shorettes-header-search.js` each load once | ✅ | Live DOM loaded `shorettes-brand.css` once and `shorettes-header-search.js` once at every tested width/page. |
| 118 | `announcement-bar.js` does **not** load in row layout | ✅ | Live DOM loaded `announcement-bar.js` zero times in row layout. |
| 119 | No console errors or failed network requests on any template | ❌ | FAIL: console/network was not clean; CSP framing, 403 resources and a Monorail network error occurred in preview testing. |
| 120 | Shopify Inbox chat widget still loads **[R]** | ✅ | Shopify Inbox chat rendered on home, product and collection pages. |

---

## Sign-off

| Area | Tester | Date | Result |
|---|---|---|---|
| Breakpoints | | | |
| Home page | | | |
| Navigation & search | | | |
| Product, collection, cart | | | |
| Customer account | | | |
| Accessibility | | | |
| SEO & performance | | | |

**Do not publish** until every **[R]** regression item passes. Those cover functionality
that existed before this redesign; a failure there is a regression, not a missing feature.

---

## Audit Summary (2026-09-03)

- **Passed:** 62 / 120
- **Failed:** 15 / 120
- **Manual or not yet verified:** 43 / 120
- **Regression failures [R]:** #36, #37, #56, #58, #59, #63, #78, #94, #99, #110, #119
- **Do not publish yet.** Resolve every failed `[R]` item, then finish the remaining regression checks.

## Evidence Artifacts

- `qa-artifacts/live-smoke.json` — five viewport DOM measurements plus product, collection, SEO and endpoint checks
- `qa-artifacts/product-cart-interactions.json` — product zoom, variant and initial cart test
- `qa-artifacts/cart-detail.json` — quantity, total, remove and badge-state test
- `qa-artifacts/home-link-crawl.json` — 47-link homepage crawl
- `qa-artifacts/home-1440.png`, `home-1280.png`, `home-1024.png`, `home-768.png`, `home-390.png` — rendered preview screenshots

## Confirmed Failures

1. Header colors differ from the checklist specification (#13).
2. Logo is configured at 72px rather than 88px (#14).
3. New Arrivals and Social proof blocks are disabled (#36).
4. The section labeled Slime Time points to `frontpage`/`hoodies`, not `slime-time` (#37).
5. Console is not clean (#56/#119).
6. Available product variant did not switch (#58).
7. Add to Cart does not open the configured drawer (#59).
8. Product template has no inventory-message block (#63).
9. Cart badge remains 0 after a successful add (#78).
10. Community Catches suppresses a true focus ring (#94).
11. Enabled blog block has decorative SVGs missing `aria-hidden` (#99).
12. Rapala brand-strip destination returns 404 (#110).
13. Active custom hero has no image, so eager hero loading/mobile srcset cannot pass (#113/#114).

## Theme Check

`npx @shopify/cli theme check --path .` inspected 379 files and reported 1 error plus 24 warnings. The single `JSONMissingBlock` error references Instafeed's remote app-extension block. **Instafeed itself passes live:** the unpublished preview rendered 10 current posts and their dialogs. The remaining warnings are primarily inherited Tapita schema naming/deprecation warnings.
