import { useEffect, useState } from 'react'
import { useEntriesWithImages } from '../hooks/useEntriesWithImages'
import Spreadsheet from './Spreadsheet'
import { Category, EntryWithImages, FilterEntry } from '../../models/entry'
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
  const initialFilter: FilterEntry = {
    country: { isExact: false, value: '' },
    year: { isExact: false, value: '' },
    artist: { isExact: false, value: '' },
    song: { isExact: false, value: '' },
    language: { isExact: false, value: '' },
    position: { isExact: false, value: '' },
    points: { isExact: false, value: '' },
    link: { isExact: false, value: '' },
    costume: { isExact: false, value: '' },
  }

  const [entries, setEntries] = useState<EntryWithImages[]>([])
  const [filter, setFilter] = useState<FilterEntry>(initialFilter)
  const [selectedEntry, setSelectedEntry] =
    useState<EntryWithImages>(blankEntry)

  useEffect(() => {
    if (data) {
      setEntries([...data])
      console.log(entries)
    }
  }, [data])

  // useEffect(() => {
  //   if (data && filter) {
  //     const categoryOptions = [
  //       'country',
  //       'year',
  //       'artist',
  //       'song',
  //       'language',
  //       'position',
  //       'points',
  //       'link',
  //       'costume',
  //     ]
  //     const preFilteredEntries = entries
  //     //console.log('prefiltered entries: ')
  //     //console.log(preFilteredEntries)
  //     const postFilteredEntries = preFilteredEntries.filter((entry) =>
  //       categoryOptions.every((option) =>
  //         String(entry[option as Category])
  //           .toLowerCase()
  //           .includes(String(filter[option as Category].value).toLowerCase()),
  //       ),
  //     )
  //     console.log(entries)
  //     setEntries([...postFilteredEntries])
  //   } else if (data) {
  //     setEntries([...data])
  //     console.log(entries)
  //   }
  // }, [data, filter])

  function onCellClick(entry: EntryWithImages) {
    setSelectedEntry(entry)
  }

  function onFilterChange(category: Category, value: number | string) {
    setFilter({ ...filter, [category]: { ...filter[category], value: value } })
  }

  if (isPending) return <h2>Is Loading...</h2>
  if (isError) return <h2>{String(error)}</h2>

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Table</h1>
      <InfoPanel {...selectedEntry} />
      <Gallery {...selectedEntry} />
      <div className="flex justify-center">
        {entries && filter && (
          <Spreadsheet
            entries={entries}
            onCellClick={onCellClick}
            selectedId={selectedEntry.id}
            onFilterChange={onFilterChange}
            filter={filter}
          />
        )}
      </div>
    </div>
  )
}
