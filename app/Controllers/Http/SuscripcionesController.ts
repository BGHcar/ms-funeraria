import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Suscripcion from 'App/Models/Suscripcion'

export default class SuscripcionesController {

    // Create 
    public async create({ request }: HttpContextContract) {
        let body = request.body()
        const theSuscripcion = await Suscripcion.create(body)
        return theSuscripcion
    }

    // Get 
    public async findAll({request}: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let suscripciones:Suscripcion[] = await Suscripcion.query().paginate(page, perPage)
        return suscripciones
    }

    // Get by id

    public async findById({ params }:
        HttpContextContract) {
        const theSuscripcion = await Suscripcion.findOrFail(params.id)
        return theSuscripcion
    }

    // Delete

    public async delete({ params, response }: HttpContextContract) {
        const theSuscripcion = await Suscripcion.findOrFail(params.id)
        response.status(204)
        return await theSuscripcion.delete()
    }
}
