import { Category, EntryWithImages, FilterEntry } from '../../models/entry'
import FilterRow from './FilterRow'
import HeaderRow from './HeaderRow'
import Icon from './Icon'

interface Props {
  entries: EntryWithImages[]
  onCellClick: (entry: EntryWithImages) => void
  onFilterChange: (category: Category, value: number | string) => void
  onHeaderClick: (category: Category) => void
  onCaretClick: (category: Category) => void
  selectedId: number
  filter: FilterEntry
  size: number
  hasFilterRow: boolean
}

function IconList({
  entries,
  onCellClick,
  onCaretClick,
  onFilterChange,
  onHeaderClick,
  selectedId,
  filter,
  size,
  hasFilterRow,
}: Props) {
  return (
    <div className="flex flex-col items-center">
      <div>
        <table>
          <thead>
            <HeaderRow
              filter={filter}
              onHeaderClick={onHeaderClick}
              onCaretClick={onCaretClick}
            />
          </thead>
          <tbody className="font-normal">
            {hasFilterRow && (
              <FilterRow filter={filter} onFilterChange={onFilterChange} />
            )}
          </tbody>
        </table>
      </div>
      <div className="flex h-[54rem] flex-wrap justify-center gap-4 overflow-scroll py-4">
        {entries.map((entry) => (
          <Icon
            key={entry.id}
            entry={entry}
            onCellClick={onCellClick}
            selected={entry.id == selectedId}
            size={size}
          />
        ))}
      </div>
    </div>
  )
}

export default IconList
