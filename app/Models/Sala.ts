import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Sede from './Sede'

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
  public sedes_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Sede,{
    foreignKey: 'sede_id',
  })
  public sede: BelongsTo<typeof Sede>

}
