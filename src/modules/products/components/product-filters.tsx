import { CATEGORIES } from "@/modules/products/constants/categories";
import Link from "next/link";

export function ProductFilters() {
  return (
    <div className="space-y-6 rounded-lg border p-4">
      <div>
        <h3 className="mb-3 font-semibold">Categories</h3>
        <div className="space-y-1">
          <Link
            href="/products"
            className="block rounded px-2 py-1 text-sm text-gray-600 hover:bg-gray-100"
          >
            All Products
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="block rounded px-2 py-1 text-sm text-gray-600 hover:bg-gray-100"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-semibold">Sort By</h3>
        <select
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          defaultValue=""
        >
          <option value="">Default</option>
          <option value="newest">Newest First</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="name_asc">Name: A to Z</option>
        </select>
      </div>

      <div>
        <h3 className="mb-3 font-semibold">Price Range</h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
          <input
            type="number"
            placeholder="Max"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
