import { Link } from 'react-router'
import { Entry } from '../../models/entry'

export default function InfoPanelSmall(entry: Entry) {
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
              <tr>
                <td>
                  <span className="font-extrabold underline">Artist</span>
                  {`: ${entry.artist}`}
                </td>
                <td>
                  <span className="font-extrabold underline">Song</span>
                  {`: ${entry.song}`}
                </td>
              </tr>
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
