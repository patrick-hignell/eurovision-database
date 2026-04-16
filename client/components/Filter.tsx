import Select, { MultiValue, SingleValue } from 'react-select'
import { OptionType, FilterType, Category } from '../../models/entry'

interface Props {
  handleFilterClose: () => void
  filterOptions: FilterType
  handleFilterOptionsFunctionChange: (
    e: SingleValue<OptionType>,
    category: Category,
  ) => void
  handleFilterOptionsMultiChange: (
    e: MultiValue<OptionType>,
    category: Category,
  ) => void
}

export default function Filter({
  handleFilterClose,
  filterOptions,
  handleFilterOptionsFunctionChange,
  handleFilterOptionsMultiChange,
}: Props) {
  const stringSearchFunctions: OptionType[] = [
    { value: 'all', label: 'All' },
    { value: 'multiple', label: 'Multiple' },
    { value: 'search', label: 'Search' },
  ]

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-fit w-fit rounded bg-gradient-to-tr from-[#ff9bf5] to-[#57d5d1] px-4 pb-6 pt-4 outline outline-white">
        <div className="flex w-full flex-row-reverse">
          <button
            className=" h-8  w-8 rounded bg-white bg-opacity-25 outline outline-white"
            onClick={handleFilterClose}
          >
            <i className="bi bi-x text-3xl"></i>
          </button>
        </div>
        <div className="px-12">
          <h2 className="mb-1 text-2xl">Filter</h2>
          <div className="flex items-center gap-2">
            <p className="text-xl">Country: </p>
            <Select
              className="w-48"
              options={stringSearchFunctions}
              value={filterOptions.country.function}
              onChange={(e) => handleFilterOptionsFunctionChange(e, 'country')}
            />
            {filterOptions.country.function.value === 'all' && (
              <input
                className="h-9 w-40 rounded-[0.2rem]  bg-gray-200 p-1 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-black lg:w-48"
                value={''}
              />
            )}
            {filterOptions.country.function.value === 'multiple' && (
              <Select
                isMulti
                classNames={{
                  control: () => 'min-h-[30px] w-96 text-sm', // Force smaller height
                  valueContainer: () => 'p-0 px-2', // Remove vertical padding
                  dropdownIndicator: () => 'p-0 pr-2', // Slim down the arrow container
                  input: () => 'm-0 p-0', // Prevent input from pushing height
                }}
                options={filterOptions.country.multiValue}
                value={filterOptions.country.selectedMultiValue}
                onChange={(e) => handleFilterOptionsMultiChange(e, 'country')}
              />
            )}
            {filterOptions.country.function.value === 'search' && (
              <input
                className="h-9 w-40 rounded-[0.2rem]  p-1 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-black lg:w-48"
                value={''}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
