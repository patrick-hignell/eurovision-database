import { ChangeEvent, useEffect, useState } from 'react'
import { useEntriesWithImages } from '../hooks/useEntriesWithImages'
import Spreadsheet from './Spreadsheet'
import {
  Category,
  EntryWithImages,
  FilterEntry,
  FilterType,
  OptionType,
  SearchArrayElement,
  TableOptions,
} from '../../models/entry'
import Gallery from './Gallery'
import IconList from './IconList'
import BasicSearch from './BasicSearch'
import DialogModal from './DialogModal'
import Options from './Options'
import Select, { MultiValue } from 'react-select'
import { SingleValue } from 'react-select'
import MediaQuery from 'react-responsive'
import Filter from './Filter'
import {
  capitalize,
  stringSearchFunctions,
  numberSearchFunctions,
  booleanSearchFunctions,
} from '../utils/main'
import InfoPanelAdaptive from './InfoPanelAdaptive'
import Tour from './Tour'

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
    favourite: false,
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
    costume: { isExact: false, value: '', dir: 'desc' },
    favourite: { isExact: false, value: '', dir: 'asc' },
  }

  const defaultFilter: FilterType = {
    country: {
      function: { value: 'all', label: 'All' },
      multiValue: [],
      selectedMultiValue: [],
      search: '',
    },
    year: {
      function: { value: 'all', label: 'All' },
      multiValue: [],
      selectedMultiValue: [],
      search: '',
    },
    artist: {
      function: { value: 'all', label: 'All' },
      multiValue: [],
      selectedMultiValue: [],
      search: '',
    },
    song: {
      function: { value: 'all', label: 'All' },
      multiValue: [],
      selectedMultiValue: [],
      search: '',
    },
    language: {
      function: { value: 'all', label: 'All' },
      multiValue: [],
      selectedMultiValue: [],
      search: '',
    },
    position: {
      function: { value: 'all', label: 'All' },
      multiValue: [],
      selectedMultiValue: [],
      search: '',
    },
    points: {
      function: { value: 'all', label: 'All' },
      multiValue: [],
      selectedMultiValue: [],
      search: '',
    },
    link: {
      function: { value: 'all', label: 'All' },
      multiValue: [],
      selectedMultiValue: [],
      search: '',
    },
    costume: {
      function: { value: 'all', label: 'All' },
      multiValue: [],
      selectedMultiValue: [],
      search: '',
    },
    favourite: {
      function: { value: 'all', label: 'All' },
      multiValue: [],
      selectedMultiValue: [],
      search: '',
    },
  }

  const sortCategories: OptionType[] = [
    { value: 'country', label: 'Country' },
    { value: 'year', label: 'Year' },
    { value: 'artist', label: 'Artist' },
    { value: 'song', label: 'Song' },
    { value: 'language', label: 'Language' },
    { value: 'position', label: 'Position' },
    { value: 'points', label: 'Points' },
    { value: 'costume', label: 'Costume' },
    { value: 'favourite', label: 'Favourite' },
  ]

  const [filterOptions, setFilterOptions] = useState<FilterType>(() =>
    extractFilterOptionsFromUrl(defaultFilter),
  )
  const [onload, setOnLoad] = useState(true)
  const [favourites, setFavourites] = useState<number[]>(() =>
    extractFavouritesFromUrl(),
  )
  const [entries, setEntries] = useState<EntryWithImages[]>([])
  const [preFilteredEntries, setPreFilteredEntries] = useState<
    EntryWithImages[]
  >([])
  const [searchArray, setSearchArray] = useState<SearchArrayElement[]>()
  const [filter, setFilter] = useState<FilterEntry>(initialFilter)
  const [tourHighlight, setTourHighlight] = useState('')
  const [selectedEntry, setSelectedEntry] =
    useState<EntryWithImages>(blankEntry)
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const defaultOptions: TableOptions = {
    tableMode: 'Icons',
    gallerySize: 5,
    iconSize: 5,
    searchMode: 'Filter',
    iconCategories: ['country', 'year', 'artist', 'song', 'favourite'],
  }

  const savedTableState = loadTableStateFromLocalStorage()

  const [tableOptions, setTableOptions] = useState<TableOptions>(
    savedTableState?.tableOptions ?? defaultOptions,
  )
  const [sortOption, setSortOption] = useState<OptionType>(
    savedTableState?.sortOption ?? { value: 'costume', label: 'Costume' },
  )
  const [sortCategory, setSortCategory] = useState<Category>(
    (savedTableState?.sortCategory as Category) ?? 'costume',
  )
  const [isTourOpen, setIsTourOpen] = useState(
    savedTableState?.isTourOpen ?? true,
  )

  useEffect(() => {
    if (data) {
      if (onload) {
        const postSortedEntries = sortIt(
          [...data],
          sortCategory,
          filter[sortCategory].dir,
        )

        postSortedEntries.forEach((entry) => {
          setFilterOptions((prevFilter) => {
            const updatedFilter = prevFilter
            Object.entries(entry).forEach(([key, value]) => {
              if (!updatedFilter[key as Category]) return
              if (
                !updatedFilter[key as Category].multiValue.some(
                  (singleMulti) => singleMulti.value === value,
                )
              ) {
                updatedFilter[key as Category].multiValue = [
                  ...updatedFilter[key as Category].multiValue,
                  { value: value, label: capitalize(value) },
                ]
              }
            })

            Object.keys(updatedFilter).forEach((key) => {
              const numbers = updatedFilter[key as Category].multiValue.filter(
                (singleMulti) => !isNaN(Number(singleMulti.value)),
              )
              const strings = updatedFilter[key as Category].multiValue.filter(
                (singleMulti) => isNaN(Number(singleMulti.value)),
              )

              numbers.sort((a, b) => Number(a.value) - Number(b.value))

              strings.sort((a, b) => a.value.localeCompare(b.value))

              updatedFilter[key as Category].multiValue = [
                ...numbers,
                ...strings,
              ]
            })

            return updatedFilter
          })
        })

        setPreFilteredEntries(postSortedEntries)
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
    const searchWithFavourites = preFilteredEntries.map((entry) => {
      if (favourites.includes(entry.id)) {
        entry.favourite = true
      } else {
        entry.favourite = false
      }

      return entry
    })

    const postFilterOptions = searchWithFavourites.filter((entry) => {
      return Object.entries(filterOptions).every(([key, value]) => {
        if (value.function.value === 'all') {
          return true
        }
        if (value.function.value === 'multiple') {
          return value.selectedMultiValue.length == 0
            ? true
            : value.selectedMultiValue.some(
                (multi: { value: string | number | boolean }) => {
                  return (
                    String(multi.value).toLowerCase() ==
                    String(entry[key as Category]).toLowerCase()
                  )
                },
              )
        }
        if (value.function.value === 'search') {
          return value.search == ''
            ? true
            : checkSearchOption(
                entry[key as Category],
                'includes',
                value.search,
              )
        }

        if (key == 'favourite') {
          return checkSearchOption(
            entry[key as Category],
            value.function.value,
            value.search,
          )
        }

        return value.search == ''
          ? true
          : checkSearchOption(
              entry[key as Category],
              value.function.value,
              value.search,
            )
      })
    })

    setEntries(postFilterOptions)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preFilteredEntries, searchArray, favourites, filterOptions])

  useEffect(() => {
    updateUrl()
    saveToLocalStorage(filterOptions, favourites)
  }, [filterOptions, favourites, tableOptions, sortOption, sortCategory])

  function extractFavouritesFromUrl(): number[] {
    let params = new URLSearchParams(window.location.search)
    if (!params.get('favs') && !params.toString().includes('f_')) {
      params = loadFromLocalStorage() ?? params
    }
    const raw = params.get('favs')
    if (!raw) return []
    return raw
      .split(',')
      .map(Number)
      .filter((n) => !isNaN(n))
  }

  function updateUrl() {
    const params = new URLSearchParams()
    Object.entries(filterOptions).forEach(([key, value]) => {
      if (value.function.value !== 'all') {
        params.set(`f_${key}_fn`, value.function.value)
      }
      if (value.search !== '') {
        params.set(`f_${key}_search`, value.search)
      }
      if (value.selectedMultiValue.length > 0) {
        params.set(
          `f_${key}_multi`,
          value.selectedMultiValue
            .map((v: { value: string }) => v.value)
            .join(','),
        )
      }
    })
    if (favourites.length > 0) {
      params.set('favs', favourites.join(','))
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`
    window.history.pushState({}, '', newUrl)
  }

  function saveToLocalStorage(filterOptions: FilterType, favourites: number[]) {
    const params = new URLSearchParams()
    Object.entries(filterOptions).forEach(([key, value]) => {
      if (value.function.value !== 'all') {
        params.set(`f_${key}_fn`, value.function.value)
      }
      if (value.search !== '') {
        params.set(`f_${key}_search`, value.search)
      }
      if (value.selectedMultiValue.length > 0) {
        params.set(
          `f_${key}_multi`,
          value.selectedMultiValue
            .map((v: { value: string }) => v.value)
            .join(','),
        )
      }
    })
    if (favourites.length > 0) {
      params.set('favs', favourites.join(','))
    }

    params.set('tableOptions', JSON.stringify(tableOptions))
    params.set('sortOption', JSON.stringify(sortOption))
    params.set('sortCategory', sortCategory)
    params.set('isTourOpen', String(isTourOpen))

    localStorage.setItem('eurovision_state', params.toString())
  }

  function loadFromLocalStorage(): URLSearchParams | null {
    const raw = localStorage.getItem('eurovision_state')
    if (!raw) return null
    return new URLSearchParams(raw)
  }

  function loadTableStateFromLocalStorage() {
    const raw = localStorage.getItem('eurovision_state')
    if (!raw) return null
    const params = new URLSearchParams(raw)
    return {
      tableOptions: params.get('tableOptions')
        ? JSON.parse(params.get('tableOptions')!)
        : null,
      sortOption: params.get('sortOption')
        ? JSON.parse(params.get('sortOption')!)
        : null,
      sortCategory: params.get('sortCategory') ?? null,
      isTourOpen: params.get('isTourOpen') ? false : null,
    }
  }

  function extractFilterOptionsFromUrl(defaultFilter: FilterType): FilterType {
    let params = new URLSearchParams(window.location.search)
    if (!params.get('favs') && !params.toString().includes('f_')) {
      params = loadFromLocalStorage() ?? params
    }
    if (!params.toString().includes('f_')) return defaultFilter

    const result = { ...defaultFilter }
    Object.keys(defaultFilter).forEach((key) => {
      const fn = params.get(`f_${key}_fn`)
      const search = params.get(`f_${key}_search`)
      const multi = params.get(`f_${key}_multi`)
      result[key as Category] = {
        ...defaultFilter[key as Category],
        function: fn
          ? getFunction(fn)
          : defaultFilter[key as Category].function,
        search: search ?? '',
        selectedMultiValue: multi
          ? multi.split(',').map((v) => ({ value: v, label: capitalize(v) }))
          : [],
      }
    })
    return result
  }

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

  function handleTourOpen() {
    setIsTourOpen(true)
  }
  const handleTourClose = () => setIsTourOpen(false)

  const handleFilterOpenChange = () => setIsFilterOpen((prev) => !prev)

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

  function handleTourHighlight(highlight: string) {
    setTourHighlight(highlight)
  }

  function handleResetFilter() {
    setFilterOptions((prevFilterOptions) => {
      const newFilterOptions: FilterType = { ...defaultFilter }
      Object.keys(newFilterOptions).forEach((filterKey) => {
        newFilterOptions[filterKey as Category].multiValue =
          prevFilterOptions[filterKey as Category].multiValue
      })
      return newFilterOptions
    })
  }

  function handleIconCategoriesChange(newCategories: string[]) {
    setTableOptions((prevOptions) => {
      return { ...prevOptions, iconCategories: newCategories }
    })
  }

  function handleSortOptionChange(e: SingleValue<OptionType>) {
    e && setSortOption(e)
    e && setSortCategory(e.value as Category)
  }

  function handleStarClick() {
    if (selectedEntry.id != -1) {
      setFavourites((prevFavourites) => {
        return favourites.includes(selectedEntry.id)
          ? favourites.filter((id) => id !== selectedEntry.id)
          : [...prevFavourites, selectedEntry.id]
      })
    }
  }

  function handleFilterOptionsFunctionChange(
    e: SingleValue<OptionType>,
    category: Category,
  ) {
    if (!e) return
    setFilterOptions((prevFilter) => ({
      ...prevFilter,
      [category]: { ...prevFilter[category], function: e },
    }))
  }

  function handleFilterOptionsMultiChange(
    e: MultiValue<OptionType>,
    category: Category,
  ) {
    setFilterOptions((prevFilter) => ({
      ...prevFilter,
      [category]: { ...prevFilter[category], selectedMultiValue: e },
    }))
  }

  function handleFilterOptionsSearchChange(
    e: ChangeEvent<HTMLInputElement>,
    category: Category,
  ) {
    setFilterOptions((prevFilter) => ({
      ...prevFilter,
      [category]: { ...prevFilter[category], search: e.target.value },
    }))
  }

  if (isPending) return <h2>Is Loading...</h2>
  if (isError) return <h2>{String(error)}</h2>

  return (
    <div className="flex min-w-0 flex-col gap-4 overflow-x-hidden pb-8 pt-8 lg:w-5/6">
      <h1 className="mb-3 font-['Delicious_Handrawn'] text-6xl font-normal">
        The Unofficial Eurovision Costume Database
      </h1>
      {/* <MediaQuery minWidth={1224}>
        <InfoPanel {...selectedEntry} />
      </MediaQuery>
      <MediaQuery maxWidth={1224}>
        <InfoPanelSmall {...selectedEntry} />
      </MediaQuery> */}
      <InfoPanelAdaptive {...selectedEntry} />
      {selectedEntry.country != '' && (
        <Gallery entry={selectedEntry} size={tableOptions.gallerySize} />
      )}
      <DialogModal isOpen={isOptionsOpen} onClose={handleOptionsClose}>
        <Options
          handleOptionsClose={handleOptionsClose}
          updateModeChange={handleModeChange}
          updateSearchModeChange={handleSearchModeChange}
          updateGallerySizeChange={handleGallerySizeChange}
          updateIconSizeChange={handleIconSizeChange}
          handleResetOptions={handleResetOptions}
          updateIconCategoriesChange={handleIconCategoriesChange}
          handleTourOpen={handleTourOpen}
        />
      </DialogModal>
      <DialogModal isOpen={isTourOpen} onClose={handleTourClose}>
        <Tour
          handleTourClose={handleTourClose}
          handleTourHighlight={handleTourHighlight}
        />
      </DialogModal>
      {isFilterOpen && (
        <Filter
          filterOptions={filterOptions}
          handleFilterOptionsFunctionChange={handleFilterOptionsFunctionChange}
          handleFilterOptionsMultiChange={handleFilterOptionsMultiChange}
          handleFilterOptionsSearchChange={handleFilterOptionsSearchChange}
          handleResetFilter={handleResetFilter}
        />
      )}
      <div className="flex flex-col justify-center">
        {tableOptions.searchMode === 'Basic' && (
          <div>
            <p className="mb-1 text-2xl font-bold underline">Filter Results</p>
            <BasicSearch
              onSearchArrayChange={handleSearchArrayChange}
              loadFromLocalStorage={loadFromLocalStorage}
            />
          </div>
        )}
        <div className="mb-4 flex w-full justify-between gap-1 px-1">
          <div
            className={`flex gap-1 rounded-full bg-white bg-opacity-${tourHighlight == 'sort' ? '75' : '25'} px-1 pl-1 pr-[0.2rem] pt-[0.1rem] outline outline-1 outline-white hover:bg-opacity-75`}
          >
            <button
              className="flex"
              onClick={() => handleCaretClick(sortCategory)}
            >
              <MediaQuery minWidth={1224}>
                <p className="pt-[0.4rem] text-xl">Sort: </p>
              </MediaQuery>

              <i
                className={`bi bi-sort-${filter[sortCategory].dir == 'asc' ? 'down-alt' : 'up'} pt-[0.1rem] text-4xl`}
              ></i>
            </button>
            <Select
              styles={{
                control: (base) => ({
                  ...base,
                  borderRadius: '9999px', // Tailwind rounded-xl
                  border: '1px solid #d1d5db',
                }),
              }}
              className=" min-w-20 sm:w-40 lg:w-48"
              options={sortCategories}
              value={sortOption}
              onChange={(e) => handleSortOptionChange(e)}
            />
          </div>
          <div
            className={`flex rounded-full bg-white ${isFilterOpen || tourHighlight == 'filter' ? 'bg-opacity-75' : 'bg-opacity-25'} px-1 pt-[0.1rem] outline outline-1 outline-white hover:bg-opacity-75`}
          >
            <button className="flex" onClick={handleFilterOpenChange}>
              <MediaQuery minWidth={1224}>
                <p className="pt-[0.4rem] text-xl">
                  {isFilterOpen ? 'Close' : 'Open'} Filter:{' '}
                </p>
              </MediaQuery>
              <i className="bi bi-funnel-fill pt-1 text-3xl"></i>
            </button>
          </div>
          <div
            className={`flex rounded-full bg-white bg-opacity-${tourHighlight == 'favourite' ? '75' : '25'} px-1 pt-[0.1rem] outline outline-1 outline-white hover:bg-opacity-75`}
          >
            <button className="flex" onClick={handleStarClick}>
              <MediaQuery minWidth={1224}>
                <p className="pr-1 pt-[0.4rem] text-xl">
                  {selectedEntry.favourite ? 'Remove' : 'Add'} Favourite:{' '}
                </p>
              </MediaQuery>
              <i
                className={`bi bi-${selectedEntry.favourite ? 'star' : 'star-fill'} pt-[0.14rem] text-3xl`}
              ></i>
            </button>
          </div>
          <div
            className={`flex rounded-full bg-white bg-opacity-${tourHighlight == 'options' ? '75' : '25'} px-1 pt-[0.1rem] outline outline-1 outline-white hover:bg-opacity-75`}
          >
            <button className="flex" onClick={handleOptionsOpen}>
              <MediaQuery minWidth={1224}>
                <p className="pr-1 pt-[0.4rem] text-xl">Options: </p>
              </MediaQuery>
              <i className="bi bi-gear-fill pt-1 text-3xl"></i>
            </button>
          </div>
        </div>
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
            categories={tableOptions.iconCategories}
            tourHighlight={tourHighlight}
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
  if (category === 'favourite') {
    const sortedBooleans =
      dir === 'asc'
        ? [...tempEntries].sort(
            (a, b) => Number(b[category]) - Number(a[category]),
          )
        : [...tempEntries].sort(
            (a, b) => Number(a[category]) - Number(b[category]),
          )
    return sortedBooleans
  } else {
    const numbers = tempEntries.filter(
      (entry) => !isNaN(Number(entry[category])),
    )
    const strings = tempEntries.filter((entry) =>
      isNaN(Number(entry[category])),
    )

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
}

function checkSearchOption(
  entryValue: string | number | boolean | undefined,
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
    case '=':
      return Number(entryValue) == Number(searchValue)
    case '>':
      return Number(entryValue) > Number(searchValue)
    case '>=':
      return Number(entryValue) >= Number(searchValue)
    case '<':
      return Number(entryValue) < Number(searchValue)
    case '<=':
      return Number(entryValue) <= Number(searchValue)
    case 'favourites only':
      return entryValue === true
    case 'non favourites only':
      return entryValue === false
    default:
      return false
  }
}

function getFunction(fn: string) {
  // Use find() to stop iterating when a match is found and return it
  return (
    stringSearchFunctions.find((element) => element.value == fn) ??
    numberSearchFunctions.find((element) => element.value == fn) ??
    booleanSearchFunctions.find((element) => element.value == fn) ??
    stringSearchFunctions[0]
  )
}
