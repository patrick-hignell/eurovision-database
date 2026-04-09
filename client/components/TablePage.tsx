import { useEffect, useState } from 'react'
import { useEntriesWithImages } from '../hooks/useEntriesWithImages'
import Spreadsheet from './Spreadsheet'
import {
  Category,
  EntryWithImages,
  FilterEntry,
  SearchArrayElement,
  TableOptions,
} from '../../models/entry'
import InfoPanel from './InfoPanel'
import Gallery from './Gallery'
import IconList from './IconList'
import BasicSearch from './BasicSearch'
import DialogModal from './DialogModal'
import Options from './Options'

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
  const [searchArray, setSearchArray] = useState<SearchArrayElement[]>()
  const [filter, setFilter] = useState<FilterEntry>(initialFilter)
  const [sortCategory, setSortCategory] = useState<Category>('country')
  const [selectedEntry, setSelectedEntry] =
    useState<EntryWithImages>(blankEntry)
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const defaultOptions: TableOptions = {
    tableMode: 'Icons',
    gallerySize: 5,
    iconSize: 5,
    searchMode: 'Basic',
  }
  const [tableOptions, setTableOptions] = useState<TableOptions>(defaultOptions)

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        const filterValueArray = String(filter[option as Category].value).split(
          ';',
        )
        return filterValueArray.every((filterValue) => {
          const filterStringTrim = filterValue.replace(/\s/g, '').toLowerCase()
          const filterString = filterValue.toLowerCase()
          const entryString = String(entry[option as Category]).toLowerCase()
          if (
            filterStringTrim.charAt(0) === '=' &&
            filterStringTrim.length > 1
          ) {
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
          if (
            filterStringTrim.charAt(0) === '>' &&
            filterStringTrim.length > 1
          ) {
            return Number(entryString) > Number(filterStringTrim.slice(1))
          }
          if (
            filterStringTrim.charAt(0) === '<' &&
            filterStringTrim.length > 1
          ) {
            return Number(entryString) < Number(filterStringTrim.slice(1))
          }
          if (filterString.slice(0, 2) === '-=') {
            if (filterString.length === 2) {
              return entryString.length > 0
            }
            return !entryString.includes(filterString.slice(2))
          }

          return entryString.includes(filterString)
        })
      }),
    )
    const postSimpleSearch = postFilteredEntries.filter((entry) =>
      searchArray?.some((searchElement) => {
        if (!searchElement.functionOption) {
          console.log('no function option')
          return true
        }
        if (searchElement.categoryOption?.value === 'all') {
          if (searchElement.functionOption?.value === 'excludes') {
            return Object.keys(entry).every((entryCategory) =>
              checkSearchOption(
                entry[entryCategory as Category],
                searchElement.functionOption?.value as string,
                searchElement.searchOption?.value as string,
              ),
            )
          } else {
            return Object.keys(entry).some((entryCategory) =>
              checkSearchOption(
                entry[entryCategory as Category],
                searchElement.functionOption?.value as string,
                searchElement.searchOption?.value as string,
              ),
            )
          }
        } else if (searchElement.categoryOption) {
          return checkSearchOption(
            entry[searchElement.categoryOption.value as Category],
            searchElement.functionOption?.value as string,
            searchElement.searchOption?.value as string,
          )
        } else {
          console.log('something went wrong')
          return true
        }
      }),
    )

    setEntries([...postSimpleSearch])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preFilteredEntries, searchArray])

  function handleCellClick(entry: EntryWithImages) {
    setSelectedEntry(entry)
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // use 'auto' for an instant jump
    })
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

  function handleSearchArrayChange(newSearchArray: SearchArrayElement[]) {
    setSearchArray(newSearchArray)
  }

  const handleOptionsOpen = () => setIsOptionsOpen(true)
  const handleOptionsClose = () => setIsOptionsOpen(false)

  function handleModeChange(newMode: string) {
    setTableOptions((prevOptions) => {
      return { ...prevOptions, tableMode: newMode }
    })
  }

  function handleSearchModeChange(newMode: string) {
    setTableOptions((prevOptions) => {
      return { ...prevOptions, searchMode: newMode }
    })
  }

  function handleGallerySizeChange(newSize: number) {
    setTableOptions((prevOptions) => {
      return { ...prevOptions, gallerySize: newSize }
    })
  }

  function handleIconSizeChange(newSize: number) {
    setTableOptions((prevOptions) => {
      return { ...prevOptions, iconSize: newSize }
    })
  }

  function handleResetOptions() {
    setTableOptions(defaultOptions)
  }

  if (isPending) return <h2>Is Loading...</h2>
  if (isError) return <h2>{String(error)}</h2>

  return (
    <div className="flex w-5/6 min-w-0 flex-col gap-4 pb-8 pt-8">
      <h1 className="text-3xl font-bold underline">
        Eurovision Costume Database
      </h1>
      <InfoPanel {...selectedEntry} />
      <Gallery entry={selectedEntry} size={tableOptions.gallerySize} />
      <div className="flex justify-around">
        <button onClick={handleOptionsOpen}>
          <i className={`bi bi-gear-fill text-6xl`}></i>
        </button>
      </div>
      <DialogModal isOpen={isOptionsOpen} onClose={handleOptionsClose}>
        <Options
          handleOptionsClose={handleOptionsClose}
          updateModeChange={handleModeChange}
          updateSearchModeChange={handleSearchModeChange}
          updateGallerySizeChange={handleGallerySizeChange}
          updateIconSizeChange={handleIconSizeChange}
          handleResetOptions={handleResetOptions}
        />
      </DialogModal>
      <div className="flex flex-col justify-center">
        {tableOptions.searchMode === 'Basic' && (
          <BasicSearch onSearchArrayChange={handleSearchArrayChange} />
        )}
        {entries && filter && tableOptions.tableMode === 'Spreadsheet' && (
          <Spreadsheet
            entries={entries}
            onCellClick={handleCellClick}
            selectedId={selectedEntry.id}
            onFilterChange={handleFilterChange}
            onHeaderClick={handleHeaderClick}
            onCaretClick={handleCaretClick}
            filter={filter}
            hasFilterRow={tableOptions.searchMode === 'Advanced'}
          />
        )}
        {entries && tableOptions.tableMode === 'Icons' && (
          <IconList
            entries={entries}
            onCellClick={handleCellClick}
            selectedId={selectedEntry.id}
            onFilterChange={handleFilterChange}
            onHeaderClick={handleHeaderClick}
            onCaretClick={handleCaretClick}
            filter={filter}
            size={tableOptions.iconSize}
            hasFilterRow={tableOptions.searchMode === 'Advanced'}
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
  // const numbers = tempEntries.filter(
  //   (entry) => typeof entry[category] === 'number',
  // )
  // const strings = tempEntries.filter(
  //   (entry) => typeof entry[category] === 'string',
  // )

  const numbers = tempEntries.filter((entry) => !isNaN(Number(entry[category])))
  const strings = tempEntries.filter((entry) => isNaN(Number(entry[category])))

  // console.log('number length: ' + numbers.length)
  // console.log('string length: ' + strings.length)

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

  const resortedEntries =
    dir === 'asc' ? [...strings, ...numbers] : [...numbers, ...strings]
  //console.log(resortedEntries)

  return resortedEntries
}

function checkSearchOption(
  entryValue: string | number,
  operation: string,
  searchValue: string | number,
) {
  switch (operation) {
    case 'includes':
      return String(entryValue)
        .toLowerCase()
        .includes(String(searchValue).toLowerCase())
    case 'exact':
      return entryValue == searchValue
    case 'excludes':
      return String(searchValue).length !== 0
        ? !String(entryValue)
            .toLowerCase()
            .includes(String(searchValue).toLowerCase())
        : String(entryValue).length > 0
    case '>':
      return Number(entryValue) > Number(searchValue)
    case '>=':
      return Number(entryValue) >= Number(searchValue)
    case '<':
      return Number(entryValue) < Number(searchValue)
    case '<=':
      return Number(entryValue) <= Number(searchValue)
    default:
      return false
  }
}
