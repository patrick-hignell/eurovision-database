import { EntryWithImages } from '../../models/entry'

interface Props {
  entry: EntryWithImages
  onCellClick: (entry: EntryWithImages) => void
  selected: boolean
}

export default function Row({ entry, onCellClick, selected }: Props) {
  function handleCellClick(clickedEntry: EntryWithImages) {
    onCellClick(clickedEntry)
  }

  if (selected) {
    console.log('selected id:' + entry.id)
  }

  return (
    <tr
      className={`border-collapse border border-white border-opacity-50 bg-white bg-opacity-25 ${selected ? `bg-white-200 bg-opacity-60` : ``}`}
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
