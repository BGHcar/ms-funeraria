import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Servicio from './Servicio'
import Sala from './Sala'
import Ciudad from './Ciudad'

export default class Sepultura extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public ciudad_id : number

  @column()
  public fecha_hora : string

  @column()
  public servicio_id: number|null

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

  @belongsTo(() => Ciudad,{
    foreignKey: 'ciudad_id',
  })
  public ciudad: BelongsTo<typeof Ciudad>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
