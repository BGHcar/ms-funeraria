import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TitularValidator {
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
    apellido: schema.string({trim: true},[
      rules.maxLength(30),
      rules.required()
    ]),
    cedula: schema.string({trim: true},[
      rules.maxLength(15),
      rules.required(),
      rules.unique({table: "titulares", column:"cedula"}),
      rules.regex(/^[0-9]*$/),
    ]),
    telefono: schema.string({trim: true},[
      rules.maxLength(15),
      rules.regex(/^[0-9]*$/),
      rules.required()
    ]),
    cliente_id: schema.number([
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
    'nombre.required':'El nombre es requerido',
    'apellido.required':'El apellido es requerido',
    'cedula.required':'La cedula es requerida',
    'cedula.regex':'La cedula en colombia son solo numeros',
    'telefono.required':"El telefono es requerido",
    'telefono.regex':'El numero telefonico son solo numeros',
    'cliente_id.required':'El cliente es requerido',
  }
}
