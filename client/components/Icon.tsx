import { EntryWithImages } from '../../models/entry'

interface Props {
  entry: EntryWithImages
  onCellClick: (entry: EntryWithImages) => void
  selected: boolean
}

function IconList({ entry, onCellClick, selected }: Props) {
  function handleCellClick(clickedEntry: EntryWithImages) {
    onCellClick(clickedEntry)
  }

  return (
    <button
      onClick={() => handleCellClick(entry)}
      className={`h-50 w-60 border-collapse border border-white border-opacity-50 bg-white bg-opacity-25 ${selected ? `bg-white-200 bg-opacity-60` : ``}`}
    >
      <div className="flex h-[133.95px] flex-col justify-center overflow-hidden align-middle">
        {entry.images[0] ? (
          <img
            className="flex"
            src={`/images/${entry.images[0]}.png`}
            alt={entry.images[0]}
          />
        ) : (
          <i className="bi bi-card-image text-9xl"></i>
        )}
      </div>
      <p>{entry.country}</p>
      <p>{entry.year}</p>
    </button>
  )
}

export default IconList
