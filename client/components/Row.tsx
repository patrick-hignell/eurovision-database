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

  // if (selected) {
  //   console.log('selected id:' + entry.id)
  // }

  return (
    <tr
      className={`flex border-collapse border border-white border-opacity-50 bg-white bg-opacity-25 ${selected ? `bg-white-200 bg-opacity-60` : ``}`}
    >
      <td className="body country" onClick={() => handleCellClick(entry)}>
        {entry.country}
      </td>
      <td className="body year" onClick={() => handleCellClick(entry)}>
        {entry.year}
      </td>
      <td className="body artist" onClick={() => handleCellClick(entry)}>
        {entry.artist}
      </td>
      <td className="body song" onClick={() => handleCellClick(entry)}>
        {entry.song}
      </td>
      <td className="body language" onClick={() => handleCellClick(entry)}>
        {entry.language}
      </td>
      <td className="body position" onClick={() => handleCellClick(entry)}>
        {entry.position}
      </td>
      <td className="body points" onClick={() => handleCellClick(entry)}>
        {entry.points}
      </td>
      <td className="body link" onClick={() => handleCellClick(entry)}>
        {entry.link}
      </td>
      <td className="body costume" onClick={() => handleCellClick(entry)}>
        {entry.costume}
      </td>
    </tr>
  )
}
