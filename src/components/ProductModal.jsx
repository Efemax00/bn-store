import { useEffect } from "react";
import { BottleIcon, WhatsAppIcon } from "./icons.jsx";

const WHATSAPP_NUMBER = "2349064428036";

function formatPrice(price, currency = "NGN") {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(price || 0));
}

export default function ProductModal({ product, onClose }) {
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!product) return null;

  const message = encodeURIComponent(
    `Hi! I'm interested in ${product.name} (${product.size}) - is it still available?`
  );

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-image">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} />
          ) : (
            <div className="bottle-wrap">
              <BottleIcon />
            </div>
          )}

          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="modal-body">
          <span className="scent-no">
            {product.manufacturer} · {product.size}
          </span>

          <h2>{product.name}</h2>

          <div className="type">
            {product.type || "Luxury Perfume"}
          </div>

          {product.manufacturer && (
            <div className="manufacturer">
              By {product.manufacturer}
            </div>
          )}

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
              <div className="modal-price">
                {formatPrice(product.price, product.currency)}
              </div>

              <div
                className="modal-stock"
                style={{
                  color:
                    Number(product.stock) > 0 ? "#16a34a" : "#dc2626",
                }}
              >
                {Number(product.stock) > 0
                  ? `${product.stock} in stock`
                  : "Sold Out"}
              </div>
            </div>

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
  );
}