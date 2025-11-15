import { Entry } from '../../models/entry'

interface Props {
  entry: Entry
  onCellClick: (entry: Entry) => void
  selected: boolean
}

export default function Row({ entry, onCellClick, selected }: Props) {
  function handleCellClick(clickedEntry: Entry) {
    onCellClick(clickedEntry)
  }

  if (selected) {
    console.log('selected id:' + entry.id)
  }

  return (
    <tr
      className={`border-collapse border border-white border-opacity-50 bg-white bg-opacity-25 ${selected ? `bg-yellow-200 bg-opacity-50` : ``}`}
    >
      <td onClick={() => handleCellClick(entry)}>{entry.country}</td>
      <td onClick={() => handleCellClick(entry)}>{entry.year}</td>
      <td onClick={() => handleCellClick(entry)}>{entry.artist}</td>
      <td onClick={() => handleCellClick(entry)}>{entry.song}</td>
      <td onClick={() => handleCellClick(entry)}>{entry.language}</td>
      <td onClick={() => handleCellClick(entry)}>{entry.position}</td>
      <td onClick={() => handleCellClick(entry)}>{entry.points}</td>
      <td onClick={() => handleCellClick(entry)}>{entry.link}</td>
      <td onClick={() => handleCellClick(entry)}>{entry.costume}</td>
    </tr>
  )
}
