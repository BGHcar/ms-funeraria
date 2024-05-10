import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Suscripcion from './Suscripcion'

export default class Pago extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @belongsTo(() => Suscripcion,{
    foreignKey: 'suscripcion_id',
  })
  public suscripcion: BelongsTo<typeof Suscripcion>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
