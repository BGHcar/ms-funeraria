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

    nombre: schema.string({ trim: true }, [
      rules.maxLength(20),
      rules.minLength(3),
      rules.required(),
    ]),
    apellido: schema.string({ trim: true }, [
      rules.maxLength(20),
      rules.minLength(3),
    ]),
    cedula: schema.string({ trim: true }, [
      rules.maxLength(10),
      rules.minLength(7),
      rules.required(),
      rules.regex(/^[0-9]*$/)
    ]),
    telefono: schema.string({ trim: true }, [
      rules.maxLength(15),
      rules.minLength(7),
    ]),
    titular_id: schema.number([
      rules.required(),
    ]),
    cliente_id: schema.number([
      rules.required(),
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
    'cedula.maxLength': 'La cedula no puede tener mas de 10 caracteres',
    'cedula.minLength': 'La cedula no puede tener menos de 7 caracteres',
    'cedula.regex': 'La cedula solo puede contener numeros',
    'telefono.maxLength': 'El telefono no puede tener mas de 15 caracteres',
    'telefono.minLength': 'El telefono no puede tener menos de 7 caracteres',
    'titular_id.required': 'El titular es requerido',
    'cliente_id.required': 'El cliente es requerido',
  }
}
