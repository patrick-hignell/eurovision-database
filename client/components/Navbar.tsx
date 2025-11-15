import { Link } from 'react-router'

export default function Navbar() {
  return (
    <div className="fixed h-full rounded-r-lg border-2 border-white bg-[#242b50] p-4 text-white">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/table">Table</Link>
        </li>
      </ul>
    </div>
  )
}
