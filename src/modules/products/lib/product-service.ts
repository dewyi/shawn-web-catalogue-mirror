import "server-only";
import { categories, products } from "@/db/schema";
import { PAGE_SIZE } from "@/modules/products/constants/categories";
import type {
  Product,
  ProductFilter,
  ProductWithCategory,
} from "@/modules/products/types/product.types";
import { db } from "@/shared/lib/db";
import { getOffset, getPaginationMeta } from "@/shared/lib/pagination";
import { asc, desc, eq, gte, ilike, lte } from "drizzle-orm";

export async function getProducts(filter: ProductFilter = {}): Promise<{
  products: ProductWithCategory[];
  total: number;
  meta: ReturnType<typeof getPaginationMeta>;
}> {
  const page = filter.page || 1;
  const pageSize = filter.pageSize || PAGE_SIZE;
  const offset = getOffset(page, pageSize);

  let query = db
    .select({
      id: products.id,
      name: products.name,
      slug: products.slug,
      description: products.description,
      price: products.price,
      compareAtPrice: products.compareAtPrice,
      images: products.images,
      categoryId: products.categoryId,
      stock: products.stock,
      isActive: products.isActive,
      createdAt: products.createdAt,
      updatedAt: products.updatedAt,
      category: {
        name: categories.name,
        slug: categories.slug,
      },
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(eq(products.isActive, true));

  if (filter.category) {
    query = query.where(eq(categories.slug, filter.category));
  }

  if (filter.search) {
    query = query.where(ilike(products.name, `%${filter.search}%`));
  }

  if (filter.minPrice !== undefined) {
    query = query.where(gte(products.price, filter.minPrice.toString()));
  }

  if (filter.maxPrice !== undefined) {
    query = query.where(lte(products.price, filter.maxPrice.toString()));
  }

  if (filter.sortBy === "price_asc") {
    query = query.orderBy(asc(products.price));
  } else if (filter.sortBy === "price_desc") {
    query = query.orderBy(desc(products.price));
  } else if (filter.sortBy === "name_asc") {
    query = query.orderBy(asc(products.name));
  } else {
    query = query.orderBy(desc(products.createdAt));
  }

  const result = await query.limit(pageSize).offset(offset);

  const countResult = await db
    .select({ count: products.id })
    .from(products)
    .where(eq(products.isActive, true));

  const total = countResult.length;

  return {
    products: result as unknown as ProductWithCategory[],
    total,
    meta: getPaginationMeta(page, pageSize, total),
  };
}

export async function getProductBySlug(slug: string): Promise<ProductWithCategory | null> {
  const result = await db
    .select({
      id: products.id,
      name: products.name,
      slug: products.slug,
      description: products.description,
      price: products.price,
      compareAtPrice: products.compareAtPrice,
      images: products.images,
      categoryId: products.categoryId,
      stock: products.stock,
      isActive: products.isActive,
      createdAt: products.createdAt,
      updatedAt: products.updatedAt,
      category: {
        name: categories.name,
        slug: categories.slug,
      },
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(eq(products.slug, slug))
    .limit(1);

  return (result[0] || null) as unknown as ProductWithCategory | null;
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  const result = await db
    .select()
    .from(products)
    .where(eq(products.isActive, true))
    .orderBy(desc(products.createdAt))
    .limit(limit);

  return result as Product[];
}
