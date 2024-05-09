import { DateTime } from 'luxon'
import { BaseModel, HasMany, HasOne, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Traslado from './Traslado'
import Sepultura from './Sepultura'
import Cremacion from './Cremacion'
import EjecucionServicio from './EjecucionServicio'
import ServicioxPlan from './ServicioxPlan'

export default class Servicio extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre : string

  @column()
  public precio : number

  @column()
  public descripcion : string

  @column()
  public duracion : string

  @hasMany(() => Traslado, {
    foreignKey: 'servicio_id'
  })
  public traslados: HasMany<typeof Traslado>

  @hasOne(() => Sepultura, {
    foreignKey: 'servicio_id'
  })
  public sepultura: HasOne<typeof Sepultura>

  @hasOne(() => Cremacion, {
    foreignKey: 'servicio_id'
  })
  public cremacion: HasOne<typeof Cremacion>
  
  @hasMany(() => EjecucionServicio, {
    foreignKey: 'servicio_id'
  })
  public ejecucionservicios: HasMany<typeof EjecucionServicio>

  @hasMany(() => ServicioxPlan, {
    foreignKey: 'servicio_id'
  })
  public serviciosxplanes: HasMany<typeof ServicioxPlan>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
