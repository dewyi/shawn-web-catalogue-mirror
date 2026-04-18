# Corporate Co. Product Catalogue

A static product showcase website for Corporate Co. — customers browse furniture and home accessories online, then visit the physical store to purchase. No payment processing.

**Live site:** https://dewyi.github.io/shawn-web-catalogue-mirror/

## Architecture

- **Single-file app** — `index.html` contains all HTML, CSS, and JavaScript. No build step, no framework.
- **Product data** — hardcoded as a JS array in `index.html`. The `data/products.json` template exists but is unused.
- **Product visuals** — SVGs generated programmatically via `getProductSVG()` in the JS. No image assets required.
- **Deployed to** GitHub Pages.

## Branches

- **`dev`** — working branch. Start here.
- **`main`** — contains the original vibe-coded version (single HTML file with 12 sample products). Useful as a reference for UI patterns and product data structure.

## Product data structure

Each product in the JS array has: `id`, `name`, `type`, `category`, `price`, `oldPrice`, `badge` (new/sale/popular), `rating`, `reviews`, `description`, `colors[]`, `sizes[]`, `dimensions`, `visualType`, `visualColor`.

Categories: `seating`, `tables`, `storage`, `bedroom`, `lighting`, `decor`, `outdoor`.
