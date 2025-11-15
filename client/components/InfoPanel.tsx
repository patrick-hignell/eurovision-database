import { Entry } from '../../models/entry'

export default function InfoPanel(entry: Entry) {
  return (
    <div className="">
      {entry.id !== -1 && (
        <div className="flex h-[21rem] justify-evenly">
          <div className="IPLeft flex h-full w-1/3 flex-col justify-evenly">
            <p>{entry.country}</p>
            <p>{entry.year}</p>
            <p>{entry.artist}</p>
          </div>
          <div className="IPMid flex w-1/3 justify-center">
            <iframe
              width="100%"
              src={`https://www.youtube.com/embed/${entry.link.split('=')[1]}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          <div className="IPRight flex w-1/3 flex-col justify-evenly">
            <p>{entry.song}</p>
            <p>{entry.language}</p>
            <p>{entry.position}</p>
            <p>{entry.points}</p>
            <p>{entry.link}</p>
            <p>{entry.costume}</p>
          </div>
        </div>
      )}
    </div>
  )
}
