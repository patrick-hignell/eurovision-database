import fs from 'node:fs/promises'
import * as Path from 'node:path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

export async function seed(knex) {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  const json = await fs.readFile(
    Path.resolve(__dirname, '../../../storage/imagesData.json'),
    'utf8',
  )
  const data = JSON.parse(json)
  // Deletes ALL existing entries
  await knex('images').del()
  //console.log(data.entries)
  // Inserts seed entries
  // data.entries.forEach(async (entry) => await knex('entries').insert(entry))
  for (let i = 0; i < data.images.length; i += 50) {
    await knex('images').insert(data.images.slice(i, i + 50))
  }
}
