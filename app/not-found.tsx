import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        textAlign: 'center',
        padding: '40px',
      }}
    >
      <p
        style={{
          fontFamily: 'Jost, sans-serif',
          letterSpacing: '.3em',
          textTransform: 'uppercase',
          fontSize: '.68rem',
          color: 'var(--accent)',
        }}
      >
        404
      </p>
      <h1
        className="serif"
        style={{ fontWeight: 300, fontSize: 'clamp(2rem,6vw,3.5rem)', lineHeight: 1.1 }}
      >
        Page not found
      </h1>
      <Link
        href="/"
        style={{
          fontFamily: 'Jost, sans-serif',
          letterSpacing: '.24em',
          textTransform: 'uppercase',
          fontSize: '.66rem',
          color: 'var(--ink-dim)',
          marginTop: '8px',
          transition: 'color .4s',
        }}
      >
        ← Home
      </Link>
    </div>
  )
}
