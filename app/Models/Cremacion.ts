import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Servicio from './Servicio'
import Sala from './Sala'

export default class Cremacion extends BaseModel {
  public static table = 'cremaciones'
  @column({ isPrimary: true })
  public id: number

  @column()
  public ubicacion : string

  @column()
  public fecha_hora : string

  @column()
  public servicio_id: number

  @column()
  public sala_id: number

  @belongsTo(() => Servicio,{
    foreignKey: 'servicio_id',
  })
  public servicio: BelongsTo<typeof Servicio>

  @belongsTo(() => Sala,{
    foreignKey: 'sala_id',
  })
  public sala: BelongsTo<typeof Sala>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
