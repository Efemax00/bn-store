const steps = [
  {
    eyebrow: '01 — Browse',
    body: 'View the full collection above — notes, character, and pricing for every bottle currently available.',
  },
  {
    eyebrow: '02 — Enquire',
    body: 'Tap "Message on WhatsApp" on any piece. Your enquiry opens pre-filled with the fragrance name.',
  },
  {
    eyebrow: '03 — Collect',
    body: 'Sizing, payment, and delivery or pickup are confirmed directly over chat — simple, no account needed.',
  },
]

export default function HowItWorks() {
  return (
    <section className="strip light">
      <div className="strip-inner">
        {steps.map((step) => (
          <div className="item" key={step.eyebrow}>
            <span className="eyebrow">{step.eyebrow}</span>
            <p>{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
