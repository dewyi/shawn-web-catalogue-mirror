import { ProductGrid } from "@/modules/products/components/product-grid";
import { getFeaturedProducts } from "@/modules/products/lib/product-service";

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts(8);

  return (
    <div>
      <section className="mb-12 rounded-xl bg-blue-600 px-6 py-16 text-center text-white">
        <h1 className="text-3xl font-bold md:text-5xl">Welcome to ShawnShop</h1>
        <p className="mt-4 text-lg text-blue-100">Discover amazing products at great prices</p>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold">Featured Products</h2>
        <ProductGrid products={featuredProducts} />
      </section>
    </div>
  );
}
