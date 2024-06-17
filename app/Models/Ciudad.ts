import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Departamento from './Departamento'
import Sede from './Sede'
import Sepultura from './Sepultura'
import Traslado from './Traslado'
import Cremacion from './Cremacion'

export default class Ciudad extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public departamento_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Departamento,{
    foreignKey: 'departamento_id',
  })
  public departamento: BelongsTo<typeof Departamento>

  @hasMany(() => Sede, {
    foreignKey: 'ciudad_id'
  })
  public sedes: HasMany<typeof Sede>

  @hasMany(() => Sepultura, {
    foreignKey: 'ciudad_id'
  })
  public sepultura: HasMany<typeof Sepultura>

  @hasMany(() => Traslado, {
    foreignKey: 'ciudad_id'
  })
  public traslado: HasMany<typeof Traslado>

  @hasMany(() => Cremacion, {
    foreignKey: 'ciudad_id'
  })
  public cremacion: HasMany<typeof Cremacion>

}
