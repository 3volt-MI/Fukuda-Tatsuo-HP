import Image from 'next/image'
import { getBiography } from '@/lib/microcms'
import RevealOnScroll from '@/components/RevealOnScroll'

export const revalidate = 60

const FALLBACK_BIO = {
  name: 'Fukuda Tatsuo',
  role: 'Diver / Underwater Photographer',
  lede: '1990年生まれ。学生時代に沖縄で初めて潜って以来、国内外の海に通いつづける。生きものと環境のあいだにある関係を主題に、静かな光と余白のある水中写真を撮影。近年は身近な海の記録に力を入れている。',
  exhibitions: [
    { fieldId: 'ex1', year: '2024', text: '個展「The Silent Blue」／ Gallery Placeholder, Tokyo' },
    { fieldId: 'ex2', year: '2022', text: 'グループ展「Coastal Light」／ Placeholder Museum' },
    { fieldId: 'ex3', year: '2020', text: '個展「Deep Field」／ Placeholder Space, Okinawa' },
  ],
  awards: [
    { fieldId: 'aw1', year: '2023', text: 'Ocean Photo Award ネイチャー部門 優秀賞' },
    { fieldId: 'aw2', year: '2021', text: 'Underwater Photographer of the Year 入選' },
  ],
  publications: [
    { fieldId: 'pb1', year: '2024', text: '写真集『The Silent Blue』（Placeholder Press）' },
    { fieldId: 'pb2', year: '2022', text: '『近くの海』（Placeholder Books）' },
  ],
}

export default async function BiographyPage() {
  const data = await getBiography().catch(() => null)
  const bio = data ?? FALLBACK_BIO

  return (
    <div className="wrap pad-top pad-bottom">
      <RevealOnScroll className="sec-head">
        <h2 className="serif">Biography</h2>
      </RevealOnScroll>

      <div className="bio">
        {/* Portrait */}
        <div className="bio__portrait ph rv">
          {data?.portrait ? (
            <Image
              src={data.portrait.url}
              alt={bio.name}
              fill
              sizes="(max-width:820px) 360px, 40vw"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div style={{ background: 'linear-gradient(160deg,#0d2733,#05090e)', position: 'absolute', inset: 0 }} />
          )}
        </div>

        {/* Text */}
        <div>
          <RevealOnScroll>
            <p className="bio__name serif">{bio.name}</p>
            <p className="bio__role">{bio.role}</p>
            <p className="bio__lede">{bio.lede}</p>
          </RevealOnScroll>

          {[
            { title: 'Exhibitions', items: bio.exhibitions },
            { title: 'Awards',      items: bio.awards },
            { title: 'Publications', items: bio.publications },
          ].map(({ title, items }) =>
            items?.length ? (
              <RevealOnScroll key={title} className="bio__list">
                <h3>{title}</h3>
                <dl>
                  {items.map((item) => (
                    <div key={item.fieldId} style={{ display: 'contents' }}>
                      <dt>{item.year}</dt>
                      <dd>{item.text}</dd>
                    </div>
                  ))}
                </dl>
              </RevealOnScroll>
            ) : null,
          )}
        </div>
      </div>
    </div>
  )
}
