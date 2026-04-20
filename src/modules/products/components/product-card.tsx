import { Skeleton } from "@/shared/components/skeleton";
import { formatCurrency } from "@/shared/lib/pricing";
import Link from "next/link";

export interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  price: string;
  compareAtPrice: string | null;
  images: string[];
}

export function ProductCard({ name, slug, price, compareAtPrice, images }: ProductCardProps) {
  const hasDiscount =
    compareAtPrice && Number.parseFloat(compareAtPrice) > Number.parseFloat(price);

  return (
    <Link href={`/products/${slug}`} className="group">
      <div className="overflow-hidden rounded-lg border bg-white">
        <div className="aspect-square w-full bg-gray-100">
          {images.length > 0 ? (
            <img
              src={images[0]}
              alt={name}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">No image</div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{name}</h3>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-sm font-bold text-blue-600">{formatCurrency(price)}</span>
            {hasDiscount && (
              <span className="text-xs text-gray-400 line-through">
                {formatCurrency(compareAtPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

ProductCard.Skeleton = function ProductCardSkeleton() {
  return <Skeleton className="h-64 w-full" />;
};
