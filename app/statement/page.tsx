import Image from 'next/image'
import { getStatement } from '@/lib/microcms'
import RevealOnScroll from '@/components/RevealOnScroll'

export const revalidate = 60

export default async function StatementPage() {
  const data = await getStatement().catch(() => null)

  return (
    <>
      {/* Hero image */}
      <div className="stmt-hero">
        <div className="ph" style={{ position: 'absolute', inset: 0 }}>
          <Image
            src={data?.heroImage?.url ?? '/images/home-hero.png'}
            alt="Statement hero"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>

      <div className="wrap pad-top pad-bottom">
        <RevealOnScroll className="sec-head sec-head--center">
          <h2 className="serif">Statement</h2>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="stmt-body">
            {data?.lead ? (
              <p className="lead" dangerouslySetInnerHTML={{ __html: data.lead }} />
            ) : (
              <p className="lead">
                光が届かない場所にも、確かに色がある。<br />
                私はその色を、息を止めて聴きにいく。
              </p>
            )}

            {data?.body ? (
              <div dangerouslySetInnerHTML={{ __html: data.body }} />
            ) : (
              <>
                <p>水の中では、時間の流れ方が変わる。潮に身をあずけ、生きものの呼吸に近づいていくと、陸の上で見失っていた静けさがそこにある。この一連の作品は、遠い海ではなく、私たちのすぐそばにある海を、もう一度見つめ直すための記録です。</p>
                <p>被写体にできるだけ負担をかけず、その場のリズムに寄り添うこと。派手さよりも、そこにある気配を残すこと。撮るたびに、海は私に問いを返してきます。あなたは何を持ち帰るのか、と。</p>
              </>
            )}

            <p className="sign">
              {data?.signature ?? 'Fukuda Tatsuo — Diver & Photographer'}
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </>
  )
}
