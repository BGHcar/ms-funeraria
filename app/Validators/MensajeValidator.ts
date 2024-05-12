import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MensajeValidator {
  constructor(protected ctx: HttpContextContract) {}

    /*
    El modelo de mensajes tiene la siguiente estructura:

    contenido: string
    user_id: string
    chat_id: string

    */
  public schema = schema.create({
    contenido: schema.string({trim: true},[
      rules.maxLength(200),
      rules.minLength(1),
      rules.required(),
    ]),
    user_id: schema.string({trim: true},[
      rules.required(),
    ]),
    chat_id: schema.number([
      rules.required(),
      rules.exists({table: "chats", column: "id"})
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
    'user_id.required': 'El usuario es requerido',
    'chat_id.required': 'El chat es requerido',
    'chat_id.exists': 'El chat no existe'
  }
}
