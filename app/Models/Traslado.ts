import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Servicio from './Servicio'
import Ciudad from './Ciudad'

export default class Traslado extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public direccion: string

  @column()
  public ciudad_id: number

  @column()
  public servicio_id: number|null
  
  @belongsTo(() => Servicio,{
    foreignKey: 'servicio_id',
  })
  public servicio: BelongsTo<typeof Servicio>

  @belongsTo(() => Ciudad,{
    foreignKey: 'ciudad_id',
  })
  public ciudad: BelongsTo<typeof Ciudad>
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
