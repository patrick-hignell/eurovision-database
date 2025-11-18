import { Category, FilterEntry } from '../../models/entry.ts'

interface Props {
  filter: FilterEntry
  onFilterChange: (category: Category, value: number | string) => void
}
const FilterRow = ({ filter, onFilterChange }: Props) => {
  function handleFilterChange(event: React.ChangeEvent<HTMLInputElement>) {
    onFilterChange(event.target.name as Category, event.target.value)
    // console.log(event.target.name, event.target.value)
  }

  return (
    <tr className="border-collapse border border-white border-opacity-50 bg-white bg-opacity-25">
      <td>
        <input
          className="country filter"
          type="text"
          placeholder=""
          name="country"
          id=""
          value={filter.country.value}
          onChange={(e) => handleFilterChange(e)}
        />
      </td>
      <td>
        <input
          className="year filter"
          type="text"
          placeholder=""
          name="year"
          id=""
          value={filter.year.value}
          onChange={(e) => handleFilterChange(e)}
        />
      </td>
      <td>
        <input
          className="artist filter"
          type="text"
          placeholder=""
          name="artist"
          id=""
          value={filter.artist.value}
          onChange={(e) => handleFilterChange(e)}
        />
      </td>
      <td>
        <input
          className="song filter"
          type="text"
          placeholder=""
          name="song"
          id=""
          value={filter.song.value}
          onChange={(e) => handleFilterChange(e)}
        />
      </td>
      <td>
        <input
          className="language filter"
          type="text"
          placeholder=""
          name="language"
          id=""
          value={filter.language.value}
          onChange={(e) => handleFilterChange(e)}
        />
      </td>
      <td>
        <input
          className="position filter"
          type="text"
          placeholder=""
          name="position"
          id=""
          value={filter.position.value}
          onChange={(e) => handleFilterChange(e)}
        />
      </td>
      <td>
        <input
          className="points filter"
          type="text"
          placeholder=""
          name="points"
          id=""
          value={filter.points.value}
          onChange={(e) => handleFilterChange(e)}
        />
      </td>
      <td>
        <input
          className="link filter"
          type="text"
          placeholder=""
          name="link"
          id=""
          value={filter.link.value}
          onChange={(e) => handleFilterChange(e)}
        />
      </td>
      <td>
        <input
          className="costume filter"
          type="text"
          placeholder=""
          name="costume"
          id=""
          value={filter.costume.value}
          onChange={(e) => handleFilterChange(e)}
        />
      </td>
    </tr>
  )
}

export default FilterRow
