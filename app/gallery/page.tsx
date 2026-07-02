import { getGallery, getExhibitions, type GalleryItem, type GalleryItemWithImage } from '@/lib/microcms'
import RevealOnScroll from '@/components/RevealOnScroll'
import GalleryClient from '@/components/gallery/GalleryClient'

export const revalidate = 60

export default async function GalleryPage() {
  const [rawItems, exhibitions] = await Promise.all([
    getGallery().catch((): GalleryItem[] => []),
    getExhibitions().catch(() => []),
  ])

  // CMS上でimage未設定のまま公開された下書き的なエントリーはここで除外する
  const items: GalleryItemWithImage[] = rawItems.filter(
    (it: GalleryItem): it is GalleryItemWithImage => !!it?.image?.url,
  )

  return (
    <div className="wrap pad-top pad-bottom">
      <RevealOnScroll className="sec-head">
        <h2 className="serif">Gallery</h2>
      </RevealOnScroll>

      {items.length === 0 ? (
        <p style={{ color: 'var(--ink-faint)', fontFamily: 'Jost', fontSize: '.86rem', letterSpacing: '.1em' }}>
          No images yet.
        </p>
      ) : (
        <GalleryClient items={items} exhibitions={exhibitions} />
      )}
    </div>
  )
}
