import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Administrador from 'App/Models/Administrador'
import AdministradorValidator from 'App/Validators/AdministradorValidator'

export default class AdministradoresController {

    // Create a new administrator

    public async create({ request, response }: HttpContextContract) {

        const data = await request.validate(AdministradorValidator)

        const theAdministrador = await Administrador.create(data)
        return response.json(theAdministrador)
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
