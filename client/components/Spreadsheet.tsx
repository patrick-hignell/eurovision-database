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
    <div className="">
      <table className="w-full table-fixed">
        <thead className="block">
          <HeaderRow
            filter={filter}
            onHeaderClick={onHeaderClick}
            onCaretClick={onCaretClick}
          />
        </thead>
        <tbody className="block max-h-[54rem] w-fit overflow-y-scroll font-normal">
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
