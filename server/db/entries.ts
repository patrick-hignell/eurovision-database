import { Entry, EntryData, Image, EntryWithImages } from '../../models/entry.ts'
import db from './connection.ts'

export async function getAllEntries(): Promise<Entry[]> {
  const entries = await db('entries').select()
  console.log(entries)
  return entries
}

export async function getAllEntriesWithImages(): Promise<EntryWithImages[]> {
  const entryData: Entry[] = await db('entries').select()
  const imageData: Image[] = await db('images').select(
    'entry_id as entryId',
    'image',
  )
  const entries = entryData.map((entry) => {
    return {
      ...entry,
      images: imageData
        .filter((image) => image.entryId === entry.id)
        .map((element) => element.image),
    }
  })
  console.log(entries)
  return entries
}

// export async function getEntryById(id: number | string) {
//   const entry = await db('entries').select().first().where({ id })
//   return entry
// }

export async function addEntry(entry: EntryData): Promise<Entry> {
  const addedEntry = await db('entries').insert(entry).returning('*')
  // console.log(addedEntry)
  return addedEntry[0]
}

export async function deleteEntry(id: number | string): Promise<Entry> {
  const deletedEntry = await db('entries').where({ id }).delete().returning('*')
  // console.log(deletedEntry)
  return deletedEntry[0]
}

export async function updateEntry(
  id: number | string,
  entry: Entry,
): Promise<Entry> {
  const updatedEntry = await db('entries')
    .where({ id })
    .update(entry)
    .returning('*')
  // console.log(updatedEntry)
  return updatedEntry[0]
}
