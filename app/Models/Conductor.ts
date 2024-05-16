import { DateTime } from 'luxon'
import { BaseModel, ManyToMany, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Feretro from './Feretro'

export default class Conductor extends BaseModel {
  public static table = 'conductores'
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public apellido: string

  @column()
  public cedula: string

  @column()
  public telefono: string

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public user_id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Feretro, {
    pivotTable: 'desplazamientos',
    pivotForeignKey: 'conductor_id',
    pivotRelatedForeignKey: 'feretro_id',
  })
  public feretros: ManyToMany<typeof Feretro>
}
