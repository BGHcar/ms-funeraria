import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Administrador from 'App/Models/Administrador'
import { Schema, rules, schema } from '@ioc:Adonis/Core/Validator'

export default class AdministradoresController {

    // Create a new administrator

    public async create({ request }: HttpContextContract) {
        const validationSchema = schema.create
        ({
            email: schema.string({}, [
                rules.email(),  // Esta regla valida que el campo sea un email de la siguiente forma:   
                                        // 1. Que contenga un @
                                        // 2. Que tenga un dominio valido
                                        // 3. Que tenga un nombre de usuario valido
                rules.unique({ table: 'administradores', column: 'email' }),
            ]),
            name: schema.string({},[
                rules.maxLength(20), 
                rules.minLength(3)
            ]),
            age: schema.number([
                rules.range(18, 100)
            ]),
            password: schema.string({},[
                rules.maxLength(20), 
                rules.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)  // Esta expresion regular valida que la contraseña tenga al menos 8 caracteres, una mayuscula, una minuscula y un numero
            ])
        })

        await request.validate({
            schema: validationSchema,
            messages: {
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
        })


        let body = request.body()
        const theAdministrador = await Administrador.create(body)
        return theAdministrador
    }

    // Get all administrators

    public async findAll({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let administradores: Administrador[] = await Administrador.query().paginate(page, perPage)
        return administradores
    }

    // Get an administrator by id

    public async findById({ params }: HttpContextContract) {
        const theAdministrador = await Administrador.findOrFail(params.id)
        return theAdministrador
    }

    // Update an administrator by id

    public async update({ params, request }: HttpContextContract) {
        const validationSchema = schema.create({
            name: schema.string({},[
                rules.maxLength(20), 
                rules.minLength(3)
            ]),
            age: schema.number([
                rules.range(18, 100)
            ]),
            password: schema.string({},[
                rules.maxLength(20), 
                rules.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)  // Esta expresion regular valida que la contraseña tenga al menos 8 caracteres, una mayuscula, una minuscula y un numero
            ])
        })

        await request.validate({
            schema: validationSchema,
            messages: {
                'name.required': 'El nombre es requerido',
                'name.maxLength': 'El nombre no puede tener mas de 20 caracteres',
                'name.minLength': 'El nombre no puede tener menos de 3 caracteres',
                'age.required': 'La edad es requerida',
                'age.range': 'La edad debe estar entre 18 y 100',
                'password.required': 'La contraseña es requerida',
                'password.maxLength': 'La contraseña no puede tener mas de 20 caracteres',
                'password.regex': 'La contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula y un numero'
            }
        })

        const body = request.body()
        const theAdministrador = await Administrador.findOrFail(params.id)
        theAdministrador.name = body.name
        theAdministrador.age = body.age
        theAdministrador.password = body.password
        return theAdministrador.save()
    }

    // Delete an administrator by id

    public async delete({ params, response }: HttpContextContract) {
        const theAdministrador = await Administrador.findOrFail(params.id)
        response.status(204)
        return await theAdministrador.delete()
    }



}
