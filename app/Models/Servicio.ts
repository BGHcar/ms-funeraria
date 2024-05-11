import { DateTime } from 'luxon'
import { BaseModel, HasMany, HasOne, ManyToMany, column, hasMany, hasOne, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Traslado from './Traslado'
import Sepultura from './Sepultura'
import Cremacion from './Cremacion'
import EjecucionServicio from './EjecucionServicio'
import ServicioxPlan from './ServicioxPlan'
import Cliente from './Cliente'
import Plan from './Plan'

export default class Servicio extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre : string

  @column()
  public precio : number

  @column()
  public descripcion : string

  @column()
  public duracion : number

  @hasMany(() => Traslado, {
    foreignKey: 'servicio_id'
  })
  public traslados: HasMany<typeof Traslado>

  @hasOne(() => Sepultura, {
    foreignKey: 'servicio_id'
  })
  public sepultura: HasOne<typeof Sepultura>

  @hasOne(() => Cremacion, {
    foreignKey: 'servicio_id'
  })
  public cremacion: HasOne<typeof Cremacion>
  
  @manyToMany(() => Cliente, {
    pivotTable: 'ejecucion_servicios',
    pivotForeignKey: 'servicio_id',
    pivotRelatedForeignKey: 'cliente_id'
  })
  public clientes: ManyToMany<typeof Cliente>

  @manyToMany(() => Plan, {
    pivotTable: 'serviciosxplanes',
    pivotForeignKey: 'servicio_id',
    pivotRelatedForeignKey: 'plan_id'
  })
  public planes: ManyToMany<typeof Plan>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
