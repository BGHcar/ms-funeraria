import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Pago from './Pago'
import Plan from './Plan'
import Cliente from './Cliente'

export default class Suscripcion extends BaseModel {
  public static table = 'suscripciones'
  @column({ isPrimary: true })
  public id: number

  @column()
  public plan_id: number

  @column()
  public cliente_id: number

  @belongsTo(() => Plan,{
    foreignKey: 'plan_id',
  })
  public plan: BelongsTo<typeof Plan>

  @belongsTo(() => Cliente,{
    foreignKey: 'cliente_id',
  })
  public cliente: BelongsTo<typeof Cliente>

  @hasMany(() => Pago, {
    foreignKey: 'suscripcion_id'
  })
  public planes: HasMany<typeof Pago>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
