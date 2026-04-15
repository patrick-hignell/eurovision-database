import { useState } from 'react'
import { OptionType } from '../../models/entry'
import Select, { MultiValue, SingleValue } from 'react-select'

interface Props {
  handleOptionsClose: () => void
  updateModeChange: (newMode: string) => void
  updateSearchModeChange: (newMode: string) => void
  updateGallerySizeChange: (newSize: number) => void
  updateIconSizeChange: (newSize: number) => void
  handleResetOptions: () => void
  updateIconCategoriesChange: (newCategories: string[]) => void
}

function Options({
  handleOptionsClose,
  updateModeChange,
  updateSearchModeChange,
  updateGallerySizeChange,
  updateIconSizeChange,
  handleResetOptions,
  updateIconCategoriesChange,
}: Props) {
  const [mode, setMode] = useState({ value: 'Icons', label: 'Icons' })
  const [gallerySize, setGallerySize] = useState({ value: '5', label: '5' })
  const [iconSize, setIconSize] = useState({ value: '5', label: '5' })

  const defaultCategories: MultiValue<OptionType> = [
    { value: 'country', label: 'Country' },
    { value: 'year', label: 'Year' },
    { value: 'artist', label: 'Artist' },
    { value: 'song', label: 'Song' },
    { value: 'favourite', label: 'Favourite' },
  ]
  const [iconCategories, setIconCategories] =
    useState<MultiValue<OptionType>>(defaultCategories)
  const [searchMode, setSearchMode] = useState({
    value: 'Basic',
    label: 'Basic',
  })

  const modeList: OptionType[] = [
    { value: 'Icons', label: 'Icons' },
    { value: 'Spreadsheet', label: 'Spreadsheet' },
  ]

  const sizeList: OptionType[] = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
  ]

  const searchModeList: OptionType[] = [
    { value: 'Basic', label: 'Basic' },
    { value: 'Advanced', label: 'Advanced' },
  ]

  const categoryList: OptionType[] = [
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

  function handleModeChange(e: SingleValue<OptionType>) {
    e && setMode(e)
    e && updateModeChange(e.value)
  }

  function handleSearchModeChange(e: SingleValue<OptionType>) {
    e && setSearchMode(e)
    e && updateSearchModeChange(e.value)
  }

  function handleGallerySizeChange(e: SingleValue<OptionType>) {
    e && setGallerySize(e)
    e && updateGallerySizeChange(Number(e.value))
  }

  function handleIconSizeChange(e: SingleValue<OptionType>) {
    e && setIconSize(e)
    e && updateIconSizeChange(Number(e.value))
  }

  function handleIconCategoriesChange(e: MultiValue<OptionType>) {
    e && setIconCategories(e)
    e && updateIconCategoriesChange(e.map((category) => category.value))
  }

  function handleReset() {
    handleResetOptions()
    setMode({ value: 'Icons', label: 'Icons' })
    setGallerySize({ value: '5', label: '5' })
    setIconSize({ value: '5', label: '5' })
    setSearchMode({
      value: 'Basic',
      label: 'Basic',
    })
    setIconCategories(defaultCategories)
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-fit w-fit rounded bg-gradient-to-tr from-[#ff9bf5] to-[#57d5d1] px-4 pb-6 pt-4 outline outline-white">
        <div className="flex w-full flex-row-reverse">
          <button
            className=" h-8  w-8 rounded bg-white bg-opacity-25 outline outline-white"
            onClick={handleOptionsClose}
          >
            <i className="bi bi-x text-3xl"></i>
          </button>
        </div>
        <div className="px-12">
          <h2 className="mb-1 text-2xl">Options</h2>

          <div className="flex items-center justify-between p-4">
            <p className="mr-6">Gallery Size:</p>
            <Select
              className="w-48"
              options={sizeList}
              value={gallerySize}
              onChange={(e) => handleGallerySizeChange(e)}
            />
          </div>

          <div className="flex items-center justify-between p-4">
            <p className="mr-6">Search Mode:</p>
            <Select
              className="w-48"
              options={searchModeList}
              value={searchMode}
              onChange={(e) => handleSearchModeChange(e)}
            />
          </div>

          <div className="flex items-center justify-between p-4">
            <p className="mr-6">Display Mode:</p>
            <Select
              className="w-48"
              options={modeList}
              value={mode}
              onChange={(e) => handleModeChange(e)}
            />
          </div>

          <div className="flex items-center justify-between p-4">
            <p className="mr-6">Icon Size:</p>
            <Select
              className="w-48"
              options={sizeList}
              value={iconSize}
              onChange={(e) => handleIconSizeChange(e)}
            />
          </div>

          <div className="g-2 flex-col items-center justify-between p-4">
            <p className="mb-4 text-left">Icon Categories:</p>
            <Select
              isMulti
              classNames={{
                control: () => 'min-h-[30px] w-96 text-sm', // Force smaller height
                valueContainer: () => 'p-0 px-2', // Remove vertical padding
                dropdownIndicator: () => 'p-0 pr-2', // Slim down the arrow container
                input: () => 'm-0 p-0', // Prevent input from pushing height
              }}
              options={categoryList}
              value={iconCategories}
              onChange={(e) => handleIconCategoriesChange(e)}
            />
          </div>

          <div className="flex justify-evenly">
            <button
              className="mt-3 rounded bg-white bg-opacity-25 px-4 py-1 outline outline-white"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Options
