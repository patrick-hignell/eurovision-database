import { EntryWithImages } from '../../models/entry'

interface Props {
  entry: EntryWithImages
  onCellClick: (entry: EntryWithImages) => void
  selected: boolean
  size: number
  categories: string[]
}

function IconList({
  entry,
  onCellClick,
  selected,
  size = 5,
  categories,
}: Props) {
  function handleCellClick(clickedEntry: EntryWithImages) {
    onCellClick(clickedEntry)
  }

  return (
    <button
      onClick={() => handleCellClick(entry)}
      className={`flex border-collapse flex-col overflow-hidden rounded-lg border border-white border-opacity-50 ${'bg-white'} bg-opacity-25 ${selected ? ` bg-opacity-60` : ``}`}
      // style={{ width: `${3 * size}rem`, height: `${2.6 * size}rem` }}
      style={{ width: `${3 * size}rem` }}
    >
      <div
        className="flex flex-col justify-center overflow-hidden align-middle"
        style={{ height: `${2 * size}rem` }}
      >
        {entry.images[0] ? (
          <img
            src={`/images/${entry.images[0]}.png`}
            alt={entry.images[0]}
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'cover', // or 'contain'
            }}
          />
        ) : (
          <i
            className="bi bi-card-image text-9xl"
            style={{ fontSize: `${1.6 * size}rem` }}
          ></i>
        )}
      </div>
      <div className="flex justify-evenly">
        {categories.includes('favourite') && entry.favourite && (
          <p
            className="overflow-hidden overflow-ellipsis whitespace-nowrap"
            style={{ fontSize: `${0.2 * size}rem` }}
          >
            <i className="bi bi-star-fill text-yellow-600"></i>
          </p>
        )}
        {categories.includes('country') && (
          <p
            className="overflow-hidden overflow-ellipsis whitespace-nowrap"
            style={{ fontSize: `${0.2 * size}rem` }}
          >
            {entry.country}
          </p>
        )}
        {categories.includes('year') && (
          <p
            className="whitespace-nowrap pl-1"
            style={{ fontSize: `${0.2 * size}rem` }}
          >
            {entry.year}
          </p>
        )}
      </div>
      {categories.includes('artist') && (
        <p
          className="overflow-hidden overflow-ellipsis whitespace-nowrap"
          style={{ fontSize: `${0.2 * size}rem` }}
        >
          {entry.artist}
        </p>
      )}
      {categories.includes('song') && (
        <p
          className="overflow-hidden overflow-ellipsis whitespace-nowrap"
          style={{ fontSize: `${0.2 * size}rem` }}
        >
          {entry.song}
        </p>
      )}
      {categories.includes('language') && (
        <p
          className="overflow-hidden overflow-ellipsis whitespace-nowrap"
          style={{ fontSize: `${0.2 * size}rem` }}
        >
          {entry.language}
        </p>
      )}
      {categories.includes('position') && (
        <p
          className="overflow-hidden overflow-ellipsis whitespace-nowrap"
          style={{ fontSize: `${0.2 * size}rem` }}
        >
          Position: {entry.position}
        </p>
      )}
      {categories.includes('points') && (
        <p
          className="overflow-hidden overflow-ellipsis whitespace-nowrap"
          style={{ fontSize: `${0.2 * size}rem` }}
        >
          Points: {entry.points}
        </p>
      )}
      {categories.includes('link') && (
        <p
          className="overflow-hidden overflow-ellipsis whitespace-nowrap"
          style={{ fontSize: `${0.2 * size}rem` }}
        >
          {entry.link}
        </p>
      )}
      {categories.includes('costume') && (
        <p
          className="overflow-hidden overflow-ellipsis whitespace-nowrap"
          style={{ fontSize: `${0.2 * size}rem` }}
        >
          Costume: {entry.costume}
        </p>
      )}
    </button>
  )
}

export default IconList
