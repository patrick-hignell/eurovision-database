import { Outlet } from 'react-router'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div className="flex h-full min-h-screen w-full bg-gradient-to-tr from-[#ff9bf5] to-[#57d5d1] text-center font-['rem'] font-[600] tracking-wide">
      <header></header>
      <div className="flex flex-row">
        <nav className="w-20">
          <Navbar />
        </nav>
        <main className="flex w-full justify-center">
          <Outlet />
        </main>
      </div>
      <footer></footer>
    </div>
  )
}
