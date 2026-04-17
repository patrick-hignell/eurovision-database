import Select, { MultiValue, SingleValue } from 'react-select'
import { OptionType, FilterType, Category } from '../../models/entry'
import { ChangeEvent } from 'react'
import {
  capitalize,
  stringSearchFunctions,
  numberSearchFunctions,
  booleanSearchFunctions,
} from '../utils/main'

interface Props {
  filterOptions: FilterType
  handleFilterOptionsFunctionChange: (
    e: SingleValue<OptionType>,
    category: Category,
  ) => void
  handleFilterOptionsMultiChange: (
    e: MultiValue<OptionType>,
    category: Category,
  ) => void
  handleFilterOptionsSearchChange: (
    e: ChangeEvent<HTMLInputElement>,
    category: Category,
  ) => void
}

export default function Filter({
  filterOptions,
  handleFilterOptionsFunctionChange,
  handleFilterOptionsMultiChange,
  handleFilterOptionsSearchChange,
}: Props) {
  function getSearchFunction(str: string) {
    switch (str) {
      case 'year':
      case 'position':
      case 'points':
      case 'costume':
        return numberSearchFunctions
      case 'favourite':
        return booleanSearchFunctions
      default:
        return stringSearchFunctions
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex h-full flex-col gap-2 rounded-sm bg-white bg-opacity-10 p-2 outline outline-1 outline-white">
        {Object.entries(filterOptions).map(([optionKey, optionValue]) => (
          <div key={optionKey} className="flex items-start gap-2">
            <p className="mt-1 w-24 text-left text-xl md:w-28">
              {capitalize(optionKey)}:{' '}
            </p>
            <Select
              className="w-48"
              options={getSearchFunction(optionKey)}
              value={optionValue.function}
              styles={{ menu: (base) => ({ ...base, marginTop: 0 }) }}
              onChange={(e) =>
                handleFilterOptionsFunctionChange(e, optionKey as Category)
              }
            />
            {(optionValue.function.value === 'all' ||
              optionValue.function.value === 'favourites only' ||
              optionValue.function.value === 'non favourites only') && (
              <div className="h-9 w-64 rounded-[0.2rem] bg-gray-200  p-1 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-black lg:w-96" />
            )}
            {optionValue.function.value === 'multiple' && (
              <Select
                isMulti
                classNames={{
                  control: () => 'min-h-[30px] w-64 lg:w-96 text-sm', // Force smaller height
                  valueContainer: () => 'p-0 px-2', // Remove vertical padding
                  dropdownIndicator: () =>
                    'p-0 pr-2 max-h-[90px] overflow-y-auto', // Slim down the arrow container
                  input: () => 'm-0 p-0', // Prevent input from pushing height
                }}
                styles={{ menu: (base) => ({ ...base, marginTop: 0 }) }}
                options={optionValue.multiValue}
                value={optionValue.selectedMultiValue}
                onChange={(e) =>
                  handleFilterOptionsMultiChange(e, optionKey as Category)
                }
              />
            )}
            {optionValue.function.value !== 'all' &&
              optionValue.function.value !== 'multiple' &&
              optionValue.function.value !== 'favourites only' &&
              optionValue.function.value !== 'non favourites only' && (
                <input
                  className="h-9 w-64 rounded-[0.2rem] p-1 outline  outline-1 outline-gray-300 focus:outline-2 focus:outline-black lg:w-96"
                  value={optionValue.search}
                  onChange={(e) =>
                    handleFilterOptionsSearchChange(e, optionKey as Category)
                  }
                />
              )}
          </div>
        ))}
      </div>
    </div>
  )
}
