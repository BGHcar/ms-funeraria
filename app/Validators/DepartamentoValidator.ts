import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DepartamentoValidator {
  constructor(protected ctx: HttpContextContract) { }

  /*

  El modelo de departamentos tiene la siguiente estructura:

  nombre: string

  */

  public schema = schema.create({
    nombre: schema.string({ trim: true }, [
      rules.maxLength(20),
      rules.unique({ table: "departamentos", column: "nombre" }),
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
    'nombre.unique': 'El nombre ya existe'
  }
}
