import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'serviciosxplanes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')


      table.integer('servicio_id').unsigned().references('servicios.id').onDelete('CASCADE').notNullable()
      table.integer('plan_id').unsigned().references('planes.id').onDelete('CASCADE').notNullable()
      /**
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
