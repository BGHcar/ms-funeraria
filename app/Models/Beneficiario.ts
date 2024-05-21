import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Titular from './Titular'
import Cliente from './Cliente'

export default class Beneficiario extends BaseModel {
  table = 'beneficiarios'
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public apellido: string

  @column()
  public cedula: string

  @column()
  public edad: number

  @column()
  public telefono: string

  @column()
  public esta_vivo: boolean

  @column()
  public email: string
  
  @column()
  public password: string

  @column()
  public titular_id: number

  @column()
  public cliente_id: number

  @belongsTo(() => Titular,{
    foreignKey: 'titular_id',
  })
  public Titular: BelongsTo<typeof Titular> 

  @belongsTo(() => Cliente,{
    foreignKey: 'cliente_id',
  })
  public Cliente: BelongsTo<typeof Cliente>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
