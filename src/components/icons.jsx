export function BottleIcon({ className, stroke = "currentColor" }) {
  return (
    <svg className={className} viewBox="0 0 60 100" fill="none" stroke={stroke} strokeWidth="1.2">
      <rect x="15" y="8" width="10" height="8" rx="1" />
      <path d="M20 16 L20 24" />
      <path d="M12 24 Q12 26 12 30 L12 90 Q12 96 20 96 L20 96 Q28 96 28 90 L28 30 Q28 26 28 24 Z" />
      <line x1="12" y1="42" x2="28" y2="42" />
    </svg>
  )
}

export function WhatsAppIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.5 14.4c-.3-.1-1.7-.9-2-1s-.5-.1-.7.1-.7 1-.9 1.2-.4.2-.7.1a8 8 0 0 1-2.3-1.5 9 9 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.4-.5.2-.4a.5.5 0 0 0 0-.5c-.1-.1-.6-1.5-.8-2.1-.2-.5-.5-.5-.7-.5h-.6a1.1 1.1 0 0 0-.8.4 3.4 3.4 0 0 0-1 2.5c0 1.5 1 2.9 1.2 3.1.1.2 2.2 3.4 5.3 4.7.7.3 1.3.5 1.8.6.7.3 1.4.2 1.9.1.6-.1 1.7-.7 2-1.3.2-.7.2-1.2.2-1.3s-.3-.2-.6-.3z" />
      <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
    </svg>
  )
}
