import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import ServicioxPlan from './ServicioxPlan'
import Suscripcion from './Suscripcion'

export default class Plan extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre : string

  @column()
  public precio : number

  @column()
  public duracion : number

  @column()
  public descuento : number

  @column()
  public precio_final : number

  @column()
  public estado : boolean

  @hasMany(() => ServicioxPlan, {
    foreignKey: 'plan_id'
  })
  public serviciosxplanes: HasMany<typeof ServicioxPlan>

  @hasMany(() => Suscripcion, {
    foreignKey: 'plan_id'
  })
  public suscripciones: HasMany<typeof Suscripcion>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
