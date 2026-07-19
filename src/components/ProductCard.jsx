import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BottleIcon, WhatsAppIcon } from "./icons.jsx";

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

export default function ProductCard({ product }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const message = encodeURIComponent(
    `Hi! I'm interested in ${product.name} (${product.size}) - is it still available?`,
  );
  const d = getDiscount(product);

  return (
    <div ref={cardRef} className={`card${visible ? " in" : ""}`}>
      <Link to={`/product/${product.id}`} className="card-clickable">
        <div className="card-image-wrap">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} loading="lazy" />
          ) : (
            <div className="bottle-wrap">
              <BottleIcon />
            </div>
          )}

          <div className="card-top-tags">
            <span className="scent-no-tag">{product.manufacturer}</span>
            <span
              className="scent-no-tag"
              style={{ color: product.stock > 0 ? "#16a34a" : "#dc2626" }}
            >
              {product.stock > 0 ? `${product.stock} left` : "Sold Out"}
            </span>
          </div>
        </div>

        <div className="card-body">
          <h3>{product.name}</h3>
          <div className="type">{product.type || "Luxury Perfume"}</div>
          <div className="notes">
            {(product.notes || []).slice(0, 3).map((note) => (
              <span key={note} className="note-pill">
                {note}
              </span>
            ))}
          </div>
        </div>
      </Link>

      <div className="card-foot">
        <div className="price-block">
          {d.has && (
            <span className="price-was">
              {formatPrice(d.compareAt, product.currency)}
            </span>
          )}
          <span className="price">
            {formatPrice(product.price, product.currency)}
          </span>
          {d.has && <span className="discount-badge">-{d.pct}%</span>}
        </div>
        <a
          className="wa-btn"
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`}
          target="_blank"
          rel="noreferrer"
        >
          <WhatsAppIcon className="icon-sm" />
          {product.stock > 0 ? "Order Now" : "Notify Me"}
        </a>
      </div>
    </div>
  );
}
