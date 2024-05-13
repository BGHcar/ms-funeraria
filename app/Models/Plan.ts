import { DateTime } from 'luxon'
import { BaseModel, ManyToMany, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Cliente from './Cliente'
import Servicio from './Servicio'

export default class Plan extends BaseModel {
  public static table = 'planes'
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre : string

  @column()
  public precio : number

  @column()
  public duracion : number

  @column()
  public Nro_Beneficiarios: number

  @column()
  public descuento : number

  @column()
  public precio_final : number

  @column()
  public estado : boolean

  @manyToMany(() => Servicio, {
    pivotTable: 'serviciosxplanes',
    pivotForeignKey: 'plan_id',
    pivotRelatedForeignKey: 'servicio_id'
  })
  public servicios: ManyToMany<typeof Servicio>


  @manyToMany(() => Cliente, {
    pivotTable: 'suscripciones',
    pivotForeignKey: 'plan_id',
    pivotRelatedForeignKey: 'cliente_id'
  })
  public clientes: ManyToMany<typeof Cliente>


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
