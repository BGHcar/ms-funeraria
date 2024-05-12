import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdministradorValidator {
  constructor(protected ctx: HttpContextContract) { }


  
  public schema = schema.create
    ({
      email: schema.string({}, [
        rules.email(),  // Esta regla valida que el campo sea un email de la siguiente forma:   
        // 1. Que contenga un @
        // 2. Que tenga un dominio valido
        // 3. Que tenga un nombre de usuario valido
        rules.unique({ table: 'administradores', column: 'email' }),
      ]),
      name: schema.string({}, [
        rules.maxLength(20),
        rules.minLength(3)
      ]),
      age: schema.number([
        rules.range(18, 100)
      ]),
      password: schema.string({}, [
        rules.maxLength(20),
        rules.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)  // Esta expresion regular valida que la contraseña tenga al menos 8 caracteres, una mayuscula, una minuscula y un numero
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
    'email.required': 'El email es requerido',
    'email.email': 'El email no es valido',
    'email.unique': 'El email ya esta en uso',
    'name.required': 'El nombre es requerido',
    'name.maxLength': 'El nombre no puede tener mas de 20 caracteres',
    'name.minLength': 'El nombre no puede tener menos de 3 caracteres',
    'age.required': 'La edad es requerida',
    'age.range': 'La edad debe estar entre 18 y 100',
    'password.required': 'La contraseña es requerida',
    'password.maxLength': 'La contraseña no puede tener mas de 20 caracteres',
    'password.regex': 'La contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula y un numero'
  }
}
