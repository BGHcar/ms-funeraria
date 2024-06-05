import { schema, CustomMessages, rules} from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServicioValidator {
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
    nombre: schema.string({trim: true},[
      rules.maxLength(30),
      rules.required()
    ]),
    precio: schema.number([
      rules.required(),
      rules.range(0,10000000000000)
    ]),
    descripcion: schema.string({trim: true},[
      rules.maxLength(255),
      rules.required(),
    ]),
    duracion: schema.number([
      rules.required(),
      rules.range(0,10000000000000),
    ]),
    sepultura: schema.object.optional().members({
      id: schema.number([rules.exists({ table: 'sepulturas', column: 'id' })]),
    }),
    traslado: schema.object.optional().members({
      id: schema.number([rules.exists({ table: 'traslados', column: 'id' })]),
    }),
    cremacion: schema.object.optional().members({
      id: schema.number([rules.exists({ table: 'cremaciones', column: 'id' })]),
    }),
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
    'nombre.required':'El nombre es requerido',
    'precio.required':'El precio es requerido',
    'descripcion.required':'La descripcion es requerida',
    'duracion.required':'La duracion es requerida',
    'duracion.range':'La duracion debe ser mayor a 0',
    'precio.range':'Como no le vas a cobrar nada?',
    
    
  }
}
