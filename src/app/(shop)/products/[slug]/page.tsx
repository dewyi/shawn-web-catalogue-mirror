import { getProductBySlug } from "@/modules/products/lib/product-service";
import { Button } from "@/shared/components/button";
import { formatCurrency } from "@/shared/lib/pricing";
import { ShoppingCart } from "lucide-react";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const hasDiscount =
    product.compareAtPrice &&
    Number.parseFloat(product.compareAtPrice) > Number.parseFloat(product.price);

  return (
    <div className="max-w-4xl">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="aspect-square w-full rounded-lg bg-gray-100">
          {product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover rounded-lg"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400 rounded-lg">
              No image
            </div>
          )}
        </div>

        <div className="space-y-4">
          {product.category && (
            <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
              {product.category.name}
            </span>
          )}
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>

          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-blue-600">
              {formatCurrency(product.price)}
            </span>
            {hasDiscount && product.compareAtPrice && (
              <span className="text-lg text-gray-400 line-through">
                {formatCurrency(product.compareAtPrice)}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-sm">
              {product.stock > 0 ? `In stock (${product.stock} available)` : "Out of stock"}
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button size="lg" disabled={product.stock === 0} className="flex-1">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
