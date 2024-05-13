import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EjecucionservicioValidator {
  constructor(protected ctx: HttpContextContract) { }

  /*
  El modelo de ejecucion_servicios tiene la siguiente estructura:

  cliente_id: number
  servicio_id: number
  */

  public schema = schema.create({
    cliente_id: schema.number([
      rules.required(),
      rules.exists({ table: "clientes", column: "id" })
    ]),
    servicio_id: schema.number([
      rules.required(),
      rules.exists({ table: "servicios", column: "id" })
    ]),
    //El token no lo puede ingresar el usuario
    token: schema.string.optional(),
    difunto_id: schema.number([
      rules.exists({ table: "clientes", column: "id" })
    ]),
    ubicacion: schema.string({ trim: true }, [
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
    'cliente_id.required': 'El cliente es requerido',
    'cliente_id.exists': 'El cliente no existe',
    'servicio_id.exists': 'El servicio no existe',
    'servicio_id.required': 'El servicio es requerido',
    'difunto_id.exists': 'El difunto no existe',
    'ubicacion_id.required': 'La ubicacion es requerida',
  }
}
