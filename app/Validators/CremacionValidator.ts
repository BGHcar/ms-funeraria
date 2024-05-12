import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CremacionValidator {
  constructor(protected ctx: HttpContextContract) {}

    /*
    El modelo de cremaciones tiene la siguiente estructura:

    ubicacion: string
    fecha_hora: DateTime
    servicio_id: number

    */
  public schema = schema.create({
    ubicacion: schema.string({trim: true},[
      rules.maxLength(50),
      rules.minLength(1),
    ]),
    fecha_hora: schema.string({trim: true},[
    ]),
    servicio_id: schema.number([
      rules.exists({table: "servicios", column: "id"})
    ]),
    sala_id: schema.number([
      rules.exists({table: "salas", column: "id"})
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
    'ubicacion.required': 'La ubicacion es requerida',
    'ubicacion.maxLength': 'La ubicacion no puede tener mas de 50 caracteres',
    'ubicacion.minLength': 'La ubicacion no puede estar vacia',
    'fecha_hora.required': 'La fecha y hora son requeridas',
    'servicio_id.required': 'El servicio es requerido',
    'servicio_id.exists': 'El servicio no existe en la base de datos',
    'sala_id.exists': 'La sala no existe en la base de datos'
  }
}
