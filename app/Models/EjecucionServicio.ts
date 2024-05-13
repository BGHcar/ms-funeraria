import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, HasOne, belongsTo, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Cliente from './Cliente'
import Servicio from './Servicio'
import Comentario from './Comentario'
import Chat from './Chat'

export default class EjecucionServicio extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public servicio_id: number

  @column()
  public cliente_id: number

  @column()
  public token: string

  @column()
  public difunto_id: number

  @column()
  public ubicacion: string

  @belongsTo(() => Servicio,{
    foreignKey: 'servicio_id',
  })
  public servicio: BelongsTo<typeof Servicio> 

  @belongsTo(() => Cliente,{
    foreignKey: 'cliente_id',
  })
  public cliente: BelongsTo<typeof Cliente> 

  @hasMany(() => Comentario, {
    foreignKey: 'eservicio_id'
  })
  public comentarios: HasMany<typeof Comentario>

  @hasOne(() => Cliente, {
    foreignKey: 'cliente_id'
  })
  public difunto: HasOne<typeof Cliente>

  @hasOne(() => Chat, {
    foreignKey: 'eservicio_id'
  })
  public chat: HasOne<typeof Chat>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}