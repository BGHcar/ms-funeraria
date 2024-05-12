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
      rules.required(),
    ]),
    servicio_id: schema.number([
      rules.required(),
      rules.exists({table: "ejecucion_servicios", column: "id"})
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
    'contenido.required': 'El contenido es requerido',
    'contenido.maxLength': 'El contenido no puede tener mas de 200 caracteres',
    'contenido.minLength': 'El contenido no puede estar vacio',
    'servicio_id.required': 'El servicio es requerido',
    'servicio_id.exists': 'La ejecucion de servicio no existe'
  }
}
