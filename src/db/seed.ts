import { hash } from "bcrypt-ts";
import { categories, products, users } from "../src/db/schema";
import { db } from "../src/shared/lib/db";

const categoryData = [
  { name: "Electronics", slug: "electronics", description: "Gadgets and tech" },
  { name: "Clothing", slug: "clothing", description: "Fashion and apparel" },
  { name: "Home & Garden", slug: "home-garden", description: "Home improvement" },
  { name: "Sports", slug: "sports", description: "Sporting goods" },
  { name: "Books", slug: "books", description: "Books and literature" },
  { name: "Toys", slug: "toys", description: "Toys and games" },
];

const productData = [
  {
    name: "Wireless Headphones",
    slug: "wireless-headphones",
    description: "Premium noise-cancelling wireless headphones with 30-hour battery life.",
    price: "79.99",
    stock: 50,
    categorySlug: "electronics",
  },
  {
    name: "Smart Watch",
    slug: "smart-watch",
    description: "Feature-rich smartwatch with health tracking and notifications.",
    price: "199.99",
    compareAtPrice: "249.99",
    stock: 30,
    categorySlug: "electronics",
  },
  {
    name: "Bluetooth Speaker",
    slug: "bluetooth-speaker",
    description: "Portable waterproof Bluetooth speaker with deep bass.",
    price: "49.99",
    stock: 100,
    categorySlug: "electronics",
  },
  {
    name: "Cotton T-Shirt",
    slug: "cotton-t-shirt",
    description: "Comfortable 100% cotton t-shirt available in multiple colors.",
    price: "19.99",
    stock: 200,
    categorySlug: "clothing",
  },
  {
    name: "Denim Jacket",
    slug: "denim-jacket",
    description: "Classic denim jacket with a modern fit.",
    price: "59.99",
    compareAtPrice: "79.99",
    stock: 40,
    categorySlug: "clothing",
  },
  {
    name: "Running Shoes",
    slug: "running-shoes",
    description: "Lightweight running shoes with responsive cushioning.",
    price: "89.99",
    stock: 60,
    categorySlug: "sports",
  },
  {
    name: "Yoga Mat",
    slug: "yoga-mat",
    description: "Non-slip yoga mat with extra cushioning.",
    price: "29.99",
    stock: 150,
    categorySlug: "sports",
  },
  {
    name: "Table Lamp",
    slug: "table-lamp",
    description: "Modern LED table lamp with adjustable brightness.",
    price: "34.99",
    stock: 80,
    categorySlug: "home-garden",
  },
  {
    name: "Bestseller Novel",
    slug: "bestseller-novel",
    description: "The latest bestselling fiction novel.",
    price: "14.99",
    stock: 300,
    categorySlug: "books",
  },
  {
    name: "Building Blocks Set",
    slug: "building-blocks-set",
    description: "Creative building blocks set with 500 pieces.",
    price: "39.99",
    stock: 75,
    categorySlug: "toys",
  },
];

async function seed() {
  console.log("Seeding database...");

  await db.delete(products);
  await db.delete(categories);
  await db.delete(users);

  const insertedCategories = await db
    .insert(categories)
    .values(categoryData)
    .returning({ id: categories.id, slug: categories.slug });

  const categoryMap = new Map(insertedCategories.map((c) => [c.slug, c.id]));

  const productsToInsert = productData.map((p) => ({
    name: p.name,
    slug: p.slug,
    description: p.description,
    price: p.price,
    compareAtPrice: p.compareAtPrice || null,
    stock: p.stock,
    categoryId: categoryMap.get(p.categorySlug)!,
  }));

  await db.insert(products).values(productsToInsert);

  const passwordHash = await hash("admin123", 12);
  await db.insert(users).values({
    email: "admin@shawnshop.com",
    passwordHash,
    name: "Admin User",
    role: "ADMIN",
  });

  await db.insert(users).values({
    email: "user@shawnshop.com",
    passwordHash,
    name: "Regular User",
    role: "USER",
  });

  console.log("Seed complete!");
  console.log(`- ${categoryData.length} categories`);
  console.log(`- ${productData.length} products`);
  console.log("- 2 users (1 admin, 1 user)");
  console.log("\nAdmin login: admin@shawnshop.com / admin123");
  console.log("User login: user@shawnshop.com / admin123");
}

seed().catch(console.error);
