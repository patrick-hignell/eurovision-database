import { EntryWithImages } from '../../models/entry'

interface Props {
  entry: EntryWithImages
  size: number
}

export default function Gallery({ entry, size }: Props) {
  return (
    <div className="flex justify-center" style={{ height: `${size * 5}rem` }}>
      <div className="flex w-full min-w-0 justify-evenly gap-4 overflow-x-scroll rounded-sm bg-white bg-opacity-25 outline outline-1 outline-white">
        {entry.link != '' && (
          <div className="aspect-video">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${entry.link.split('=')[1]}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        )}
        {entry.link == '' && (
          <div>
            <i
              className="bi bi-card-image text-9xl"
              style={{ fontSize: `${1.6 * size}rem` }}
            ></i>
            <p>No media currently available</p>
          </div>
        )}
        {entry.images.map((image) => (
          <img
            className=""
            key={image}
            alt={image}
            src={`/images/${image}.png`}
          />
        ))}
      </div>
    </div>
  )
}
