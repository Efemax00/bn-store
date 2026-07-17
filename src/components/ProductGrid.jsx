import { products } from '../data/products.js'
import ProductCard from './ProductCard.jsx'

export default function ProductGrid() {
  return (
    <section className="collection light">
      <div className="inner">
        <div className="section-head">
          <div>
            <span className="eyebrow">The collection</span>
            <h2>Available now</h2>
          </div>
          <p>
            {products.length} fragrances, each numbered by batch. Tap any piece to
            enquire about price, size, or a sample on WhatsApp.
          </p>
        </div>

        <div className="grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
