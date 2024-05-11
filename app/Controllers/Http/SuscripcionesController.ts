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
        let suscripciones:Suscripcion[] = await Suscripcion.query().preload('plan').preload('cliente').paginate(page, perPage)
        return suscripciones
    }

    // Get by id

    public async findById({ params }:
        HttpContextContract) {
        let theSuscripcion : Suscripcion = await Suscripcion.query().where('id', params.id).preload('plan').preload('cliente').firstOrFail()
        return theSuscripcion
    }

    // Delete

    public async delete({ params, response }: HttpContextContract) {
        const theSuscripcion = await Suscripcion.findOrFail(params.id)
        response.status(204)
        return await theSuscripcion.delete()
    }
}
