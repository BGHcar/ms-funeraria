import { schema, CustomMessages, rules} from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ClienteValidator {
  constructor(protected ctx: HttpContextContract) {}

    /*
    El modelo de clientes tiene la siguiente estructura:

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
      rules.unique({table: "clientes", column:"cedula"}),
    ]),
    edad: schema.number([
      rules.required(),
      rules.range(0,150),
    ]),
    telefono: schema.string({trim: true},[
      rules.maxLength(15),
    ]),
    esta_vivo: schema.boolean.optional([
    ]),
    email: schema.string({trim: true},[
      rules.required(),
      rules.email(),
      rules.unique({table: "clientes", column:"email"}),
    ]),
    password: schema.string({trim: true},[
      rules.required(),
      rules.minLength(8),
      rules.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)  // Esta expresion regular valida que la contraseña tenga al menos 8 caracteres, una mayuscula, una minuscula y un numero
    ]),
    user_id: schema.string.optional({trim: true},[
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
    'nombre.required': 'El nombre es requerido',
    'nombre.maxLength': 'El nombre no puede tener mas de 30 caracteres',
    'apellido.required': 'El apellido es requerido',
    'apellido.maxLength': 'El apellido no puede tener mas de 30 caracteres',
    'cedula.required': 'La cedula es requerida',
    'cedula.maxLength': 'La cedula no puede tener mas de 15 caracteres',
    'cedula.unique': 'La cedula ya esta en uso',
    'telefono.maxLength': 'El telefono no puede tener mas de 15 caracteres',
    'email.required': 'El email es requerido',
    'email.email': 'El email no es valido',
    'email.unique': 'El email ya esta en uso',
    'password.required': 'La contraseña es requerida',
    'password.minLength': 'La contraseña debe tener al menos 8 caracteres',
    'password.regex': 'La contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula y un numero',
    'user_id.required': 'El id de usuario es requerido'
  }
}
