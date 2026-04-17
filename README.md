# Corporate Co. Product Catalogue

A lightweight, static product catalogue built for easy maintenance via Git. No backend required—product data, pricing, and stock levels are managed directly through the repository.

## 🌐 How It Works
- All product information lives in `data/products.json`
- The site fetches this file on load and dynamically renders a responsive grid
- Changes (price updates, stock restocks, new items) are made by editing `products.json` and committing to Git
- Zero dependencies. Pure HTML/CSS/JS.

## 📁 Project Structure
.
├── data/
│ └── products.json # Single source of truth for all products
├── assets/
│ ├── css/style.css # Clean, responsive IKEA-inspired grid layout
│ ├── js/app.js # Client-side renderer & filter/search logic
│ └── images/ # Product photos (organize by SKU/product ID)
├── index.html # Main catalogue page
└── README.md # This file
