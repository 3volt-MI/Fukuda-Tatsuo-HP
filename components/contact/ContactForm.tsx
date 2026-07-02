'use client'

import { useState, type FormEvent } from 'react'

export default function ContactForm() {
  const [note, setNote] = useState('')
  const [sending, setSending] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity()) {
      setNote('未入力の項目があります。')
      return
    }
    setSending(true)
    // TODO: Resend 等に接続する
    setTimeout(() => {
      setNote('送信ありがとうございます。追ってご連絡いたします。')
      form.reset()
      setSending(false)
    }, 800)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="name">お名前</label>
        <input id="name" name="name" type="text" autoComplete="name" required />
      </div>
      <div className="field">
        <label htmlFor="email">メールアドレス</label>
        <input id="email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="field">
        <label htmlFor="message">メッセージ</label>
        <textarea id="message" name="message" required />
      </div>
      <button className="submit" type="submit" disabled={sending}>
        {sending ? 'Sending…' : 'Send Message'}
      </button>
      <p className="formnote" role="status">
        {note}
      </p>
    </form>
  )
}
