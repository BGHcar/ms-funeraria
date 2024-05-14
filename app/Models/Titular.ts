import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Beneficiario from './Beneficiario'

export default class Titular extends BaseModel {
  public static table = 'titulares'
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
  public esta_vivo: boolean = true

  @column()
  public email: string
  
  @column()
  public password: string

  @column()
  public cliente_id: number


  @hasMany(() => Beneficiario, {
    foreignKey: 'titular_id'
  })
  public Beneficiarios: HasMany<typeof Beneficiario>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
