import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { brand } from "../data/products.js";
import { WhatsAppIcon, SearchIcon } from "./icons.jsx";
import { useSearch } from "../context/SearchContext.jsx";
import SearchDropdown from "./SearchDropdown.jsx";

export default function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { query, setQuery } = useSearch();
  const [focused, setFocused] = useState(false);
  const message = encodeURIComponent(
    "Hi! I'd love to know more about your fragrances.",
  );
  const showSearch = !location.pathname.startsWith("/admin");

  function goToCollection() {
    const el = document.getElementById("collection");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document
          .getElementById("collection")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  }

  function handleSelect(product) {
    setQuery(product.name);
    setFocused(false);
    goToCollection();
  }

  return (
    <nav className="dark">
      <div className="brand-block">
        <div className="brand">
          B'<span>N</span>
        </div>
        <div className="brand-tag">{brand.tagline}</div>
      </div>

      {showSearch && (
        <div className="nav-search-wrap">
          <div className="nav-search">
            <SearchIcon className="icon-sm" />
            <input
              type="text"
              placeholder="Search scents, prices, notes…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
          </div>
          {focused && <SearchDropdown onSelect={handleSelect} />}
        </div>
      )}

      <a
        className="wa-nav"
        href={`https://wa.me/${brand.whatsappNumber}?text=${message}`}
        target="_blank"
        rel="noreferrer"
      >
        <WhatsAppIcon className="icon-sm" />
        <span className="wa-nav-text">Message on WhatsApp</span>
      </a>
    </nav>
  );
}
