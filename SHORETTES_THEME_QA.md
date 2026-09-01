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

| # | Check | ✓ |
|---|---|---|
| 1 | No horizontal scrollbar on `<body>` at any width | ☐ |
| 2 | Header does not wrap or overlap; logo, search and actions stay on one row ≥990px | ☐ |
| 3 | Navigation row is a single line ≥990px; no items clipped | ☐ |
| 4 | Hero text never overlaps the regional badge | ☐ |
| 5 | Feature tiles: 1-up at 390, 2-up at 768/1024 (last tile full width), 5-across ≥1100 | ☐ |
| 6 | Tile order left to right is Originals, Slime Time, Community, New Arrivals, Best Sellers | ☐ |
| 7 | Category nav: 3-up at 390, 6-up at 768, two columns with divider ≥1100 | ☐ |
| 8 | Trust bar: 1-up at 390, 2-up at 768, 4-up ≥1100 | ☐ |
| 9 | Long labels ("Terminal tackle", "Real customer support") wrap without clipping | ☐ |
| 10 | Footer columns stack cleanly on mobile; accordions open and close | ☐ |

## Desktop (≥1100px)

| # | Check | ✓ |
|---|---|---|
| 11 | Announcement bar shows all three messages side by side with dot separators | ☐ |
| 12 | Announcement contact text appears right-aligned once set | ☐ |
| 13 | Header top row is bone `#F4F1E8`; navigation row is navy `#0B171D` | ☐ |
| 14 | Logo renders at 88px tall and is not stretched | ☐ |
| 15 | Search field is centred, spans the free space, capped at 40rem | ☐ |
| 16 | Cart badge is orange with white text **[R]** | ☐ |
| 17 | Cart icon **and** the "Cart" label both show | ☐ |
| 18 | Sticky header hides on scroll down and returns on scroll up **[R]** | ☐ |
| 19 | Hero headline uses the condensed display face, uppercase | ☐ |
| 20 | Orange primary CTA, outlined secondary CTA; both hover correctly | ☐ |

## Tablet (768–1024px)

| # | Check | ✓ |
|---|---|---|
| 21 | Search is reachable: either the inline field or the drawer icon, never neither | ☐ |
| 22 | On a touch tablet the drawer opens and its search icon works **[R]** | ☐ |
| 23 | Species and category groups stack with clear separation | ☐ |
| 24 | Hero badge sits below the copy without crowding it | ☐ |

## Mobile (≤749px)

| # | Check | ✓ |
|---|---|---|
| 25 | Hamburger opens the drawer; nested menus expand as accordions **[R]** | ☐ |
| 26 | Drawer closes on Escape and on backdrop tap **[R]** | ☐ |
| 27 | Search icon opens the predictive-search modal **[R]** | ☐ |
| 28 | Cart icon and badge visible and tappable **[R]** | ☐ |
| 29 | Announcement bar shows the first two messages, no overflow | ☐ |
| 30 | Hero uses the mobile image when one is set; headline stays readable | ☐ |
| 31 | Every tap target is at least 44×44px | ☐ |
| 32 | No layout shift as the hero image loads | ☐ |

## Home page

| # | Check | ✓ |
|---|---|---|
| 33 | Section order: hero → category nav → tiles → Slime Time products → existing blocks → brand strip → trust bar | ☐ |
| 34 | **Community Catches renders exactly as before** **[R]** | ☐ |
| 35 | **Instafeed loads and shows posts** **[R]** | ☐ |
| 36 | New Arrivals, Social proof, YouTube and the three blog blocks all render **[R]** | ☐ |
| 37 | Slime Time product list shows real products with prices **[R]** | ☐ |
| 38 | The old hero and four empty placeholders do **not** render (disabled) | ☐ |
| 39 | Unlinked species and Lures show but are not clickable — no dead links | ☐ |
| 40 | Tiles without images show solid navy with legible text, not a broken image | ☐ |
| 41 | Brand wordmarks render where no logo is uploaded | ☐ |

## Navigation

| # | Check | ✓ |
|---|---|---|
| 42 | Every top-level item comes from `main-menu`; nothing is hardcoded **[R]** | ☐ |
| 43 | Dropdowns open on hover and on keyboard focus **[R]** | ☐ |
| 44 | Mega-menu columns align and do not overflow the viewport | ☐ |
| 45 | Active page link shows the orange active state | ☐ |
| 46 | Tab order runs logo → search → account → cart → nav; no focus traps | ☐ |
| 47 | Escape closes an open dropdown and returns focus to its trigger **[R]** | ☐ |

## Predictive search

| # | Check | ✓ |
|---|---|---|
| 48 | Typing in the inline field opens the modal and carries the text across | ☐ |
| 49 | The caret lands at the end of the modal input, not the start | ☐ |
| 50 | Results appear and are clickable **[R]** | ☐ |
| 51 | Closing the modal does **not** immediately reopen it (focus-loop regression) | ☐ |
| 52 | Enter in the inline field with JS disabled submits to `/search?q=…` | ☐ |
| 53 | "View all results" reaches the full search page **[R]** | ☐ |
| 54 | The search page's own input still works **[R]** | ☐ |
| 55 | View source: exactly **one** `id="predictive-search-results"` in the DOM | ☐ |
| 56 | Console is clean — no duplicate custom-element registration errors | ☐ |

## Product pages

