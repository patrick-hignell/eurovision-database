import { EntryWithImages } from '../../models/entry'

export default function Gallery(entry: EntryWithImages) {
  return (
    <div>
      <p>Gallery</p>
      <div className="relative w-full overflow-hidden">
        <div className="flex justify-around overflow-x-scroll">
          {entry.images.map((image) => (
            <img
              className="w-[40rem]"
              key={image}
              alt={image}
              src={`/public/images/${image}.png`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
