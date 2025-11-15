export interface Entry {
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

export interface EntryOrUndefined {
  id: number | undefined
  country: string | undefined
  year: number | string | undefined
  artist: string | undefined
  song: string | undefined
  language: string | undefined
  position: number | string | undefined
  points: number | string | undefined
  link: string | undefined
  costume: number | string | undefined
}
