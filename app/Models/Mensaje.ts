import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Mensaje extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public mensajes: string
  @column()
  public chats_id: number
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
