import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ComentarioValidator {
  constructor(protected ctx: HttpContextContract) {}

    /*
    El modelo de comentarios tiene la siguiente estructura:

    contenido: string
    eservicio_id: number

    */
  public schema = schema.create({
    contenido: schema.string({trim: true},[
      rules.maxLength(200),
      rules.minLength(1),
    ]),
    eservicio_id: schema.number([
      rules.exists({table: "ejecucion_servicios", column: "id"})
    ]),
    calificacion: schema.number([
      rules.range(1,5)
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
    'contenido.required': 'El contenido es requerido',
    'contenido.maxLength': 'El contenido no puede tener mas de 200 caracteres',
    'contenido.minLength': 'El contenido no puede estar vacio',
    'eservicio_id.required': 'El servicio es requerido',
    'eservicio_id.exists': 'La ejecucion de servicio no existe'
  }
}
