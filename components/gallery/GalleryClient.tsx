'use client'

import { useEffect, useCallback, useState } from 'react'
import Image from 'next/image'
import type { GalleryItemWithImage, Exhibition } from '@/lib/microcms'

type Props = {
  items: GalleryItemWithImage[]
  exhibitions: Exhibition[]
}

export default function GalleryClient({ items, exhibitions }: Props) {
  const [activeEx, setActiveEx] = useState<string>('All')
  const [lbOpen, setLbOpen] = useState(false)
  const [lbIndex, setLbIndex] = useState(0)

  const filtered = activeEx === 'All' ? items : items.filter((it) => it.exhibition?.id === activeEx)

  const openLb = (i: number) => {
    setLbIndex(i)
    setLbOpen(true)
  }

  const closeLb = useCallback(() => setLbOpen(false), [])
  const prev = useCallback(() => setLbIndex((i) => (i - 1 + filtered.length) % filtered.length), [filtered.length])
  const next = useCallback(() => setLbIndex((i) => (i + 1) % filtered.length), [filtered.length])

  useEffect(() => {
    if (!lbOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLb()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [lbOpen, closeLb, next, prev])

  const lbItem = filtered[lbIndex]

  return (
    <>
      {/* Filter bar */}
      <div className="filters" role="group" aria-label="展示でフィルター">
        <button
          className={`filter${activeEx === 'All' ? ' is-on' : ''}`}
          onClick={() => setActiveEx('All')}
        >
          All
        </button>
        {exhibitions.map((ex) => (
          <button
            key={ex.id}
            className={`filter${activeEx === ex.id ? ' is-on' : ''}`}
            onClick={() => setActiveEx(ex.id)}
          >
            {ex.title}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <div className="gal">
        {items.map((item, i) => {
          const visible = activeEx === 'All' || item.exhibition?.id === activeEx
          const filteredIdx = filtered.indexOf(item)
          return (
            <figure
              key={item.id}
              className={visible ? '' : 'hide'}
              onClick={() => visible && openLb(filteredIdx >= 0 ? filteredIdx : 0)}
              tabIndex={visible ? 0 : -1}
              role="button"
              aria-label={item.caption ?? item.exhibition?.title ?? 'Gallery photo'}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  if (visible) openLb(filteredIdx >= 0 ? filteredIdx : 0)
                }
              }}
            >
              <div className="ph">
                <Image
                  src={item.image.url}
                  alt={item.caption ?? item.exhibition?.title ?? 'Gallery photo'}
                  width={800}
                  height={Math.round(800 * (item.image.height / item.image.width))}
                  sizes="(max-width:560px) 100vw, (max-width:820px) 50vw, 33vw"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
              {item.caption && <figcaption>{item.caption}</figcaption>}
            </figure>
          )
        })}
      </div>

      {/* Lightbox */}
      {lbOpen && lbItem && (
        <div
          className="lb open"
          aria-modal="true"
          role="dialog"
          aria-label="拡大表示"
          onClick={(e) => e.target === e.currentTarget && closeLb()}
        >
          <button className="lb__close" onClick={closeLb}>
            Close ✕
          </button>
          <button className="lb__btn lb__prev" onClick={prev} aria-label="前へ">
            ‹
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${lbItem.image.url}?fm=webp&w=2000&q=85`}
            alt={lbItem.caption ?? lbItem.exhibition?.title ?? 'Gallery photo'}
            style={{ maxWidth: '88vw', maxHeight: '82vh', width: 'auto', height: 'auto', objectFit: 'contain', filter: 'saturate(0.5) brightness(0.95)' }}
          />
          <button className="lb__btn lb__next" onClick={next} aria-label="次へ">
            ›
          </button>
        </div>
      )}
    </>
  )
}
