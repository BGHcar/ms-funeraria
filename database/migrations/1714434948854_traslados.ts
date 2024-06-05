import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'traslados'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('origen', 255).notNullable()
      table.string('destino', 255).notNullable()
      table.dateTime('fecha_hora').notNullable()
      table.integer('servicio_id').unsigned().nullable().references('id').inTable('servicios').onDelete('CASCADE')      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
