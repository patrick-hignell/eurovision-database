import Select, { SingleValue } from 'react-select'
import { OptionType } from '../../models/entry'
import { useState } from 'react'

function BasicSearch() {
  const [searchArray, setSearchArray] = useState<SingleValue<OptionType>[]>([
    { value: 'all', label: 'All' },
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

  function handleChange(e: SingleValue<OptionType>, index: number) {
    setSearchArray((previousArray) => {
      const updatedArray = [...previousArray]
      updatedArray[index] = e
      return updatedArray
    })
  }

  return (
    <div className="flex">
      {searchArray.map((element, index) => (
        <Select
          key={index}
          options={searchCategories}
          value={searchArray[index]}
          onChange={(e) => handleChange(e, index)}
        />
      ))}
      {searchArray.map((element, index) => (
        <p key={index}>{element?.value}</p>
      ))}
    </div>
  )
}

export default BasicSearch
