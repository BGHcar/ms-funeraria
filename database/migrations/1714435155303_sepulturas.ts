import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'sepulturas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('ubicacion', 255).notNullable()
      table.dateTime('fecha_hora').notNullable()

      table.integer('servicio_id').unsigned().nullable().references('id').inTable('servicios').onDelete('CASCADE')
      table.integer('sala_id').unsigned().references('salas.id').notNullable()


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
