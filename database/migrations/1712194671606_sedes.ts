import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'sedes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nombre',60).notNullable
      table.string('direccion',60).notNullable
      table.integer('telefono').notNullable
      table.string('correo_electronico',60).notNullable

      //Foreing Key
      table.integer('ciudad_id').unsigned()
                                      .references('ciudads.id')
                                      .notNullable()


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
