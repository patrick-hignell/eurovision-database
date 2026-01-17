import { EntryWithImages } from '../../models/entry'

interface Props {
  entry: EntryWithImages
  onCellClick: (entry: EntryWithImages) => void
  selected: boolean
  size: number
}

function IconList({ entry, onCellClick, selected, size = 5 }: Props) {
  function handleCellClick(clickedEntry: EntryWithImages) {
    onCellClick(clickedEntry)
  }

  return (
    <button
      onClick={() => handleCellClick(entry)}
      className={`flex border-collapse flex-col overflow-hidden rounded-lg border border-white border-opacity-50 bg-white bg-opacity-25 ${selected ? `bg-white-200 bg-opacity-60` : ``}`}
      style={{ width: `${3 * size}rem`, height: `${2.6 * size}rem` }}
    >
      <div className="flex h-[65%] flex-col justify-center overflow-hidden align-middle">
        {entry.images[0] ? (
          <img
            className="flex"
            src={`/images/${entry.images[0]}.png`}
            alt={entry.images[0]}
          />
        ) : (
          <i
            className="bi bi-card-image text-9xl"
            style={{ fontSize: `${1.6 * size}rem` }}
          ></i>
        )}
      </div>
      <p
        className="overflow-hidden overflow-ellipsis whitespace-nowrap"
        style={{ fontSize: `${0.2 * size}rem` }}
      >
        {entry.year}
      </p>
      <p
        className="overflow-hidden overflow-ellipsis whitespace-nowrap"
        style={{ fontSize: `${0.2 * size}rem` }}
      >
        {entry.country}
      </p>
      {/* <p className="overflow-hidden overflow-ellipsis whitespace-nowrap"
      style={{ fontSize: `${1.6 * size}rem` }}>
        {entry.artist}
      </p> */}
      <p
        className="overflow-hidden overflow-ellipsis whitespace-nowrap"
        style={{ fontSize: `${0.2 * size}rem` }}
      >
        {entry.song}
      </p>
    </button>
  )
}

export default IconList
