import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PlanValidator {
  constructor(protected ctx: HttpContextContract) {}

    /*

    El modelo de planes tiene la siguiente estructura:

    nombre: string
    precio: number
    duracion: number
    descuento: number
    precio_final: number
    estado: boolean
        
    */
  public schema = schema.create({
    nombre: schema.string({trim: true},[
      rules.maxLength(200),
      rules.minLength(1),
      rules.required(),
    ]),
    precio: schema.number([
      rules.required(),
    ]),
    duracion: schema.number([
      rules.required(),
    ]),
    descuento: schema.number([
      rules.required(),
    ]),
    precio_final: schema.number([
      rules.required(),
    ]),
    estado: schema.boolean([
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
    'nombre.maxLength': 'El nombre no puede tener mas de 200 caracteres',
    'nombre.minLength': 'El nombre no puede estar vacio',
    'precio.required': 'El precio es requerido',
    'duracion.required': 'La duracion es requerida',
    'descuento.required': 'El descuento es requerido',
    'precio_final.required': 'El precio final es requerido',
    'estado.required': 'El estado es requerido',
  }
}
