import { DateTime } from 'luxon'
import { BaseModel, HasMany, HasOne, ManyToMany, column, hasMany, hasOne, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Titular from './Titular'
import Beneficiario from './Beneficiario'
import Servicio from './Servicio'
import Plan from './Plan'

export default class Cliente extends BaseModel {
  table = 'clientes'
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
<<<<<<< HEAD
=======
  public apellido: string

  @column()
  public cedula: string

  @column()
  public edad: number

  @column()
  public telefono: string

  @column()
  public esta_vivo: boolean = true

  @column()
>>>>>>> 9beeefc82ba770705eb3f6f4dde7b15850c97785
  public email: string
  
  @column()
  public password: string

  @column()
  public user_id: string

  @hasOne(() => Titular, {
    foreignKey: 'cliente_id'
  })
  public titular: HasOne<typeof Titular>

  @hasMany(() => Beneficiario, {
    foreignKey: 'cliente_id'
  })
  public beneficiarios: HasMany<typeof Beneficiario>

  @manyToMany(() => Servicio, {
    pivotTable: 'ejecucion_servicios',
    pivotForeignKey: 'cliente_id',
    pivotRelatedForeignKey: 'servicio_id'
  })
  public servicios: ManyToMany<typeof Servicio>


  @manyToMany(() => Plan, {
    pivotTable: 'suscripciones',
    pivotForeignKey: 'cliente_id',
    pivotRelatedForeignKey: 'plan_id'
  })
  public planes: ManyToMany<typeof Plan>

  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
