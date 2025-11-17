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
  country: { isExact: boolean; value: string }
  year: { isExact: boolean; value: number | string }
  artist: { isExact: boolean; value: string }
  song: { isExact: boolean; value: string }
  language: { isExact: boolean; value: string }
  position: { isExact: boolean; value: number | string }
  points: { isExact: boolean; value: number | string }
  link: { isExact: boolean; value: string }
  costume: { isExact: boolean; value: number | string }
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
