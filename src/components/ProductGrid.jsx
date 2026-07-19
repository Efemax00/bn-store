import { useState } from "react";
import { useStoreProducts } from "../context/StoreProductsContext";
import ProductCard from "./ProductCard.jsx";
import ProductModal from "./ProductModal.jsx";
import { useSearch } from '../context/SearchContext.jsx'

export default function ProductGrid() {
  const { products, loading } = useStoreProducts();
  const { query } = useSearch();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filtered = query
    ? products.filter((p) =>
        [p.name, p.type, p.manufacturer, ...(p.notes || [])]
          .join(' ')
          .toLowerCase()
          .includes(query.toLowerCase())
      )
    : products

  if (loading) {
    return (
      <section className="collection light" id="collection">
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
            {filtered.length} fragrance
            {filtered.length !== 1 ? "s" : ""} available. Click{" "}
            <strong>View More</strong> for full details or{" "}
            <strong>Order Now</strong> to chat on WhatsApp.
          </p>
        </div>

        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 20px",
            }}
          >
            {query ? (
              <>
                <h3>No fragrances match "{query}".</h3>
                <p>Try a different name, note, or scent family.</p>
              </>
            ) : (
              <>
                <h3>No perfumes available yet.</h3>
                <p>Check back soon for our latest collection.</p>
              </>
            )}
          </div>
        ) : (
          <div className="grid">
            {filtered.map((product) => (
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