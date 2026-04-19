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
  categories: string[]
  tourHighlight: string
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
  categories,
  tourHighlight,
}: Props) {
  return (
    <div className="flex w-full justify-center">
      <div
        className={`flex w-[99%] flex-col items-center rounded-sm bg-white bg-opacity-${tourHighlight == 'icons' ? '75' : '10'} outline outline-1 outline-white`}
      >
        <div>
          <table className="w-full table-fixed">
            <thead>
              {hasFilterRow && (
                <HeaderRow
                  filter={filter}
                  onHeaderClick={onHeaderClick}
                  onCaretClick={onCaretClick}
                />
              )}
            </thead>
            <tbody className="font-normal">
              {hasFilterRow && (
                <FilterRow filter={filter} onFilterChange={onFilterChange} />
              )}
            </tbody>
          </table>
        </div>
        <div className="flex h-[54rem] w-full flex-wrap content-start justify-center gap-4 overflow-x-hidden overflow-y-scroll py-4">
          {entries.map((entry) => (
            <Icon
              key={entry.id}
              entry={entry}
              onCellClick={onCellClick}
              selected={entry.id == selectedId}
              size={size}
              categories={categories}
            />
          ))}
          {entries.length == 0 && (
            <p>
              No entries currently available. Wait to load or check your filter
              options.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default IconList
