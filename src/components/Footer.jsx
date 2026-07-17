import { brand } from '../data/products.js'

export default function Footer() {
  return (
    <footer className="dark">
      <div className="brand-block" style={{ alignItems: 'center', marginBottom: 10 }}>
        <span className="brand">
          B'<span style={{ color: 'var(--gold)' }}>N</span>
        </span>
        <span className="brand-tag">{brand.tagline}</span>
      </div>
      <p>
        Enquiries via{' '}
        <a href={`https://wa.me/${brand.whatsappNumber}`} target="_blank" rel="noreferrer">
          WhatsApp
        </a>
      </p>
    </footer>
  )
}
