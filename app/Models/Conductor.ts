import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

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
  public usuario_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
