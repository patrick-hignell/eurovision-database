import { Link } from 'react-router'
import { Entry } from '../../models/entry'

export default function InfoPanel(entry: Entry) {
  return (
    <div className="rounded-sm bg-white bg-opacity-25 outline outline-1 outline-white">
      {entry.id == -1 && <p className="text-3xl">Select an entry to begin</p>}
      {entry.id !== -1 && (
        <table className="w-full table-fixed">
          <tbody>
            <tr>
              <td>
                <span className="font-extrabold underline">Country</span>
                {`: ${entry.country}`}
              </td>
              <td>
                <span className="font-extrabold underline">Year</span>
                {`: ${entry.year}`}
              </td>
              <td>
                <span className="font-extrabold underline">Artist</span>
                {`: ${entry.artist}`}
              </td>
              <td>
                <span className="font-extrabold underline">Song</span>
                {`: ${entry.song}`}
              </td>
              <td>
                <span className="font-extrabold underline">Language</span>
                {`: ${entry.language}`}
              </td>
            </tr>
            <tr>
              <td>
                <span className="font-extrabold underline">Position</span>
                {`: ${entry.position}`}
              </td>
              <td>
                <span className="font-extrabold underline">Points</span>
                {`: ${entry.points}`}
              </td>
              <td colSpan={2}>
                <span className="font-extrabold underline">Link</span>:{' '}
                <Link
                  className="text-blue-600 underline"
                  to={entry.link}
                  target="_blank"
                >
                  {entry.link}
                </Link>
              </td>
              <td>
                <span className="font-extrabold underline">Costume</span>
                {`: ${entry.costume}`}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  )
}
