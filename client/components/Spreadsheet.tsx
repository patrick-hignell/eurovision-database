import { Category, EntryWithImages, FilterEntry } from '../../models/entry'
import FilterRow from './FilterRow'
import Row from './Row'
interface Props {
  entries: EntryWithImages[]
  onCellClick: (entry: EntryWithImages) => void
  onFilterChange: (category: Category, value: number | string) => void
  selectedId: number
  filter: FilterEntry
}

export default function Spreadsheet({
  entries,
  onCellClick,
  onFilterChange,
  selectedId,
  filter,
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
          <FilterRow filter={filter} onFilterChange={onFilterChange} />
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
