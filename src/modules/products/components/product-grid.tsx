import { Pagination } from "@/shared/components/pagination";
import { ProductCard, type ProductCardProps } from "./product-card";

export interface ProductGridProps {
  products: ProductCardProps[];
  currentPage?: number;
  totalPages?: number;
  baseUrl?: string;
}

export function ProductGrid({ products, currentPage, totalPages, baseUrl }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">No products found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
      {totalPages !== undefined && totalPages > 1 && baseUrl && (
        <div className="mt-8">
          <Pagination currentPage={currentPage || 1} totalPages={totalPages} baseUrl={baseUrl} />
        </div>
      )}
    </div>
  );
}
