import Logo from "../components/Logo"
import PickMark from "../components/PickMark"

export default function Menu() {
  return (
    <>
      <header className="menu__header">
        <Logo />
      </header>
      <main className="menu__main">
        <PickMark />
      </main>
    </>
  )
}
