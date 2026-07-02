import { createClient } from 'microcms-js-sdk'

const configured =
  !!process.env.MICROCMS_SERVICE_DOMAIN && !!process.env.MICROCMS_API_KEY

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN ?? 'placeholder',
  apiKey: process.env.MICROCMS_API_KEY ?? 'placeholder',
})

// env 未設定時はフォールバック値を即返して API コールをスキップ
function guard<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  if (!configured) return Promise.resolve(fallback)
  return fn()
}

// ─── 共通 ────────────────────────────────────────────────
export type MicroCMSImage = {
  url: string
  width: number
  height: number
}

export type MicroCMSBase = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
}

// ─── exhibition ──────────────────────────────────────────
export type Exhibition = MicroCMSBase & {
  title: string
  year?: string
  order?: number
}

// ─── gallery ─────────────────────────────────────────────
export type GalleryItem = MicroCMSBase & {
  image: MicroCMSImage
  caption?: string
  exhibition: Exhibition
  takenAt?: string
}

// ─── journal ─────────────────────────────────────────────
export type JournalPost = MicroCMSBase & {
  title: string
  slug: string
  publishedAt: string
  thumbnail: MicroCMSImage
  heroImage?: MicroCMSImage
  excerpt: string
  body: string
}

// ─── statement ───────────────────────────────────────────
export type Statement = {
  heroImage: MicroCMSImage
  lead: string
  body: string
  signature?: string
}

// ─── biography ───────────────────────────────────────────
export type BiographyItem = {
  fieldId: string
  year: string
  text: string
}

export type Biography = {
  portrait: MicroCMSImage
  name: string
  role: string
  lede: string
  exhibitions: BiographyItem[]
  awards: BiographyItem[]
  publications: BiographyItem[]
}

// ─── settings ────────────────────────────────────────────
export type SiteSettings = {
  siteName?: string
  heroCopy?: string
  heroImage?: MicroCMSImage
  email?: string
  instagram?: string
  x?: string
  facebook?: string
}

// ─── 取得関数 ─────────────────────────────────────────────
export function getExhibitions(): Promise<Exhibition[]> {
  return guard(async () => {
    const res = await client.getList<Exhibition>({
      endpoint: 'exhibition',
      queries: { orders: 'order', limit: 100 },
    })
    return res.contents
  }, [])
}

export function getGallery(): Promise<GalleryItem[]> {
  return guard(async () => {
    const res = await client.getList<GalleryItem>({
      endpoint: 'gallery',
      queries: { orders: '-takenAt', limit: 100, depth: 2 },
    })
    return res.contents
  }, [])
}

export function getJournalList(): Promise<JournalPost[]> {
  return guard(async () => {
    const res = await client.getList<JournalPost>({
      endpoint: 'journal',
      queries: { orders: '-publishedAt', limit: 100 },
    })
    return res.contents
  }, [])
}

export function getJournalBySlug(slug: string): Promise<JournalPost | null> {
  return guard(async () => {
    const res = await client.getList<JournalPost>({
      endpoint: 'journal',
      queries: { filters: `slug[equals]${slug}`, limit: 1 },
    })
    return res.contents[0] ?? null
  }, null)
}

export function getStatement(): Promise<Statement | null> {
  return guard(
    () => client.get<Statement>({ endpoint: 'statement' }),
    null,
  )
}

export function getBiography(): Promise<Biography | null> {
  return guard(
    () => client.get<Biography>({ endpoint: 'biography' }),
    null,
  )
}

export function getSettings(): Promise<SiteSettings | null> {
  return guard(
    () => client.get<SiteSettings>({ endpoint: 'settings' }),
    null,
  )
}
