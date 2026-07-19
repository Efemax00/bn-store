import { useRef } from "react";
import { useStoreProducts } from "../context/StoreProductsContext.jsx";
import { brand } from "../data/products.js";
import { BottleIcon } from './icons.jsx';

export default function FeaturedStrip() {
  const { products } = useStoreProducts();
  const scrollContainerRef = useRef(null);
  
  const items = products.slice(0, 6);
  if (items.length === 0) return null;

  const looped = [...items, ...items];

  // Mobile manual navigation triggers
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 220; // Width of one card + gap
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="featured-strip-outer">
      {/* Mobile-only Arrow Controls */}
      <button className="strip-arrow arrow-left" onClick={() => scroll("left")} aria-label="Scroll left">‹</button>
      <button className="strip-arrow arrow-right" onClick={() => scroll("right")} aria-label="Scroll right">›</button>

      <div className="featured-strip-wrap" ref={scrollContainerRef}>
        <div className="featured-strip-track">
          {looped.map((p, i) => {
            const message = encodeURIComponent(`Hi! I am interested in your "${p.name}" fragrance. Could you share details?`);
            const whatsappUrl = `https://wa.me/${brand.whatsappNumber}?text=${message}`;

            return (
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="featured-chip" 
                key={`${p.id}-${i}`}
              >
                <div className="featured-chip-img">
                  {p.imageUrl ? <img src={p.imageUrl} alt={p.name} /> : <BottleIcon />}
                </div>
                <div className="featured-chip-meta">
                  <span className="featured-chip-name">{p.name}</span>
                  <span className="featured-chip-price">
                    {p.price ? `₦${Number(p.price).toLocaleString('en-NG')}` : 'Enquire'} 
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
