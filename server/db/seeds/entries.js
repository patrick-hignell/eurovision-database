import fs from 'node:fs/promises'
import * as Path from 'node:path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

export async function seed(knex) {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  const json = await fs.readFile(
    Path.resolve(__dirname, '../../../storage/entriesData.json'),
    'utf8',
  )
  const data = JSON.parse(json)
  // Deletes ALL existing entries
  await knex('entries').del()
  //console.log(data.entries)
  // Inserts seed entries
  // data.entries.forEach(async (entry) => await knex('entries').insert(entry))
  for (let i = 0; i < data.entries.length; i += 50) {
    await knex('entries').insert(data.entries.slice(i, i + 50))
  }
}
