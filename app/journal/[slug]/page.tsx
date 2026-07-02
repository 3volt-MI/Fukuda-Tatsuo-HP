import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getJournalBySlug, getJournalList } from '@/lib/microcms'
import type { Metadata } from 'next'

export const revalidate = 60

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  const posts = await getJournalList().catch(() => [])
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getJournalBySlug(params.slug).catch(() => null)
  if (!post) return {}
  return {
    title: `${post.title} — FUKUDA TATSUO`,
    description: post.excerpt,
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\//g, '.')
}

export default async function JournalDetailPage({ params }: Props) {
  const post = await getJournalBySlug(params.slug).catch(() => null)
  if (!post) notFound()

  return (
    <div className="wrap pad-top pad-bottom">
      <div className="article">
        <Link
          href="/journal"
          style={{
            fontFamily: 'Jost',
            letterSpacing: '.24em',
            textTransform: 'uppercase',
            fontSize: '.64rem',
            color: 'var(--ink-dim)',
            display: 'inline-block',
            marginBottom: '40px',
            transition: 'color .4s',
          }}
          className="back-link"
        >
          ‹ Back to Journal
        </Link>

        <p className="article__date">{formatDate(post.publishedAt)}</p>
        <h1 className="article__title serif">{post.title}</h1>

        {(post.heroImage ?? post.thumbnail) && (
          <div className="article__hero ph">
            <Image
              src={(post.heroImage ?? post.thumbnail)!.url}
              alt={post.title}
              fill
              priority
              sizes="(max-width:820px) 100vw, 760px"
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}

        <div
          className="article__body"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
      </div>
    </div>
  )
}
