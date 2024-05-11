import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Sede from './Sede'
import Sepultura from './Sepultura'
import Traslado from './Traslado'

export default class Sala extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public capacidad: number

  @column()
  public disponibilidad: boolean

  @column()
  public sede_id: number

  @hasMany(() => Sepultura, {
    foreignKey: 'sala_id'
  })
  public sepulturas: HasMany<typeof Sepultura>

  @hasMany(() => Traslado, {
    foreignKey: 'sala_id'
  })
  public traslados: HasMany<typeof Traslado>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Sede,{
    foreignKey: 'sede_id',
  })
  public sede: BelongsTo<typeof Sede>

}
