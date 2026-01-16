import { useState } from 'react'
import { OptionType } from '../../models/entry'
import Select, { SingleValue } from 'react-select'

interface Props {
  handleOptionsClose: () => void
  updateModeChange: (newMode: string) => void
}

function Options({ handleOptionsClose, updateModeChange }: Props) {
  const [mode, setMode] = useState({ value: 'Icons', label: 'Icons' })

  const modeList: OptionType[] = [
    { value: 'Icons', label: 'Icons' },
    { value: 'Spreadsheet', label: 'Spreadsheet' },
  ]

  function handleModeChange(e: SingleValue<OptionType>) {
    e && setMode(e)
    e && updateModeChange(e.value)
  }
  return (
    <div className="m-4 rounded bg-white p-12">
      <h2>Options</h2>
      <div className="flex p-4">
        <p className="mr-6">Display Mode:</p>
        <Select
          className="w-48"
          options={modeList}
          value={mode}
          onChange={(e) => handleModeChange(e)}
        />
      </div>

      <button
        className="rounded outline outline-black"
        onClick={handleOptionsClose}
      >
        Close Dialog
      </button>
    </div>
  )
}

export default Options
