import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Administrador from './Administrador'
import Cliente from './Cliente'
import Conductor from './Conductor'
import Titular from './Titular'

export default class Usuario extends BaseModel {

  @column()
  public email:string

  @column()
  public password:string

  @hasOne(() => Administrador)
  public administrador: HasOne<typeof Administrador>

  @hasOne(() => Cliente)
  public cliente: HasOne<typeof Cliente>

  @hasOne(() => Conductor)
  public conductor: HasOne<typeof Conductor>

  @hasOne(() => Titular)
  public titular: HasOne<typeof Titular>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


}
