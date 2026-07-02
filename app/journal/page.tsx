import Link from 'next/link'
import Image from 'next/image'
import { getJournalList } from '@/lib/microcms'
import RevealOnScroll from '@/components/RevealOnScroll'

export const revalidate = 60

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\//g, '.')
}

export default async function JournalPage() {
  const posts = await getJournalList().catch(() => [])

  return (
    <div className="wrap pad-top pad-bottom">
      <RevealOnScroll className="sec-head">
        <h2 className="serif">Journal</h2>
      </RevealOnScroll>

      {posts.length === 0 ? (
        <p style={{ color: 'var(--ink-faint)', fontFamily: 'Jost', fontSize: '.86rem', letterSpacing: '.1em' }}>
          No articles yet.
        </p>
      ) : (
        <div className="journal-list">
          {posts.map((post, i) => (
            <RevealOnScroll key={post.id} delay={i * 60}>
              <Link href={`/journal/${post.slug}`} className="jcard">
                <div className="jcard__thumb ph">
                  <Image
                    src={post.thumbnail.url}
                    alt={post.title}
                    width={560}
                    height={420}
                    sizes="(max-width:820px) 100vw, 280px"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </div>
                <div>
                  <p className="jcard__date">{formatDate(post.publishedAt)}</p>
                  <h3 className="jcard__title serif">{post.title}</h3>
                  <p className="jcard__ex">{post.excerpt}</p>
                  <p className="jcard__more">Read ›</p>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      )}
    </div>
  )
}
