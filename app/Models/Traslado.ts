import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Servicio from './Servicio'

export default class Traslado extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public origen: string

  @column()
  public destino: string

  @column()
  public fecha_hora: string

  @column()
  public servicio_id: number|null
  
  @belongsTo(() => Servicio,{
    foreignKey: 'servicio_id',
  })
  public servicio: BelongsTo<typeof Servicio>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
