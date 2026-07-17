import { useProducts } from "../context/ProductsContext.jsx";
import ProductCard from "./ProductCard.jsx";

export default function ProductGrid() {
  const { products, loading } = useProducts();

  if (loading) {
    return (
      <section className="collection light">
        <div className="inner">
          <div className="section-head">
            <div>
              <span className="eyebrow">The collection</span>
              <h2>Available now</h2>
            </div>
          </div>

          <p>Loading fragrances...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="collection light">
      <div className="inner">
        <div className="section-head">
          <div>
            <span className="eyebrow">The collection</span>
            <h2>Available now</h2>
          </div>

          <p>
            {products.length} fragrance
            {products.length !== 1 ? "s" : ""} currently available. Tap any
            fragrance to enquire or order on WhatsApp.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="empty-state">
            <p>No fragrances available at the moment.</p>
          </div>
        ) : (
          <div className="grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
