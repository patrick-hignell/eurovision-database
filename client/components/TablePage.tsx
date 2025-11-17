import { useEffect, useState } from 'react'
import { useEntriesWithImages } from '../hooks/useEntriesWithImages'
import Spreadsheet from './Spreadsheet'
import { EntryWithImages } from '../../models/entry'
import InfoPanel from './InfoPanel'
import Gallery from './Gallery'

export default function TablePage() {
  const {
    data: data,
    isPending,
    isError,
    error,
    //delete: deleteEntry,
    //add: addEntry,
    //edit: editEntry,
  } = useEntriesWithImages()

  const blankEntry: EntryWithImages = {
    id: -1,
    country: '',
    year: '',
    artist: '',
    song: '',
    language: '',
    position: '',
    points: '',
    link: '',
    costume: '',
    images: [],
  }

  const [entries, setEntries] = useState<EntryWithImages[]>([])
  const [selectedEntry, setSelectedEntry] =
    useState<EntryWithImages>(blankEntry)

  useEffect(() => {
    if (data) {
      setEntries([...data])
    }
  }, [data])

  function onCellClick(entry: EntryWithImages) {
    setSelectedEntry(entry)
  }

  if (isPending) return <h2>Is Loading...</h2>
  if (isError) return <h2>{String(error)}</h2>

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Table</h1>
      <InfoPanel {...selectedEntry} />
      <Gallery {...selectedEntry} />
      <div className="flex justify-center">
        {entries && (
          <Spreadsheet
            entries={entries}
            onCellClick={onCellClick}
            selectedId={selectedEntry.id}
          />
        )}
      </div>
    </div>
  )
}
