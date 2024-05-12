import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CiudadValidator {
  constructor(protected ctx: HttpContextContract) {}

    /*
    El modelo de ciudades tiene la siguiente estructura:

    nombre: string
    departamento_id: number

    */
  public schema = schema.create({
    nombre: schema.string({trim: true},[
      rules.maxLength(20),
      rules.unique({table: "Ciudads", column:"nombre"}),
    ]),
    departamento_id: schema.number()
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
    'nombre.unique': 'El nombre ya esta en uso',
    'departamento_id.required': 'El departamento es requerido',
  }
}
