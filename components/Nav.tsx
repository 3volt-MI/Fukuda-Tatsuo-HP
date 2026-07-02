'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/statement', label: 'Statement' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/journal', label: 'Journal' },
  { href: '/biography', label: 'Biography' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const [solid, setSolid] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const linksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isHome = pathname === '/'
    const onScroll = () => {
      setSolid(!isHome || window.scrollY > 40)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [menuOpen])

  return (
    <nav className={`nav${solid ? ' is-solid' : ''}`}>
      <Link href="/" className="logo">
        FUKUDA <b>TATSUO</b>
      </Link>

      <button
        className="burger"
        aria-label="メニュー"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>

      <div ref={linksRef} className={`nav__links${menuOpen ? ' open' : ''}`}>
        {NAV_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            aria-current={pathname === href || (href !== '/' && pathname.startsWith(href)) ? 'page' : undefined}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
