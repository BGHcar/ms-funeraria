import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import EjecucionServicio from './EjecucionServicio'

export default class Comentario extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public contenido:string

  @column()
  public Eservicio_id:number

  @belongsTo(() => EjecucionServicio,{
    foreignKey: 'Eservicio_id',
  })
  public EjecucionServicios: BelongsTo<typeof EjecucionServicio>
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
