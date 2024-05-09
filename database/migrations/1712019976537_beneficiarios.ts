import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'beneficiarios'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nombre', 255).notNullable()
      table.string('apellido', 255).notNullable()
      table.string('cedula', 255).notNullable()
      table.string('telefono', 255).notNullable()

      // foreign key
      table.integer('titular_id').unsigned().references('titulares.id')
                                            .onDelete('CASCADE')
                                            .notNullable

      table.integer('cliente_id').unsigned().references('clientes.id')
                                            .onDelete('CASCADE')
                                            .notNullable

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
