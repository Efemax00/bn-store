import { useEffect, useRef, useState } from "react";
import { BottleIcon, WhatsAppIcon } from "./icons.jsx";

const WHATSAPP_NUMBER = "2349064428036";

function formatPrice(price, currency = "NGN") {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(price || 0));
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
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const message = encodeURIComponent(
    `Hi! I'm interested in ${product.name} (${product.size}) - is it still available?`
  );

  return (
    <div ref={cardRef} className={`card${visible ? " in" : ""}`}>
      <div className="card-top">
        <span className="scent-no">{product.manufacturer}</span>

        <span
          className="scent-no"
          style={{
            color: product.stock > 0 ? "#16a34a" : "#dc2626",
          }}
        >
          {product.stock > 0 ? `${product.stock} left` : "Sold Out"}
        </span>
      </div>

      <div className="bottle-wrap">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{
              width: "180px",
              height: "180px",
              objectFit: "contain",
            }}
          />
        ) : (
          <BottleIcon />
        )}
      </div>

      <h3>{product.name}</h3>

      <div className="type">
        {product.type || "Luxury Perfume"}
      </div>

      <div className="notes">
        {(product.notes || []).map((note) => (
          <span key={note} className="note-pill">
            {note}
          </span>
        ))}
      </div>

      <div className="card-foot">
        <span className="price">
          {formatPrice(product.price, product.currency)}
        </span>

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