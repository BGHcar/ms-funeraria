import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cremacion from 'App/Models/Cremacion'

export default class CremacionesController {

    //create a new cremacion

    public async create({ request }: HttpContextContract) {
        let body = request.body()
        const theCremacion = await Cremacion.create(body)
        return theCremacion
    }

    // Get all cremacion

    public async findAll({request}: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let cremacion:Cremacion[] = await Cremacion.query().paginate(page, perPage)
        return cremacion
    }

    // Get a cremacion by id

    public async findById({ params }: HttpContextContract) {
        const theCremacion = await Cremacion.findOrFail(params.id)
        return theCremacion
    }

    // Update a cremacion by id

    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theCremacion = await Cremacion.findOrFail(params.id)
        theCremacion.ubicacion = body.ubicacion
        theCremacion.fecha_hora = body.fecha_hora
        return theCremacion.save()
    }
    
    // Delete a cremacion by id

    public async delete({ params, response }: HttpContextContract) {
        const theCremacion = await Cremacion.findOrFail(params.id)
        response.status(204)
        return await theCremacion.delete()
    }
}
