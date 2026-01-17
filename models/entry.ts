import { SingleValue } from 'react-select'

export interface EntryData {
  id: number
  country: string
  year: number | string
  artist: string
  song: string
  language: string
  position: number | string
  points: number | string
  link: string
  costume: number | string
}

export interface Entry extends EntryData {
  id: number
}

export interface EntryWithImages extends Entry {
  images: string[]
}

export interface Image {
  entryId: number
  image: string
}

export interface FilterEntry {
  country: { isExact: boolean; value: string; dir: string }
  year: { isExact: boolean; value: number | string; dir: string }
  artist: { isExact: boolean; value: string; dir: string }
  song: { isExact: boolean; value: string; dir: string }
  language: { isExact: boolean; value: string; dir: string }
  position: { isExact: boolean; value: number | string; dir: string }
  points: { isExact: boolean; value: number | string; dir: string }
  link: { isExact: boolean; value: string; dir: string }
  costume: { isExact: boolean; value: number | string; dir: string }
}

export type Category =
  | 'country'
  | 'year'
  | 'artist'
  | 'song'
  | 'language'
  | 'position'
  | 'points'
  | 'link'
  | 'costume'

export type SearchStringOptions = 'includes' | 'exact' | 'excludes'

export type SearchNumberOptions =
  | 'includes'
  | 'excact'
  | 'excludes'
  | '>'
  | '>='
  | '<'
  | '<='
export interface SearchCategories {
  all: { options: SearchNumberOptions }
  country: { options: SearchStringOptions }
  year: { options: SearchNumberOptions }
  artist: { options: SearchStringOptions }
  song: { options: SearchStringOptions }
  language: { options: SearchStringOptions }
  position: { options: SearchNumberOptions }
  points: { options: SearchNumberOptions }
  link: { options: SearchStringOptions }
  costume: { options: SearchNumberOptions }
}

export interface OptionType {
  value: string
  label: string
}

export interface SearchArrayElement {
  categoryOption: SingleValue<OptionType>
  functionOption: SingleValue<OptionType>
  searchOption: SingleValue<OptionType>
}

export interface TableOptions {
  tableMode: string
  gallerySize: number
  iconSize: number
}
