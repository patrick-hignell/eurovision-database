import { Category, FilterEntry } from '../../models/entry'

interface Props {
  onHeaderClick: (category: Category) => void
  onCaretClick: (category: Category) => void
  filter: FilterEntry
}

export default function HeaderRow({
  filter,
  onHeaderClick,
  onCaretClick,
}: Props) {
  function handleHeaderClick(category: Category) {
    onHeaderClick(category)
  }

  function handleCaretClick(category: Category) {
    onCaretClick(category)
  }

  return (
    <tr>
      <th className="min-w-[100px]">
        <button onClick={() => handleHeaderClick('country')}>Country</button>
        <button onClick={() => handleCaretClick('country')}>
          <i
            className={`${filter.country.dir === 'asc' ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'}`}
          ></i>
        </button>
      </th>
      <th className="min-w-[100px]">
        <button onClick={() => handleHeaderClick('year')}>Year</button>
        <button onClick={() => handleCaretClick('year')}>
          <i
            className={`${filter.year.dir === 'asc' ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'}`}
          ></i>
        </button>
      </th>
      <th className="min-w-[221.25px]">
        <button onClick={() => handleHeaderClick('artist')}>Artist</button>
        <button onClick={() => handleCaretClick('artist')}>
          <i
            className={`${filter.artist.dir === 'asc' ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'}`}
          ></i>
        </button>
      </th>
      <th className="min-w-[203.8px]">
        <button onClick={() => handleHeaderClick('song')}>Song</button>
        <button onClick={() => handleCaretClick('song')}>
          <i
            className={`${filter.song.dir === 'asc' ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'}`}
          ></i>
        </button>
      </th>
      <th className="min-w-[257.117px]">
        <button onClick={() => handleHeaderClick('language')}>Language</button>
        <button onClick={() => handleCaretClick('language')}>
          <i
            className={`${filter.language.dir === 'asc' ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'}`}
          ></i>
        </button>
      </th>
      <th className="min-w-[100px]">
        <button onClick={() => handleHeaderClick('position')}>Position</button>
        <button onClick={() => handleCaretClick('position')}>
          <i
            className={`${filter.position.dir === 'asc' ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'}`}
          ></i>
        </button>
      </th>
      <th className="min-w-[100px]">
        <button onClick={() => handleHeaderClick('points')}>Points</button>
        <button onClick={() => handleCaretClick('points')}>
          <i
            className={`${filter.points.dir === 'asc' ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'}`}
          ></i>
        </button>
      </th>
      <th className="min-w-[437.967px]">
        <button onClick={() => handleHeaderClick('link')}>Link</button>
        <button onClick={() => handleCaretClick('link')}>
          <i
            className={`${filter.link.dir === 'asc' ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'}`}
          ></i>
        </button>
      </th>
      <th className="min-w-[100px]">
        <button onClick={() => handleHeaderClick('costume')}>Costume</button>
        <button onClick={() => handleCaretClick('costume')}>
          <i
            className={`${filter.costume.dir === 'asc' ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'}`}
          ></i>
        </button>
      </th>
    </tr>
  )
}
