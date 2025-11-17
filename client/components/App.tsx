import { Link } from 'react-router'

function App() {
  return (
    <div className="app flex w-screen flex-col text-center font-['rem'] font-[600] tracking-wide">
      <h1 className="text-3xl font-bold underline">
        Eurovision Costume Database
      </h1>
      <Link to="/table">Table</Link>
    </div>
  )
}

export default App
