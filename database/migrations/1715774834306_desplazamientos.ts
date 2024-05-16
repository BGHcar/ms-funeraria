import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'desplazamientos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamp('fecha').notNullable()
      table.integer('id_aeropuerto').notNullable()
      table.string('nombre_aeropuerto').notNullable()


      table.integer('conductor_id').unsigned().references('conductores.id').onDelete('CASCADE')
      table.integer('feretro_id').unsigned().references('feretros.id').onDelete('CASCADE')
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
