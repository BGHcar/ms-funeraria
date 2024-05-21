import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DesplazamientoValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string([ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string([
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    
    id_aeropuerto: schema.number(),
    conductor_id: schema.number([
      rules.required(),
      rules.exists({ table: "conductores", column: "id" })
    ]),
    feretro_id: schema.number([
      rules.required(),
      rules.exists({ table: "feretros", column: "id" })
    ]),
    nombre_aeropuerto: schema.string.optional(),
    fecha: schema.string({ trim: true }, [
      rules.required()
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
    'fecha.required': 'La fecha es requerida',
    'id_aeropuerto.required': 'El aeropuerto es requerido',
    'conductor_id.required': 'El conductor es requerido',
    'conductor_id.exists': 'El conductor no existe',
    'feretro_id.required': 'El feretro es requerido',
    'feretro_id.exists': 'El feretro no existe',
  }
}
