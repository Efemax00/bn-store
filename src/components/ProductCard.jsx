import { useEffect, useRef, useState } from 'react'
import { brand } from '../data/products.js'
import { BottleIcon, WhatsAppIcon } from './icons.jsx'

export default function ProductCard({ product }) {
  const cardRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const message = encodeURIComponent(
    `Hi! I'm interested in ${product.name} (${product.number}) — is it still available?`
  )

  return (
    <div ref={cardRef} className={`card${visible ? ' in' : ''}`}>
      <div className="card-top">
        <span className="scent-no">{product.number}</span>
        <span className="scent-no">{product.size}</span>
      </div>

      <div className="bottle-wrap">
        <BottleIcon />
      </div>

      <h3>{product.name}</h3>
      <div className="type">{product.type}</div>

      <div className="notes">
        {product.notes.map((note) => (
          <span key={note} className="note-pill">
            {note}
          </span>
        ))}
      </div>

      <div className="card-foot">
        <span className="price">{product.price}</span>
        <a
          className="wa-btn"
          href={`https://wa.me/${brand.whatsappNumber}?text=${message}`}
          target="_blank"
          rel="noreferrer"
        >
          <WhatsAppIcon className="icon-sm" />
          Enquire
        </a>
      </div>
    </div>
  )
}
