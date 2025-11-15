/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('entries', (table) => {
    table.increments('id')
    table.string('country')
    table.string('year')
    table.string('artist')
    table.string('song')
    table.string('language')
    table.string('position')
    table.string('points')
    table.string('link')
    table.string('costume')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('entries')
}
