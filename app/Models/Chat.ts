import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Mensaje from './Mensaje'

export default class Chat extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public chat: string

  @hasMany(() => Mensaje,{
   foreignKey: 'chats_id',
  })
  public mensajes: HasMany<typeof Mensaje>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
