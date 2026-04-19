import { useState } from 'react'
import { MultiValue } from 'react-select'
import Select from 'react-select'
import { OptionType } from '../../models/entry'
import { useNavigate } from 'react-router'

export default function QuickStart() {
  const [isAllCountries, setIsAllCountries] = useState('')
  const [selectedCountries, setSelectedCountries] = useState<
    MultiValue<OptionType>
  >([])

  const countryList = [
    { value: 'Andorra', label: 'Andorra' },
    { value: 'Armenia', label: 'Armenia' },
    { value: 'Australia', label: 'Australia' },
    { value: 'Austria', label: 'Austria' },
    { value: 'Azerbaijan', label: 'Azerbaijan' },
    { value: 'Belarus', label: 'Belarus' },
    { value: 'Belgium', label: 'Belgium' },
    { value: 'Bosnia and Herzegovina', label: 'Bosnia and Herzegovina' },
    { value: 'Bulgaria', label: 'Bulgaria' },
    { value: 'Croatia', label: 'Croatia' },
    { value: 'Cyprus', label: 'Cyprus' },
    { value: 'Czechia', label: 'Czechia' },
    { value: 'Denmark', label: 'Denmark' },
    { value: 'Estonia', label: 'Estonia' },
    { value: 'Finland', label: 'Finland' },
    { value: 'France', label: 'France' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Germany', label: 'Germany' },
    { value: 'Greece', label: 'Greece' },
    { value: 'Hungary', label: 'Hungary' },
    { value: 'Iceland', label: 'Iceland' },
    { value: 'Ireland', label: 'Ireland' },
    { value: 'Israel', label: 'Israel' },
    { value: 'Italy', label: 'Italy' },
    { value: 'Latvia', label: 'Latvia' },
    { value: 'Lithuania', label: 'Lithuania' },
    { value: 'Luxembourg', label: 'Luxembourg' },
    { value: 'Malta', label: 'Malta' },
    { value: 'Moldova', label: 'Moldova' },
    { value: 'Monaco', label: 'Monaco' },
    { value: 'Montenegro', label: 'Montenegro' },
    { value: 'Morocco', label: 'Morocco' },
    { value: 'Netherlands', label: 'Netherlands' },
    { value: 'North Macedonia', label: 'North Macedonia' },
    { value: 'Norway', label: 'Norway' },
    { value: 'Poland', label: 'Poland' },
    { value: 'Portugal', label: 'Portugal' },
    { value: 'Romania', label: 'Romania' },
    { value: 'Russia', label: 'Russia' },
    { value: 'San Marino', label: 'San Marino' },
    { value: 'Serbia', label: 'Serbia' },
    { value: 'Serbia and Montenegro', label: 'Serbia and Montenegro' },
    { value: 'Slovakia', label: 'Slovakia' },
    { value: 'Slovenia', label: 'Slovenia' },
    { value: 'Spain', label: 'Spain' },
    { value: 'Sweden', label: 'Sweden' },
    { value: 'Switzerland', label: 'Switzerland' },
    { value: 'Turkey', label: 'Turkey' },
    { value: 'Ukraine', label: 'Ukraine' },
    { value: 'United Kingdom', label: 'United Kingdom' },
    { value: 'Yugoslavia', label: 'Yugoslavia' },
  ]

  const navigate = useNavigate()

  function goToUrl() {
    const params = new URLSearchParams()
    localStorage.clear()
    if (isAllCountries == 'few') {
      params.set(
        `f_country_multi`,
        selectedCountries.map((v: { value: string }) => v.value).join(','),
      )
      params.set(`f_country_fn`, 'multiple')
    }
    navigate(`/table?${params.toString()}`)
  }

  function changeSelectedCountries(e: MultiValue<OptionType>) {
    setSelectedCountries(e)
  }

  function handleNext() {
    goToUrl()
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-fit w-fit rounded bg-gradient-to-tr from-[#ff9bf5] to-[#57d5d1] px-4 pb-6 pt-4 outline outline-white">
        <div className="px-12">
          <h2 className="mb-1 text-2xl">Quick Start</h2>
          <div>
            <p>
              Do you want to see entries from all countries or a select few?
            </p>
            <div className="flex justify-evenly">
              <button
                onClick={() => setIsAllCountries('all')}
                className={`bg-opacity-${isAllCountries == 'all' ? '75' : '25'} my-2 rounded-full bg-white px-2 py-1 outline outline-1 outline-white hover:bg-opacity-75`}
              >
                All Countries
              </button>
              <button
                onClick={() => setIsAllCountries('few')}
                className={`my-2 rounded-full bg-white bg-opacity-${isAllCountries == 'few' ? '75' : '25'} px-2 py-1 outline outline-1 outline-white hover:bg-opacity-75`}
              >
                A Few Countries
              </button>
            </div>
          </div>
          {isAllCountries == 'few' && (
            <div>
              <p>Which countries do you want to see?</p>
              <div className="flex justify-center">
                <Select
                  isMulti
                  className="w-full sm:w-[40rem]"
                  classNames={{
                    control: () => 'min-h-[30px] text-sm', // Force smaller height
                    valueContainer: () => 'p-0 px-2', // Remove vertical padding
                    dropdownIndicator: () =>
                      'p-0 pr-2 max-h-[90px] overflow-y-auto', // Slim down the arrow container
                    input: () => 'm-0 p-0', // Prevent input from pushing height
                  }}
                  styles={{ menu: (base) => ({ ...base, marginTop: 0 }) }}
                  options={countryList}
                  value={selectedCountries}
                  onChange={changeSelectedCountries}
                />
              </div>
            </div>
          )}
          {isAllCountries != '' && (
            <button
              onClick={handleNext}
              className={`mt-6 rounded-full bg-white bg-opacity-${isAllCountries ? '25' : '75'} px-6 py-1 outline outline-1 outline-white hover:bg-opacity-75`}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
