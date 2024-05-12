import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ConductorValidator {
  constructor(protected ctx: HttpContextContract) {}

    /*
    El modelo de conductores tiene la siguiente estructura:

    nombre: string
    apellido: string
    cedula: string
    telefono: string
    email: string
    password: string
    user_id: string

    */
  public schema = schema.create({
    nombre: schema.string({trim: true},[
      rules.maxLength(20),
      rules.required(),
      rules.minLength(3)
    ]),
    //el apellido es opcional
    apellido: schema.string.optional({trim: true},[
      rules.maxLength(20),
      rules.minLength(3)
    ]),
    cedula: schema.string({trim: true},[
      rules.maxLength(15),
      rules.required(),
      rules.unique({table: "conductores", column:"cedula"}),
      rules.minLength(7)
    ]),
    telefono: schema.string({trim: true},[
      rules.maxLength(15),
      rules.minLength(7)
    ]),
    email: schema.string({trim: true},[
      rules.required(),
      rules.email(),
      rules.unique({table: "conductores", column:"email"}),
    ]),
    password: schema.string({trim: true},[
      rules.required(),
      rules.minLength(8),
      rules.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)  // Esta expresion regular valida que la contraseña tenga al menos 8 caracteres, una mayuscula, una minuscula y un numero
    ]),
    user_id: schema.string({trim: true},[
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
    'nombre.required': 'El nombre es requerido',
    'nombre.maxLength': 'El nombre no puede tener mas de 20 caracteres',
    'nombre.minLength': 'El nombre no puede tener menos de 3 caracteres',
    'apellido.maxLength': 'El apellido no puede tener mas de 20 caracteres',
    'apellido.minLength': 'El apellido no puede tener menos de 3 caracteres',
    'cedula.required': 'La cedula es requerida',
    'cedula.maxLength': 'La cedula no puede tener mas de 15 caracteres',
    'cedula.minLength': 'La cedula no puede tener menos de 7 caracteres',
    'telefono.maxLength': 'El telefono no puede tener mas de 15 caracteres',
    'telefono.minLength': 'El telefono no puede tener menos de 7 caracteres',
    'email.required': 'El email es requerido',
    'email.email': 'El email no es valido',
    'email.unique': 'El email ya esta en uso',
    'password.required': 'La contraseña es requerida',
    'password.minLength': 'La contraseña no puede tener menos de 8 caracteres',
    'password.regex': 'La contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula y un numero',
    'user_id.required': 'El id de usuario es requerido'
  }
}
