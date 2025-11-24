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
    <tr className="flex border-collapse border border-white border-opacity-50 bg-white bg-opacity-25">
      <td className="country filter">
        <input
          className="filter"
          type="text"
          placeholder=""
          name="country"
          id=""
          value={filter.country.value}
          onChange={(e) => handleFilterChange(e)}
        />
      </td>
      <td className="year filter">
        <input
          className="filter"
          type="text"
          placeholder=""
          name="year"
          id=""
          value={filter.year.value}
          onChange={(e) => handleFilterChange(e)}
        />
      </td>
      <td className="artist filter">
        <input
          className="filter"
          type="text"
          placeholder=""
          name="artist"
          id=""
          value={filter.artist.value}
          onChange={(e) => handleFilterChange(e)}
        />
      </td>
      <td className="song filter">
        <input
          className="filter"
          type="text"
          placeholder=""
          name="song"
          id=""
          value={filter.song.value}
          onChange={(e) => handleFilterChange(e)}
        />
      </td>
      <td className="language filter">
        <input
          className="filter"
          type="text"
          placeholder=""
          name="language"
          id=""
          value={filter.language.value}
          onChange={(e) => handleFilterChange(e)}
        />
      </td>
      <td className="position filter">
        <input
          className="filter"
          type="text"
          placeholder=""
          name="position"
          id=""
          value={filter.position.value}
          onChange={(e) => handleFilterChange(e)}
        />
      </td>
      <td className="points filter">
        <input
          className="filter"
          type="text"
          placeholder=""
          name="points"
          id=""
          value={filter.points.value}
          onChange={(e) => handleFilterChange(e)}
        />
      </td>
      <td className="link filter">
        <input
          className="filter"
          type="text"
          placeholder=""
          name="link"
          id=""
          value={filter.link.value}
          onChange={(e) => handleFilterChange(e)}
        />
      </td>
      <td className="costume filter">
        <input
          className="filter"
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
