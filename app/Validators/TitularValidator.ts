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
    ]),
    edad: schema.number([
      rules.required(),
      rules.range(0,150),
    ]),
    telefono: schema.string({trim: true},[
      rules.maxLength(15),
    ]),
    esta_vivo: schema.boolean([
      rules.required(),
    ]),
    email: schema.string({trim: true},[
      rules.required(),
      rules.email(),
      rules.unique({table: "titulares", column:"email"}),
    ]),
    password: schema.string({trim: true},[
      rules.minLength(8),
      rules.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)  // Esta expresion regular valida que la contraseña tenga al menos 8 caracteres, una mayuscula, una minuscula y un numero
    ]),
    cliente_id: schema.number.optional([
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
    'email.required':'El email es requerido',
    'email.email':'El email no es valido',
    'password.required':'La contraseña es requerida',
    'password.minLength':'La contraseña debe tener al menos 8 caracteres',
    'password.regex':'La contraseña debe tener al menos una mayuscula, una minuscula y un numero',
    'edad.required':'La edad es requerida',
    'edad.range':'La edad no puede ser negativa',
    'esta_vivo.required':'El estado de vida es requerido',
  }
}
