import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'traslados'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('ciudad_id').unsigned()
                                      .references('ciudads.id')
                                      .notNullable()
      table.string('direccion', 255).notNullable()
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
