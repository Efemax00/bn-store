import { useState } from "react";
import { useStoreProducts } from "../context/StoreProductsContext";
import ProductCard from "./ProductCard.jsx";
import ProductModal from "./ProductModal.jsx";

export default function ProductGrid() {
  const { products, loading } = useStoreProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);

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

          <p style={{ textAlign: "center", padding: "60px 0" }}>
            Loading fragrances...
          </p>
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
            {products.length !== 1 ? "s" : ""} available. Click{" "}
            <strong>View More</strong> for full details or{" "}
            <strong>Order Now</strong> to chat on WhatsApp.
          </p>
        </div>

        {products.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 20px",
            }}
          >
            <h3>No perfumes available yet.</h3>
            <p>Check back soon for our latest collection.</p>
          </div>
        ) : (
          <div className="grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewMore={setSelectedProduct}
              />
            ))}
          </div>
        )}
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}