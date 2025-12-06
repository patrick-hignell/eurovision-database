import Select, { SingleValue } from 'react-select'
import { OptionType, SearchArrayElement } from '../../models/entry'
import { ChangeEvent, useEffect, useState } from 'react'

interface Props {
  onSearchArrayChange: (searchArray: SearchArrayElement[]) => void
}

function BasicSearch({ onSearchArrayChange }: Props) {
  const [searchArray, setSearchArray] = useState<SearchArrayElement[]>([
    {
      categoryOption: { value: 'all', label: 'All' },
      functionOption: { value: 'includes', label: 'Includes' },
      searchOption: { value: '', label: 'Search' },
    },
  ])
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

  useEffect(() => {
    onSearchArrayChange(searchArray)
  }, [searchArray])

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

  function handleAddSearch() {
    setSearchArray((previousArray) => {
      const updatedArray = [...previousArray]
      updatedArray.push({
        categoryOption: { value: 'all', label: 'All' },
        functionOption: { value: 'includes', label: 'Includes' },
        searchOption: { value: '', label: 'Search' },
      })
      return updatedArray
    })
  }

  function handleRemoveSearch() {
    setSearchArray((previousArray) => {
      const updatedArray = [...previousArray]
      updatedArray.pop()
      return updatedArray
    })
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col gap-1">
        {searchArray.map((element, index) => (
          <div key={index} className="flex gap-1">
            <Select
              className="w-48"
              options={searchCategories}
              value={searchArray[index].categoryOption}
              onChange={(e) => handleCategoryChange(e, index)}
            />
            <Select
              className="w-48"
              options={
                searchArray[index].categoryOption?.value === 'country' ||
                searchArray[index].categoryOption?.value === 'artist' ||
                searchArray[index].categoryOption?.value === 'song' ||
                searchArray[index].categoryOption?.value === 'language' ||
                searchArray[index].categoryOption?.value === 'link'
                  ? stringSearchFunctions
                  : numberSearchFunctions
              }
              value={searchArray[index].functionOption}
              onChange={(e) => handleFunctionChange(e, index)}
            />
            <input
              className="w-48 rounded-sm p-1"
              value={searchArray[index].searchOption?.value}
              onChange={(e) => handleSearchChange(e, index)}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-4">
        {searchArray.length > 1 && (
          <button onClick={handleRemoveSearch}>-</button>
        )}
        <button onClick={handleAddSearch}>+</button>
      </div>
    </div>
  )
}

export default BasicSearch
