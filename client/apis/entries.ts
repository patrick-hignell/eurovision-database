import request from 'superagent'
import { Entry, EntryData, EntryWithImages } from '../../models/entry.ts'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getAllEntries(): Promise<Entry[]> {
  const response = await request.get(`${rootURL}/entries`)
  return response.body as Entry[]
}

export async function getAllEntriesWithImages(): Promise<EntryWithImages[]> {
  const response = await request.get(`${rootURL}/entries/with-images`)
  return response.body as EntryWithImages[]
}

export async function addEntry(entry: EntryData): Promise<Entry> {
  const response = await request.post(`${rootURL}/entries`).send(entry)
  return response.body as Entry
}

export async function editEntry(entry: Entry): Promise<Entry> {
  const response = await request.put(`${rootURL}/entries`).send(entry)
  return response.body as Entry
}

export async function deleteEntry(entry: Entry): Promise<Entry> {
  const response = await request.delete(`${rootURL}/entries`).send(entry)
  return response.body as Entry
}
