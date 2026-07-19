import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useStoreProducts } from "../context/StoreProductsContext";
import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";
import { BottleIcon, WhatsAppIcon } from "../components/icons.jsx";

const WHATSAPP_NUMBER = "2349064428036";

function formatPrice(price, currency = "NGN") {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(price || 0));
}

function getDiscount(product) {
  const compareAt = Number(product.compareAtPrice || 0);
  const price = Number(product.price || 0);
  if (compareAt > price) {
    return {
      has: true,
      compareAt,
      pct: Math.round(((compareAt - price) / compareAt) * 100),
    };
  }
  return { has: false };
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const { products, loading } = useStoreProducts();
  const [copied, setCopied] = useState(false);

  const product = products.find((p) => String(p.id) === String(id));

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  if (loading) {
    return (
      <>
        <Nav />
        <section className="collection light">
          <p style={{ textAlign: "center", padding: "80px 0" }}>Loading…</p>
        </section>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Nav />
        <section className="collection light">
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <h3>We couldn't find that fragrance.</h3>
            <p style={{ marginTop: 10 }}>
              <Link to="/collection" style={{ color: "var(--gold)" }}>
                Browse the full collection
              </Link>
            </p>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  const message = encodeURIComponent(
    `Hi! I'm interested in ${product.name} (${product.size}) - is it still available?`,
  );
  const d = getDiscount(product);

  return (
    <>
      <Nav />
      <section className="collection light">
        <div className="inner detail-wrap">
          <Link
            to="/collection"
            className="admin-btn-ghost"
            style={{ display: "inline-block", marginBottom: 24 }}
          >
            ← Back to collection
          </Link>

          <div className="modal-card detail-card">
            <div className="modal-image">
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} />
              ) : (
                <div className="bottle-wrap">
                  <BottleIcon />
                </div>
              )}
            </div>

            <div className="modal-body">
              <span className="scent-no">
                {product.manufacturer} · {product.size}
              </span>

              <h2>{product.name}</h2>
              <div className="type">{product.type || "Luxury Perfume"}</div>

              <div className="notes">
                {(product.notes || []).map((note) => (
                  <span key={note} className="note-pill">
                    {note}
                  </span>
                ))}
              </div>

              {product.description && (
                <p className="description">{product.description}</p>
              )}

              <div className="modal-foot">
                <div>
                  <div className="price-block">
                    {d.has && (
                      <span className="price-was">
                        {formatPrice(d.compareAt, product.currency)}
                      </span>
                    )}
                    <span className="modal-price">
                      {formatPrice(product.price, product.currency)}
                    </span>
                    {d.has && <span className="discount-badge">-{d.pct}%</span>}
                  </div>
                  <div
                    className="modal-stock"
                    style={{
                      color: Number(product.stock) > 0 ? "#16a34a" : "#dc2626",
                    }}
                  >
                    {Number(product.stock) > 0
                      ? `${product.stock} in stock`
                      : "Sold Out"}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    type="button"
                    className="admin-btn-ghost"
                    onClick={handleCopyLink}
                  >
                    {copied ? "Copied!" : "Copy link"}
                  </button>
                  <a
                    className="wa-btn"
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <WhatsAppIcon className="icon-sm" />
                    {Number(product.stock) > 0 ? "Order Now" : "Notify Me"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
