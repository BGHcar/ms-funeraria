import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Suscripcion from 'App/Models/Suscripcion'
import SuscripcionValidator from 'App/Validators/SuscripcionValidator'

export default class SuscripcionesController {


    // Create 
    public async create({ request, response }: HttpContextContract) {

        const data = await request.validate(SuscripcionValidator)

        const existingSuscripcion = await Suscripcion.query().where('cliente_id', data.cliente_id).first()

        if (existingSuscripcion) {
            return response.status(400).json({ message: 'Ya existe una suscripcion con este cliente' })
        } else {
            const theSuscripcion = await Suscripcion.create(data)
            return response.json(theSuscripcion)
        }
    }


    // Get 
    public async findAll({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let suscripciones: Suscripcion[] = await Suscripcion.query().preload('plan').preload('cliente').paginate(page, perPage)
        return suscripciones
    }

    // Get by id

    public async findById({ params }:
        HttpContextContract) {
        let theSuscripcion: Suscripcion = await Suscripcion.query().where('id', params.id).preload('plan').preload('cliente').firstOrFail()
        return theSuscripcion
    }

    // Delete

    public async delete({ params, response }: HttpContextContract) {
        const theSuscripcion = await Suscripcion.findOrFail(params.id)
        response.status(204)
        return await theSuscripcion.delete()
    }
}
