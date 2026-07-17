import { brand } from '../data/products.js'
import { WhatsAppIcon } from './icons.jsx'

export default function Nav() {
  const message = encodeURIComponent("Hi! I'd love to know more about your fragrances.")

  return (
    <nav className="dark">
      <div className="brand-block">
        <div className="brand">
          B'<span>N</span>
        </div>
        <div className="brand-tag">{brand.tagline}</div>
      </div>
      <a
        className="wa-nav"
        href={`https://wa.me/${brand.whatsappNumber}?text=${message}`}
        target="_blank"
        rel="noreferrer"
      >
        <WhatsAppIcon className="icon-sm" />
        Message on WhatsApp
      </a>
    </nav>
  )
}
