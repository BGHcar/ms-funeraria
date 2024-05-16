import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Conductor from './Conductor'
import Feretro from './Feretro'

export default class Desplazamiento extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fecha: string

  @column()
  public id_aeropuerto: number

  @column()
  public nombre_aeropuerto: string

  @column()
  public conductor_id: number

  @column()
  public feretro_id: number

  @belongsTo(() => Conductor, {
    foreignKey: 'conductor_id'
  })
  public conductor: BelongsTo<typeof Conductor>

  @belongsTo(() => Feretro, {
    foreignKey: 'feretro_id'
  })
  public feretro: BelongsTo<typeof Feretro>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
