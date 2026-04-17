import { OptionType } from '../../models/entry'

export const stringSearchFunctions: OptionType[] = [
  { value: 'all', label: 'All' },
  { value: 'multiple', label: 'Select Multiple' },
  { value: 'search', label: 'Search' },
]

export const numberSearchFunctions: OptionType[] = [
  { value: 'all', label: 'All' },
  { value: 'multiple', label: 'Select Multiple' },
  { value: 'search', label: 'Search' },
  { value: '>', label: 'Greater Than' },
  { value: '<', label: 'Less Than' },
  { value: '>=', label: 'At Least' },
  { value: '<=', label: 'At Most' },
]

export const booleanSearchFunctions: OptionType[] = [
  { value: 'all', label: 'All' },
  { value: 'favourites only', label: 'Favourites Only' },
  { value: 'non favourites only', label: 'Non Favourites Only' },
]

export function capitalize(str: string | number | boolean) {
  // if (typeof str !== "string") return  str
  return str.toString().charAt(0).toUpperCase() + str.toString().slice(1)
}
