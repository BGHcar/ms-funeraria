import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Sede from './Sede'
import Sepultura from './Sepultura'
import Cremacion from './Cremacion'

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

  @hasMany(() => Cremacion, {
    foreignKey: 'sala_id'
  })
  public cremaciones: HasMany<typeof Cremacion>


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Sede,{
    foreignKey: 'sede_id',
  })
  public sede: BelongsTo<typeof Sede>

}
