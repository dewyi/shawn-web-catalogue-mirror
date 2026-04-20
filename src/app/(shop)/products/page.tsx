import { ProductFilters } from "@/modules/products/components/product-filters";
import { ProductGrid } from "@/modules/products/components/product-grid";
import { getProducts } from "@/modules/products/lib/product-service";
import type { ProductFilter } from "@/modules/products/types/product.types";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const page = searchParams.page ? Number.parseInt(searchParams.page as string, 10) : 1;
  const filter: ProductFilter = {
    page,
    category: searchParams.category as string | undefined,
    search: searchParams.search as string | undefined,
    sortBy: searchParams.sortBy as ProductFilter["sortBy"],
    minPrice: searchParams.minPrice
      ? Number.parseFloat(searchParams.minPrice as string)
      : undefined,
    maxPrice: searchParams.maxPrice
      ? Number.parseFloat(searchParams.maxPrice as string)
      : undefined,
  };

  const { products, meta } = await getProducts(filter);

  const baseUrl = `/products?page=${page}`;

  return (
    <div className="flex gap-6">
      <aside className="hidden w-64 shrink-0 md:block">
        <ProductFilters />
      </aside>
      <div className="flex-1">
        <h1 className="mb-6 text-3xl font-bold">All Products</h1>
        <ProductGrid
          products={products.map((p) => ({
            id: p.id,
            name: p.name,
            slug: p.slug,
            price: p.price,
            compareAtPrice: p.compareAtPrice,
            images: p.images,
          }))}
          currentPage={meta.currentPage}
          totalPages={meta.totalPages}
          baseUrl={baseUrl}
        />
      </div>
    </div>
  );
}
