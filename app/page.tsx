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

  // CMS 未登録の場合は picsum の仮画像を使用
  const PLACEHOLDERS = [
    'https://picsum.photos/seed/stmt-4/900/1200',
    'https://picsum.photos/seed/gal-cover-2/900/1200',
    'https://picsum.photos/seed/jr-cover-5/900/1200',
    'https://picsum.photos/seed/bio-cover-7/900/1200',
  ]
  const tileImages = [
    statement?.heroImage?.url ?? PLACEHOLDERS[0],
    gallery[0]?.image?.url    ?? PLACEHOLDERS[1],
    journals[0]?.thumbnail?.url ?? PLACEHOLDERS[2],
    biography?.portrait?.url  ?? PLACEHOLDERS[3],
  ]

  return (
    <>
      {/* ── Hero ────────────────────────────────────── */}
      <section className="hero">
        <div className="ph" style={{ position: 'absolute', inset: 0 }}>
          <Image
            src={settings?.heroImage?.url ?? '/images/home-hero.png'}
            alt="南極の船上に立つ福田達生"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div className="hero__inner">
          <div className="hero__titlewrap">
            <h1 className="hero__title">
              {settings?.heroCopy ? (
                <span dangerouslySetInnerHTML={{ __html: settings.heroCopy }} />
              ) : (
                'Tatsuo Fukuda'
              )}
            </h1>
            <span className="hero__bar" />
          </div>
          <p className="hero__sub">Official Diving Site</p>
        </div>

        <ScrollCue />
      </section>

      {/* ── Index tiles ──────────────────────────────── */}
      <div className="index wrap">
        <div className="index__grid">
          {TILE_META.map(({ num, label, href }, i) => (
            <RevealOnScroll key={href} delay={i * 80}>
              <Link href={href} className="tile">
                <div className="ph" style={{ position: 'absolute', inset: 0 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={tileImages[i]}
                    alt={label}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
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
