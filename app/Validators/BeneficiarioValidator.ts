import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BeneficiarioValidator {
  constructor(protected ctx: HttpContextContract) {}

    /*
    El modelo de beneficiarios tiene la siguiente estructura:

    nombre: string
    apellido: string
    cedula: string
    telefono: string
    titular_id: number
    cliente_id: number

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
      rules.email()
    ]),
    password: schema.string({trim: true},[
      rules.minLength(8),
      rules.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)  // Esta expresion regular valida que la contraseña tenga al menos 8 caracteres, una mayuscula, una minuscula y un numero
    ]),
    titular: schema.object.optional().members({
      id: schema.number([rules.exists({ table: 'titulares', column: 'id' })]),
    }),
    cliente_id: schema.number.optional([
    ]),
    titular_id: schema.number.optional([
      rules.exists({ table: 'titulares', column: 'id' })
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
    'edad.required': 'La edad es requerida',
    'edad.range': 'La edad no puede ser negativa',
    'telefono.maxLength': 'El telefono no puede tener mas de 15 caracteres',
    'email.required': 'El email es requerido',
    'email.email': 'El email debe ser valido',
    'password.required': 'La contraseña es requerida',
    'password.minLength': 'La contraseña debe tener al menos 8 caracteres',
    'password.regex': 'La contraseña debe tener al menos una mayuscula, una minuscula y un numero',
    'titular.id.exists': 'El titular no existe',
  }
}
