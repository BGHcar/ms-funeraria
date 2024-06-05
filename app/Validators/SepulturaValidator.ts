import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SepulturaValidator {
  constructor(protected ctx: HttpContextContract) {}

    /*

    El modelo de sepulturas tiene la siguiente estructura:

    ubicacion: string
    fecha_hora: DateTime
    servicio_id: number
    sala_id: number

    */
  public schema = schema.create({

    ubicacion: schema.string([
      rules.required(),
    ]),
    fecha_hora: schema.string([
      rules.required(),
    ]),
    servicio_id: schema.number.nullableAndOptional(),
    sala_id: schema.number([
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
    'ubicacion.required': 'La ubicacion es requerida',
    'fecha_hora.required': 'La fecha y hora son requeridas',
    'servicio_id.required': 'El servicio es requerido',
    'servicio_id.exists': 'El servicio no existe',
    'sala_id.required': 'La sala es requerida',
    'sala_id.exists': 'La sala no existe'
  }
}
