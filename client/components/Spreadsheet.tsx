import { Entry } from '../../models/entry'
import Row from './Row'
interface Props {
  entries: Entry[]
  onCellClick: (entry: Entry) => void
  selectedId: number
}

export default function Spreadsheet({
  entries,
  onCellClick,
  selectedId,
}: Props) {
  console.log(selectedId)
  return (
    <div className="w-5/6">
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Year</th>
            <th>Artist</th>
            <th>Song</th>
            <th>Language</th>
            <th>Position</th>
            <th>Points</th>
            <th>Link</th>
            <th>Costume</th>
          </tr>
        </thead>
        <tbody className="font-normal">
          {entries.map((entry) => (
            <Row
              onCellClick={onCellClick}
              key={entry.id}
              entry={entry}
              selected={entry.id == selectedId}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
