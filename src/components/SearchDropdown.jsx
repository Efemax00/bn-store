import { useStoreProducts } from '../context/StoreProductsContext'
import { useSearch } from '../context/SearchContext.jsx'

function formatPrice(price, currency = 'NGN') {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(Number(price || 0))
}

export default function SearchDropdown({ onSelect }) {
  const { products } = useStoreProducts()
  const { query } = useSearch()

  if (!query.trim()) return null

  const matches = products
    .filter((p) =>
      [p.name, p.type, p.manufacturer, ...(p.notes || [])]
        .join(' ')
        .toLowerCase()
        .includes(query.toLowerCase())
    )
    .slice(0, 6)

  return (
    <div className="search-dropdown">
      {matches.length === 0 ? (
        <div className="search-dropdown-empty">No matches for "{query}"</div>
      ) : (
        matches.map((p) => (
          <button
            type="button"
            key={p.id}
            className="search-dropdown-row"
            onMouseDown={(e) => e.preventDefault()} // keeps input focus, click still fires
            onClick={() => onSelect(p)}
          >
            <span className="search-dropdown-name">{p.name}</span>
            <span className="search-dropdown-price">
              {formatPrice(p.price, p.currency)}
            </span>
          </button>
        ))
      )}
    </div>
  )
}