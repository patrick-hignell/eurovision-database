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
    country: { isExact: false, value: '', dir: 'asc' },
    year: { isExact: false, value: '', dir: 'asc' },
    artist: { isExact: false, value: '', dir: 'asc' },
    song: { isExact: false, value: '', dir: 'asc' },
    language: { isExact: false, value: '', dir: 'asc' },
    position: { isExact: false, value: '', dir: 'asc' },
    points: { isExact: false, value: '', dir: 'asc' },
    link: { isExact: false, value: '', dir: 'asc' },
    costume: { isExact: false, value: '', dir: 'asc' },
  }

  const [onload, setOnLoad] = useState(true)
  const [entries, setEntries] = useState<EntryWithImages[]>([])
  const [preFilteredEntries, setPreFilteredEntries] = useState<
    EntryWithImages[]
  >([])
  const [filter, setFilter] = useState<FilterEntry>(initialFilter)
  const [sortCategory, setSortCategory] = useState<Category>('country')
  const [selectedEntry, setSelectedEntry] =
    useState<EntryWithImages>(blankEntry)

  useEffect(() => {
    if (data) {
      if (onload) {
        setPreFilteredEntries([...data])
        setOnLoad(false)
        // console.log('onload')
      } else {
        const postSortedEntries = sortIt(
          preFilteredEntries,
          sortCategory,
          filter[sortCategory].dir,
        )
        setPreFilteredEntries(postSortedEntries)
      }
    }
  }, [data, filter, sortCategory])

  useEffect(() => {
    const categoryOptions = [
      'country',
      'year',
      'artist',
      'song',
      'language',
      'position',
      'points',
      'link',
      'costume',
    ]
    const postFilteredEntries = preFilteredEntries.filter((entry) =>
      categoryOptions.every((option) => {
        const filterStringTrim = String(filter[option as Category].value)
          .replace(/\s/g, '')
          .toLowerCase()
        const filterString = String(
          filter[option as Category].value,
        ).toLowerCase()
        const entryString = String(entry[option as Category]).toLowerCase()
        if (filterStringTrim.charAt(0) === '=' && filterStringTrim.length > 1) {
          return (
            Number(entryString) === Number(filterStringTrim.slice(1)) ||
            entryString === filterString.slice(1)
          )
        }
        if (
          filterStringTrim.slice(0, 2) === '>=' &&
          filterStringTrim.length > 2
        ) {
          return Number(entryString) >= Number(filterStringTrim.slice(2))
        }
        if (
          filterStringTrim.slice(0, 2) === '<=' &&
          filterStringTrim.length > 2
        ) {
          return Number(entryString) <= Number(filterStringTrim.slice(2))
        }
        if (filterStringTrim.charAt(0) === '>' && filterStringTrim.length > 1) {
          return Number(entryString) > Number(filterStringTrim.slice(1))
        }
        if (filterStringTrim.charAt(0) === '<' && filterStringTrim.length > 1) {
          return Number(entryString) < Number(filterStringTrim.slice(1))
        }
        return entryString.includes(filterString)
      }),
    )

    setEntries([...postFilteredEntries])
  }, [preFilteredEntries])

  function handleCellClick(entry: EntryWithImages) {
    setSelectedEntry(entry)
  }

  function handleFilterChange(category: Category, value: number | string) {
    setFilter({ ...filter, [category]: { ...filter[category], value: value } })
  }

  function handleHeaderClick(category: Category) {
    setSortCategory(category)
  }

  function handleCaretClick(category: Category) {
    const newDir = filter[category].dir === 'asc' ? 'desc' : 'asc'
    setSortCategory(category)
    setFilter({ ...filter, [category]: { ...filter[category], dir: newDir } })
    // console.log({ ...filter, [category]: { ...filter[category], dir: newDir } })
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
            onCellClick={handleCellClick}
            selectedId={selectedEntry.id}
            onFilterChange={handleFilterChange}
            onHeaderClick={handleHeaderClick}
            onCaretClick={handleCaretClick}
            filter={filter}
          />
        )}
      </div>
    </div>
  )
}

function sortIt(
  tempEntries: EntryWithImages[],
  category: Category,
  dir: string,
) {
  const numbers = tempEntries.filter(
    (entry) => typeof entry[category] === 'number',
  )
  const strings = tempEntries.filter(
    (entry) => typeof entry[category] === 'string',
  )

  numbers.sort((a, b) =>
    dir === 'asc'
      ? (a[category] as number) - (b[category] as number)
      : (b[category] as number) - (a[category] as number),
  ) // Sort numbers numerically
  strings.sort((a, b) =>
    dir === 'asc'
      ? (a[category] as string).localeCompare(b[category] as string)
      : (b[category] as string).localeCompare(a[category] as string),
  ) // Sort strings alphabetically

  const resortedEntries = [...numbers, ...strings]
  //console.log(resortedEntries)

  return resortedEntries
}
