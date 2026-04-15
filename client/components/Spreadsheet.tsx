import { Category, EntryWithImages, FilterEntry } from '../../models/entry'
import BasicHeaderRow from './BasicHeaderRow'
import FilterRow from './FilterRow'
import Row from './Row'
interface Props {
  entries: EntryWithImages[]
  onCellClick: (entry: EntryWithImages) => void
  onFilterChange: (category: Category, value: number | string) => void
  onHeaderClick: (category: Category) => void
  onCaretClick: (category: Category) => void
  selectedId: number
  filter: FilterEntry
  hasFilterRow: boolean
}

export default function Spreadsheet({
  entries,
  onCellClick,
  onFilterChange,
  selectedId,
  filter,
  hasFilterRow,
}: Props) {
  // console.log(selectedId)
  return (
    <div className="">
      <table className="w-full table-fixed">
        <thead className="block">
          {/* <HeaderRow
            filter={filter}
            onHeaderClick={onHeaderClick}
            onCaretClick={onCaretClick}
          /> */}
          <BasicHeaderRow />
        </thead>
        <tbody className="no-scrollbar block max-h-[54rem] overflow-scroll font-normal">
          {hasFilterRow && (
            <FilterRow filter={filter} onFilterChange={onFilterChange} />
          )}
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
