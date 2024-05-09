import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Ciudad from './Ciudad'
import Sala from './Sala'

export default class Sede extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre : string

  @column()
  public direccion : string

  @column()
  public telefono : number

  @column()
  public correo_electronico : string

  @column()
  public ciudad_id : number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Ciudad,{
    foreignKey: 'ciudad_id',
  })
  public ciudades: BelongsTo<typeof Ciudad>

  @hasMany(() => Sala, {
    foreignKey: 'sede_id'
  })
  public salas: HasMany<typeof Sala>
}
