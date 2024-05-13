import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'titulares'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nombre', 255).notNullable()
      table.string('apellido', 255).notNullable()
      table.string('cedula', 255).notNullable()
      table.integer('edad').notNullable()
      table.string('telefono', 255).notNullable()
      table.boolean("esta_vivo").notNullable()
      table.string('email', 255).notNullable()
      table.string('password', 255).notNullable()

      // foreign key
      table.integer('cliente_id').unsigned()
        .references('clientes.id')
        .onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
