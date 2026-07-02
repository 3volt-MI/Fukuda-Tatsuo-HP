export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer>
      <span className="logo">
        Tatsuo <b>Fukuda</b>
      </span>
      <small>© {year} Fukuda Tatsuo — All rights reserved.</small>
    </footer>
  )
}
