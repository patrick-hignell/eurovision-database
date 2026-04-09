import { useState } from 'react'
import { OptionType } from '../../models/entry'
import Select, { SingleValue } from 'react-select'

interface Props {
  handleOptionsClose: () => void
  updateModeChange: (newMode: string) => void
  updateSearchModeChange: (newMode: string) => void
  updateGallerySizeChange: (newSize: number) => void
  updateIconSizeChange: (newSize: number) => void
  handleResetOptions: () => void
}

function Options({
  handleOptionsClose,
  updateModeChange,
  updateSearchModeChange,
  updateGallerySizeChange,
  updateIconSizeChange,
  handleResetOptions,
}: Props) {
  const [mode, setMode] = useState({ value: 'Icons', label: 'Icons' })
  const [gallerySize, setGallerySize] = useState({ value: '5', label: '5' })
  const [iconSize, setIconSize] = useState({ value: '5', label: '5' })
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

  function handleReset() {
    handleResetOptions()
    setMode({ value: 'Icons', label: 'Icons' })
    setGallerySize({ value: '5', label: '5' })
    setIconSize({ value: '5', label: '5' })
    setSearchMode({
      value: 'Basic',
      label: 'Basic',
    })
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-fit w-fit rounded bg-gradient-to-tr from-[#ff9bf5] to-[#57d5d1] px-12 py-4 outline outline-white">
        <h2 className="mb-1 text-2xl">Options</h2>
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
          <p className="mr-6">Gallery Size:</p>
          <Select
            className="w-48"
            options={sizeList}
            value={gallerySize}
            onChange={(e) => handleGallerySizeChange(e)}
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

        <div className="flex items-center justify-between p-4">
          <p className="mr-6">Search Mode:</p>
          <Select
            className="w-48"
            options={searchModeList}
            value={searchMode}
            onChange={(e) => handleSearchModeChange(e)}
          />
        </div>
        <div className="flex justify-evenly">
          <button
            className="mt-3 rounded px-4 py-1 outline outline-white"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            className="mt-3 rounded px-4 py-1 outline outline-white"
            onClick={handleOptionsClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default Options