| # | Check | ✓ |
|---|---|---|
| 57 | Gallery, zoom and thumbnails work **[R]** | ☐ |
| 58 | Variant picker switches variants; price and image update **[R]** | ☐ |
| 59 | Add to cart works and the drawer opens **[R]** | ☐ |
| 60 | Sale badge is orange with white text and readable | ☐ |
| 61 | **Sold-out badge text is visible** (was invisible before this work) | ☐ |
| 62 | Compare-at price shows struck through **[R]** | ☐ |
| 63 | Inventory messaging and accelerated checkout render **[R]** | ☐ |
| 64 | Product JSON-LD still present in view-source **[R]** | ☐ |

## Collection pages

| # | Check | ✓ |
|---|---|---|
| 65 | Product grid, cards, prices and badges render **[R]** | ☐ |
| 66 | Filters and sorting work **[R]** | ☐ |
| 67 | Pagination or infinite scroll works **[R]** | ☐ |
| 68 | Quick add works on desktop and mobile **[R]** | ☐ |
| 69 | Collection banner and description render **[R]** | ☐ |
| 70 | `/collections/all?sort_by=created-descending` and `…best-selling` both resolve (hero and tile CTAs) | ☐ |
| 71 | `/collections/vendors?q=Berkley` resolves (brand strip links) | ☐ |

## Cart

| # | Check | ✓ |
|---|---|---|
| 72 | Cart drawer opens from the header **[R]** | ☐ |
| 73 | Quantity changes update totals **[R]** | ☐ |
| 74 | Remove works **[R]** | ☐ |
| 75 | Discount code field works **[R]** | ☐ |
| 76 | Checkout button reaches Shopify checkout **[R]** | ☐ |
| 77 | Cart page (`/cart`) renders correctly **[R]** | ☐ |
| 78 | Badge count updates after add and after remove **[R]** | ☐ |

## Customer account

| # | Check | ✓ |
|---|---|---|
| 79 | Account link in the header reaches login **[R]** | ☐ |
| 80 | Login, register, and password reset all work **[R]** | ☐ |
| 81 | Order history and profile render **[R]** | ☐ |
| 82 | Account text and icon are legible on the bone header | ☐ |

## Footer

| # | Check | ✓ |
|---|---|---|
| 83 | Inverse logo renders legibly on navy | ☐ |
| 84 | Tagline "BUILT FOR THE WATER WE FISH." shows in the display face | ☐ |
| 85 | Shop and Customer service menus populate from their linklists **[R]** | ☐ |
| 86 | Newsletter form submits and confirms **[R]** | ☐ |
| 87 | Social icons link out correctly (replace the placeholder URLs first) | ☐ |
| 88 | Policy links resolve to the real Shopify policy pages **[R]** | ☐ |
| 89 | Payment icons render | ☐ |
| 90 | Copyright and "Powered by Shopify" show **[R]** | ☐ |
| 91 | All footer text meets contrast on navy | ☐ |

## Accessibility

| # | Check | ✓ |
|---|---|---|
| 92 | Exactly **one** `<h1>` on the home page (Horizon's visually-hidden shop name; the hero is an `<h2>`) | ☐ |
| 93 | Heading order descends without skipping | ☐ |
| 94 | Every interactive element has a visible focus ring | ☐ |
| 95 | Whole page is keyboard-navigable; drawer and modal trap focus correctly **[R]** | ☐ |
| 96 | Skip-to-content link works **[R]** | ☐ |
| 97 | Announcement row: no visible message is `aria-hidden="true"` | ☐ |
| 98 | Tile overlay links are `aria-hidden` with `tabindex="-1"`; the visible CTA is what screen readers announce | ☐ |
| 99 | Decorative SVG icons are `aria-hidden="true"`; labels carry the meaning | ☐ |
| 100 | Uploaded images have meaningful alt text | ☐ |
| 101 | Contrast ≥4.5:1 for body text — check orange on white, bone on navy, slate on white | ☐ |
| 102 | `prefers-reduced-motion` suppresses the tile hover zoom | ☐ |
| 103 | Screen-reader pass over the header, nav and home page | ☐ |

## SEO

| # | Check | ✓ |
|---|---|---|
| 104 | Title and meta description render on home, product, collection **[R]** | ☐ |
| 105 | Canonical URLs correct **[R]** | ☐ |
| 106 | Organization JSON-LD in the header **[R]** | ☐ |
| 107 | Product and collection structured data intact **[R]** | ☐ |
| 108 | **Tapita SEO** and **Webrex SEO** app embeds still active **[R]** | ☐ |
| 109 | Nav links are real crawlable `<a href>` elements, not JS handlers | ☐ |
| 110 | No new 404s from this redesign — click every home page link | ☐ |
| 111 | `/sitemap.xml` and `/robots.txt` unchanged **[R]** | ☐ |

## Performance

| # | Check | ✓ |
|---|---|---|
| 112 | Lighthouse mobile ≥ the pre-redesign baseline — measure the old theme first | ☐ |
| 113 | Hero image is `loading="eager"` `fetchpriority="high"`; everything below the fold is lazy | ☐ |
| 114 | Hero serves an appropriately sized `srcset` candidate, not the 3000px source, on mobile | ☐ |
| 115 | CLS < 0.1 — watch the header height settle and the hero image load | ☐ |
| 116 | Only two font families load (Oswald + Catamaran); no unused weights | ☐ |
| 117 | `shorettes-brand.css` and `shorettes-header-search.js` each load once | ☐ |
| 118 | `announcement-bar.js` does **not** load in row layout | ☐ |
| 119 | No console errors or failed network requests on any template | ☐ |
| 120 | Shopify Inbox chat widget still loads **[R]** | ☐ |

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
