import { Link } from 'react-router'

export default function Navbar() {
  return (
    <div className="w-full rounded-b-lg border-2 border-white bg-[#242b50] p-4 text-white">
      <ul className="flex gap-4">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/table">Database</Link>
        </li>
      </ul>
    </div>
  )
}
