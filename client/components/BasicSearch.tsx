import Select, { SingleValue } from 'react-select'
import { OptionType, SearchArrayElement } from '../../models/entry'
import { ChangeEvent, useEffect, useState } from 'react'
import Switch from 'react-switch'

interface Props {
  onSearchArrayChange: (searchArray: SearchArrayElement[]) => void
  loadFromLocalStorage: () => void
}

function BasicSearch({ onSearchArrayChange, loadFromLocalStorage }: Props) {
  const [searchArray, setSearchArray] = useState<SearchArrayElement[]>(
    () =>
      extractSearchArrayFromUrl() ?? [
        {
          categoryOption: { value: 'all', label: 'All' },
          functionOption: { value: 'includes', label: 'Includes' },
          searchOption: { value: '', label: 'Search' },
          isAnd: false,
        },
      ],
  )
  const searchCategories: OptionType[] = [
    { value: 'all', label: 'All' },
    { value: 'country', label: 'Country' },
    { value: 'year', label: 'Year' },
    { value: 'artist', label: 'Artist' },
    { value: 'song', label: 'Song' },
    { value: 'language', label: 'Language' },
    { value: 'position', label: 'Position' },
    { value: 'points', label: 'Points' },
    { value: 'link', label: 'Link' },
    { value: 'costume', label: 'Costume' },
    { value: 'favourite', label: 'Favourite' },
  ]

  const numberSearchFunctions: OptionType[] = [
    { value: 'includes', label: 'Includes' },
    { value: 'exact', label: 'Exact' },
    { value: 'excludes', label: 'Excludes' },
    { value: '>', label: '>' },
    { value: '>=', label: '>=' },
    { value: '<', label: '<' },
    { value: '<=', label: '<=' },
  ]

  const stringSearchFunctions: OptionType[] = [
    { value: 'includes', label: 'Includes' },
    { value: 'exact', label: 'Exact' },
    { value: 'excludes', label: 'Excludes' },
  ]

  const booleanSearchFunctions: OptionType[] = [
    { value: 'selected', label: 'Selected' },
    { value: 'not selected', label: 'Not Selected' },
  ]

  // const AndOrFunctions: OptionType[] = [
  //   { value: 'true', label: 'And' },
  //   { value: 'false', label: 'Or' },
  // ]

  useEffect(() => {
    onSearchArrayChange(searchArray)
  }, [searchArray])

  function extractSearchArrayFromUrl(): SearchArrayElement[] | null {
    let params = new URLSearchParams(window.location.search)
    if (!params.get('s_count')) {
      params = loadFromLocalStorage() ?? params
    }
    const count = parseInt(params.get('s_count') ?? '0', 10)

    if (!count) return null

    const searchArray: SearchArrayElement[] = []

    for (let i = 0; i < count; i++) {
      const catValue = params.get(`s${i}_cat`)
      const fnValue = params.get(`s${i}_fn`)
      const qValue = params.get(`s${i}_q`)
      const isAnd = params.get(`s${i}_and`)

      if (catValue === null || fnValue === null || qValue === null) return null

      searchArray.push({
        categoryOption: { value: catValue, label: catValue },
        functionOption: { value: fnValue, label: fnValue },
        searchOption: { value: qValue, label: 'Search' },
        isAnd: isAnd !== 'false',
      })
    }

    return searchArray
  }

  function handleCategoryChange(e: SingleValue<OptionType>, index: number) {
    setSearchArray((previousArray) => {
      const updatedArray = [...previousArray]
      updatedArray[index].categoryOption = e
      updatedArray[index].functionOption = {
        value: 'includes',
        label: 'Includes',
      }
      return updatedArray
    })
  }

  function handleFunctionChange(e: SingleValue<OptionType>, index: number) {
    setSearchArray((previousArray) => {
      const updatedArray = [...previousArray]
      updatedArray[index].functionOption = e
      return updatedArray
    })
  }

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>, index: number) {
    setSearchArray((previousArray) => {
      const updatedArray = [...previousArray]
      updatedArray[index].searchOption = {
        value: e.target.value,
        label: 'Search',
      }
      return updatedArray
    })
  }

  function handleIsAndChange(e: boolean, index: number) {
    setSearchArray((previousArray) => {
      const updatedArray = [...previousArray]
      updatedArray[index].isAnd = e
      return updatedArray
    })
  }

  function handleAddSearch() {
    setSearchArray((previousArray) => {
      const updatedArray = [...previousArray]
      updatedArray.push({
        categoryOption: { value: 'all', label: 'All' },
        functionOption: { value: 'includes', label: 'Includes' },
        searchOption: { value: '', label: 'Search' },
        isAnd: false,
      })
      return updatedArray
    })
  }

  function handleRemoveSearch() {
    setSearchArray((previousArray) => {
      const updatedArray = [...previousArray]
      updatedArray.pop()
      updatedArray[updatedArray.length - 1].isAnd = false
      return updatedArray
    })
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col gap-1">
        {searchArray.map((element, index) => (
          <div key={index}>
            <div className="flex items-center gap-2">
              <Select
                className="w-40 lg:w-48"
                options={searchCategories}
                value={searchArray[index].categoryOption}
                onChange={(e) => handleCategoryChange(e, index)}
              />
              <Select
                className="w-40 lg:w-48"
                options={
                  searchArray[index].categoryOption?.value === 'favourite'
                    ? booleanSearchFunctions
                    : searchArray[index].categoryOption?.value === 'country' ||
                        searchArray[index].categoryOption?.value === 'artist' ||
                        searchArray[index].categoryOption?.value === 'song' ||
                        searchArray[index].categoryOption?.value ===
                          'language' ||
                        searchArray[index].categoryOption?.value === 'link'
                      ? stringSearchFunctions
                      : numberSearchFunctions
                }
                value={searchArray[index].functionOption}
                onChange={(e) => handleFunctionChange(e, index)}
              />
              {searchArray[index].categoryOption?.value !== 'favourite' ? (
                <input
                  className="h-9 w-40 rounded-[0.2rem]  p-1 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-black lg:w-48"
                  value={searchArray[index].searchOption?.value}
                  onChange={(e) => handleSearchChange(e, index)}
                />
              ) : (
                <p className="w-40 rounded-[0.2rem] bg-white text-center outline outline-1 outline-gray-300 focus:outline-2  lg:w-48">
                  <i
                    className={`bi bi-${searchArray[index].functionOption?.value === 'selected' ? 'star-fill' : 'star'} text-3xl`}
                  ></i>
                </p>
              )}
            </div>
            {index < searchArray.length - 1 && (
              <div className="h-10 pb-1 pt-2">
                <Switch
                  onChange={(e) => handleIsAndChange(e, index)}
                  checked={searchArray[index].isAnd}
                  onColor={'#ff9bf5'}
                  offColor={'#57d5d1'}
                  checkedIcon={
                    searchArray[index].isAnd ? (
                      <p className=" pl-[0.2rem] pt-[0.1rem] text-center">
                        And
                      </p>
                    ) : (
                      <p></p>
                    )
                  }
                  uncheckedIcon={
                    !searchArray[index].isAnd ? (
                      <p className="pr-[0.4rem] pt-[0.1rem] text-center">Or</p>
                    ) : (
                      <p></p>
                    )
                  }
                  width={70}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-4">
        {searchArray.length > 1 && (
          <button className="text-3xl" onClick={handleRemoveSearch}>
            -
          </button>
        )}
        <button className="text-3xl" onClick={handleAddSearch}>
          +
        </button>
      </div>
    </div>
  )
}

export default BasicSearch
