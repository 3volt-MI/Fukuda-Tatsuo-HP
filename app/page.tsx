import Link from 'next/link'
import Image from 'next/image'
import { getSettings, getStatement, getBiography, getJournalList, getGallery } from '@/lib/microcms'
import RevealOnScroll from '@/components/RevealOnScroll'
import ScrollCue from '@/components/ScrollCue'

export const revalidate = 60

const TILE_META = [
  { num: '01', label: 'Statement', href: '/statement' },
  { num: '02', label: 'Gallery',   href: '/gallery' },
  { num: '03', label: 'Journal',   href: '/journal' },
  { num: '04', label: 'Biography', href: '/biography' },
]

export default async function HomePage() {
  const [settings, statement, biography, journals, gallery] = await Promise.all([
    getSettings().catch(() => null),
    getStatement().catch(() => null),
    getBiography().catch(() => null),
    getJournalList().catch(() => []),
    getGallery().catch(() => []),
  ])

  // Tile cover images: prefer CMS data, fallback to placeholder gradient
  const tileImages = [
    statement?.heroImage?.url ?? null,
    gallery[0]?.image?.url ?? null,
    journals[0]?.thumbnail?.url ?? null,
    biography?.portrait?.url ?? null,
  ]

  return (
    <>
      {/* ── Hero ────────────────────────────────────── */}
      <section className="hero">
        {settings?.heroImage ? (
          <div className="ph" style={{ position: 'absolute', inset: 0 }}>
            <Image
              src={settings.heroImage.url}
              alt="海中を差し込む光"
              fill
              priority
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        ) : (
          <div
            className="ph"
            style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg,#0d2733,#05090e)' }}
          />
        )}

        <div className="hero__inner">
          <h1 className="hero__title">
            {settings?.heroCopy ? (
              <span dangerouslySetInnerHTML={{ __html: settings.heroCopy }} />
            ) : (
              <>
                The <span className="ital">Silent</span>
                <br />
                Blue
              </>
            )}
          </h1>
          <p className="hero__sub">Underwater Photography</p>
        </div>

        <ScrollCue />
      </section>

      {/* ── Index tiles ──────────────────────────────── */}
      <div className="index wrap">
        <div className="index__grid">
          {TILE_META.map(({ num, label, href }, i) => (
            <RevealOnScroll key={href} delay={i * 80}>
              <Link href={href} className="tile">
                {tileImages[i] ? (
                  <div className="ph" style={{ position: 'absolute', inset: 0 }}>
                    <Image
                      src={tileImages[i]!}
                      alt={label}
                      fill
                      sizes="(max-width:560px) 100vw, (max-width:1024px) 50vw, 25vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                ) : (
                  <div
                    className="ph"
                    style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg,#0d2733,#05090e)' }}
                  />
                )}
                <div className="tile__cap">
                  <span className="num">{num}</span>
                  <span className="en">{label}</span>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </>
  )
}
