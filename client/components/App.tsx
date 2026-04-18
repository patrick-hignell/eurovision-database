import { Link } from 'react-router'

function App() {
  return (
    <div className="app flex w-[90%] flex-col text-center font-['rem'] font-[600] tracking-wide">
      <h1 className="p-4 pb-16 font-['Delicious_Handrawn'] text-6xl font-normal">
        The Unofficial Eurovision Costume Database
      </h1>
      <div className="flex flex-col gap-4 text-2xl">
        <p>Welcome to the unofficial Eurovision costume database! </p>
        <p>
          This database is designed primarily for people attending Eurovision
          costume parties who want to research the costumes of entries past.
        </p>
        <p>
          The database currently has data on all entries up until 2025 and has
          images and youtube links for all countries in this year&apos;s
          Eurovision going as far back as 2007.
        </p>
        <p>
          The database will continue to be updated over time, hopefully to
          eventually include any available media for all previous entries.
        </p>
        <p>
          The costumes of all entries that currently have images have been
          scored to easily search for the most interesting outfits. Fortunately
          the scoring of these costumes was completely logical and not
          subjective at all and as such no one has any reason to complain about
          it!
        </p>
      </div>
      <div className="my-16 flex justify-center pt-2 font-['Delicious_Handrawn'] text-7xl font-normal [word-spacing:0.5rem]">
        <div className="flex w-fit rounded-full bg-white bg-opacity-25 px-6 py-4 outline outline-1 outline-white hover:bg-opacity-75">
          <Link to="/table">Enter the Database</Link>
        </div>
      </div>
    </div>
  )
}

export default App
