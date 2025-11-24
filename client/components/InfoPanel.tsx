import { Entry } from '../../models/entry'

export default function InfoPanel(entry: Entry) {
  return (
    <div className="">
      {entry.id !== -1 && (
        <div className="flex justify-evenly">
          <p>{entry.country}</p>
          <p>{entry.year}</p>
          <p>{entry.artist}</p>
          <p>{entry.song}</p>
          <p>{entry.language}</p>
          <p>{entry.position}</p>
          <p>{entry.points}</p>
          <p>{entry.link}</p>
          <p>{entry.costume}</p>
        </div>
      )}
    </div>
  )
}
