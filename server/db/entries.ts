import { Entry, EntryData } from '../../models/entry.ts'
import db from './connection.ts'

export async function getAllEntries(): Promise<Entry[]> {
  const entries = await db('entries').select()
  console.log(entries)
  return entries
}

// export async function getEntryById(id: number | string) {
//   const entry = await db('entries').select().first().where({ id })
//   return entry
// }

export async function addEntry(entry: EntryData): Promise<Entry> {
  const addedEntry = await db('entries').insert(entry).returning('*')
  console.log(addedEntry)
  return addedEntry[0]
}

export async function deleteEntry(id: number | string): Promise<Entry> {
  const deletedEntry = await db('entries').where({ id }).delete().returning('*')
  console.log(deletedEntry)
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
  console.log(updatedEntry)
  return updatedEntry[0]
}
