import { schema, CustomMessages, rules} from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TrasladoValidator {
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
    origen: schema.string({trim: true},[
      rules.maxLength(100),
      rules.required()
    ]),
    destino: schema.string({trim: true},[
      rules.maxLength(100),
      rules.required()
    ]),
    fecha_hora: schema.string({trim: true},[
      rules.required()
    ]),
    
    servicio_id: schema.number([
      rules.required()
    ])
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
    'origen.required':'El origen es necesario',
    'destino.required':'El destino es necesario',
    'fecha_hora.required':'la fecha tiene este formato:AAAA-MM-DDTHH:MM:SS y es requerida',
    'servicio_id.required':'El servicio es requerido',
  }
}
