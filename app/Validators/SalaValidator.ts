import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SalaValidator {
  constructor(protected ctx: HttpContextContract) { }


    /*

    El modelo de salas tiene la siguiente estructura:

    nombre: string
    capacidad: number
    disponibilidad: boolean
    sede_id: number

    */
  public schema = schema.create({
    nombre: schema.string({ trim: true }, [
      rules.maxLength(20),
      rules.required(),
    ]),
    capacidad: schema.number([
      rules.required(),
      rules.range(1, 50),
    ]),
    disponibilidad: schema.boolean([
      rules.required(),
    ]),
    sedes_id: schema.number([
      rules.required(),
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
    'nombre.maxLength': 'El nombre no puede tener mas de 20 caracteres',
    'capacidad.required': 'La capacidad es requerida',
    'capacidad.range': 'La capacidad debe estar entre 1 y 50',
    'disponibilidad.required': 'La disponibilidad es requerida',
    'sede_id.required': 'La sede es requerida',
  }
}
