import { Link } from 'react-router'
import { EntryWithImages } from '../../models/entry'
import { capitalize } from '../utils/main'

export default function InfoPanelAdaptive(entry: EntryWithImages) {
  const infoDetails = {
    country: entry.country,
    year: entry.year,
    artist: entry.artist,
    song: entry.song,
    language: entry.language,
    position: entry.position,
    points: entry.points,
    costume: entry.costume,
    link: entry.link,
  }

  return (
    <div className="w-full rounded-sm bg-white bg-opacity-25 outline outline-1 outline-white">
      {entry.id == -1 && <p className="text-3xl">Select an entry to begin</p>}
      {entry.id !== -1 && (
        <div className="flex">
          <div>
            {entry.favourite && (
              <p className="grid pl-1 pt-[0.4rem] [grid-template-areas:'overlap']">
                <i className="bi bi-star-fill pl-1 text-3xl text-yellow-400 [grid-area:overlap]"></i>
                <i className="bi bi-star pl-1 text-3xl [grid-area:overlap]"></i>
              </p>
            )}
          </div>
          <div className="flex flex-wrap text-left lg:justify-evenly">
            {Object.entries(infoDetails).map(([category, value]) => (
              <p key={category} className="block px-8 lg:px-16">
                <span className="font-extrabold underline">
                  {capitalize(category)}
                </span>
                {category !== 'link' ? (
                  <span>{`: ${value}`}</span>
                ) : (
                  <span>
                    {': '}
                    <Link
                      className="text-blue-600 underline"
                      to={entry.link}
                      target="_blank"
                    >
                      {entry.link}
                    </Link>
                  </span>
                )}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
