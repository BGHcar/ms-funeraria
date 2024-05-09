import { DateTime } from 'luxon'
import { BaseModel, HasMany, HasOne, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Titular from './Titular'
import Beneficiario from './Beneficiario'
import EjecucionServicio from './EjecucionServicio'
import Suscripcion from './Suscripcion'

export default class Cliente extends BaseModel {
  table = 'clientes'
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public apellido: string

  @column()
  public cedula: string

  @column()
  public telefono: string

  @column()
  public email: string

  @column()
  public usuario_id: number

  @hasOne(() => Titular, {
    foreignKey: 'cliente_id'
  })
  public titular: HasOne<typeof Titular>

  @hasMany(() => Beneficiario, {
    foreignKey: 'cliente_id'
  })
  public beneficiarios: HasMany<typeof Beneficiario>

  @hasMany(() => EjecucionServicio, {
    foreignKey: 'cliente_id'
  })
  public ejecucionservicios: HasMany<typeof EjecucionServicio>

  @hasMany(() => Suscripcion, {
    foreignKey: 'cliente_id'
  })
  public suscripciones: HasMany<typeof Suscripcion>

  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
