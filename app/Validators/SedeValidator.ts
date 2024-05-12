import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SedeValidator {
  constructor(protected ctx: HttpContextContract) {}

    /*

    El modelo de sedes tiene la siguiente estructura:

    nombre: string
    direccion: string
    telefono: number
    correo_electronico: string
    ciudad_id: number

    */
  public schema = schema.create({
    nombre: schema.string({ trim: true }, [
      rules.maxLength(60),
      rules.required(),
      rules.unique({table: "sedes", column:"nombre"}),
    ]),
    direccion: schema.string({ trim: true },[
      rules.required(),
      rules.maxLength(60),
    ]),
    telefono: schema.number([
      rules.required(),
    ]),
    correo_electronico: schema.string({ trim: true }, [
      rules.maxLength(60),
      rules.required(),
      rules.unique({table: "sedes", column:"correo_electronico"}),
      rules.regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/) // Esta expresion regular valida que el correo electronico tenga el formato correcto
    ]),
    ciudad_id: schema.number([
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
    'nombre.maxLength': 'El nombre no puede tener mas de 60 caracteres',
    'nombre.unique': 'El nombre ya esta en uso',
    'direccion.required': 'La direccion es requerida',
    'direccion.maxLength': 'La direccion no puede tener mas de 60 caracteres',
    'telefono.required': 'El telefono es requerido',
    'correo_electronico.required': 'El correo electronico es requerido',
    'correo_electronico.maxLength': 'El correo electronico no puede tener mas de 60 caracteres',
    'correo_electronico.unique': 'El correo electronico ya esta en uso',
    'correo_electronico.regex': 'El correo electronico no es valido',
    'ciudad_id.required': 'La ciudad es requerida',
  }
}
