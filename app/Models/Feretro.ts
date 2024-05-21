import { DateTime } from 'luxon'
import { BaseModel, ManyToMany, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Conductor from './Conductor'

export default class Feretro extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public peso: number

  @manyToMany(() => Conductor, {
    pivotTable: 'desplazamientos',
    pivotForeignKey: 'feretro_id',
    pivotRelatedForeignKey: 'conductor_id',
  })
  public conductores: ManyToMany<typeof Conductor>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
