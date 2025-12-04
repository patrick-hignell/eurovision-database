import Select, { SingleValue } from 'react-select'
import { OptionType } from '../../models/entry'
import { useState } from 'react'

interface SearchArrayElement {
  categoryOption: SingleValue<OptionType>
  functionOption: SingleValue<OptionType>
}

function BasicSearch() {
  const [searchArray, setSearchArray] = useState<SearchArrayElement[]>([
    {
      categoryOption: { value: 'all', label: 'All' },
      functionOption: { value: 'includes', label: 'Includes' },
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
    { value: 'Excludes', label: 'Excludes' },
    { value: '>', label: '>' },
    { value: '>=', label: '>=' },
    { value: '<', label: '<' },
    { value: '<=', label: '<=' },
  ]

  const stringSearchFunctions: OptionType[] = [
    { value: 'includes', label: 'Includes' },
    { value: 'exact', label: 'Exact' },
    { value: 'Excludes', label: 'Excludes' },
  ]

  const searchStringOptions: string[] = ['includes', 'exact', 'excludes']

  const searchNumberOptions: string[] = [
    'includes',
    'exact',
    'excludes',
    '>',
    '>=',
    '<',
    '<=',
  ]

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

  return (
    <div className="flex w-fit flex-col">
      <div className="flex">
        {searchArray.map((element, index) => (
          <div key={index} className="flex">
            <Select
              options={searchCategories}
              value={searchArray[index].categoryOption}
              onChange={(e) => handleCategoryChange(e, index)}
            />
            <Select
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
          </div>
        ))}
        {searchArray.map((element, index) => (
          <p key={index}>
            {element?.categoryOption?.value} {element?.functionOption?.value}
          </p>
        ))}
      </div>
      <button>+</button>
    </div>
  )
}

export default BasicSearch
