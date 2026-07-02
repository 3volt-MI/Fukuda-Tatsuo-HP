import { getSettings } from '@/lib/microcms'
import RevealOnScroll from '@/components/RevealOnScroll'
import ContactForm from '@/components/contact/ContactForm'

export const revalidate = 3600

export default async function ContactPage() {
  const settings = await getSettings().catch(() => null)

  return (
    <div className="wrap pad-top pad-bottom">
      <div className="contact">
        <RevealOnScroll>
          <div className="sec-head sec-head--center">
            <h2 className="serif">Contact</h2>
          </div>
          <p className="lead">
            海のこと、撮影のご依頼、<br />
            ひとことでもお気軽に。
          </p>
          <p>
            撮影・寄稿・使用許諾などのお問い合わせは、以下のフォームまたはメールからどうぞ。
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <ContactForm />
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <div className="social">
            {settings?.email && (
              <a href={`mailto:${settings.email}`}>Email</a>
            )}
            {settings?.instagram && (
              <a href={settings.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            )}
            {settings?.x && (
              <a href={settings.x} target="_blank" rel="noopener noreferrer">X</a>
            )}
            {settings?.facebook && (
              <a href={settings.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
            )}
            {!settings && (
              <>
                <a href="mailto:hello@example.com">Email</a>
                <a href="#" rel="noopener">Instagram</a>
                <a href="#" rel="noopener">X</a>
              </>
            )}
          </div>
        </RevealOnScroll>
      </div>
    </div>
  )
}
