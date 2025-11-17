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
