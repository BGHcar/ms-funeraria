import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Servicio from './Servicio'
import Plan from './Plan'

export default class ServicioxPlan extends BaseModel {
  public static table = 'serviciosxplanes'
  @column({ isPrimary: true })
  public id: number

  @column()
  public servicio_id: number

  @column()
  public plan_id: number

  @belongsTo(() => Servicio,{
    foreignKey: 'servicio_id',
  })
  public servicio: BelongsTo<typeof Servicio>

  @belongsTo(() => Plan,{
    foreignKey: 'plan_id',
  })
  public plan: BelongsTo<typeof Plan>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
