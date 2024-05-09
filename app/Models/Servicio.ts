import { DateTime } from 'luxon'
import { BaseModel, HasMany, HasOne, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Traslado from './Traslado'
import Sepultura from './Sepultura'
import Cremacion from './Cremacion'

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

  @hasMany(() => Traslado)
  public traslados: HasMany<typeof Traslado>

  @hasOne(() => Sepultura)
  public sepultura: HasOne<typeof Sepultura>

  @hasOne(() => Cremacion)
  public cremacion: HasOne<typeof Cremacion>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
