import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PagoValidator {
  constructor(protected ctx: HttpContextContract) {}

    /*
    El modelo de pagos tiene la siguiente estructura:

    monto: number
    fecha: DateTime
    suscripcion_id: number

    */
  public schema = schema.create({
    monto: schema.number([
      rules.required(),
    ]),
    fecha: schema.string({trim:true},[
    ]),
    suscripcion_id: schema.number([
      rules.required(),
      rules.exists({table: "suscripciones", column: "id"})
    ]),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'monto.required': 'El monto es requerido',
    'fecha.required': 'La fecha es requerida',
    'suscripcion_id.required': 'La suscripcion es requerida',
    'suscripcion_id.exists': 'La suscripcion no existe'
  }
}
