import { EntryWithImages } from '../../models/entry'

interface Props {
  entry: EntryWithImages
  size: number
}

export default function Gallery({ entry, size }: Props) {
  return (
    <div className="flex justify-center" style={{ height: `${size * 5}rem` }}>
      <div className="flex w-full min-w-0 justify-evenly gap-4 overflow-x-scroll bg-white bg-opacity-25">
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
