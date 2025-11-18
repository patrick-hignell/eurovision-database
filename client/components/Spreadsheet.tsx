import { Category, EntryWithImages, FilterEntry } from '../../models/entry'
import FilterRow from './FilterRow'
import HeaderRow from './HeaderRow'
import Row from './Row'
interface Props {
  entries: EntryWithImages[]
  onCellClick: (entry: EntryWithImages) => void
  onFilterChange: (category: Category, value: number | string) => void
  onHeaderClick: (category: Category) => void
  onCaretClick: (category: Category) => void
  selectedId: number
  filter: FilterEntry
}

export default function Spreadsheet({
  entries,
  onCellClick,
  onFilterChange,
  onHeaderClick,
  onCaretClick,
  selectedId,
  filter,
}: Props) {
  // console.log(selectedId)
  return (
    <div className="w-5/6">
      <table>
        <thead>
          <HeaderRow
            filter={filter}
            onHeaderClick={onHeaderClick}
            onCaretClick={onCaretClick}
          />
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
