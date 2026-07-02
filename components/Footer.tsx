export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer>
      <span className="logo">
        FUKUDA <b>TATSUO</b>
      </span>
      <small>© {year} Fukuda Tatsuo — All rights reserved.</small>
    </footer>
  )
}
