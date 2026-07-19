import { brand } from '../data/products.js'
import { BottleIcon } from './icons.jsx'
import FeaturedStrip  from './FeaturedStrip.jsx'

export default function Hero() {
  return (
    <section className="hero light">
      <FeaturedStrip />
      <div className="hero-plaque light">
        <BottleIcon className="bottle-mark" stroke="#B8903E" />
        <span className="eyebrow">{brand.tagline}</span>
        <h1>
          Scent, made by hand,
          <br />
          worn like memory.
        </h1>
        <p className="sub">
          A small showroom of original fragrances, formulated and bottled one batch at a
          time. Browse the collection below — every piece is available to view and
          enquire about directly.
        </p>
        <div className="divider" />
      </div>
    </section>
  )
}
