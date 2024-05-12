import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pago from 'App/Models/Pago'
import PagoValidator from 'App/Validators/PagoValidator'

export default class PagosController {



    // Create a new Payment
    public async create({ request, response }: HttpContextContract) {
        const data = await request.validate(PagoValidator)
        const thePago = await Pago.create(data)
        return response.json(thePago)
    }

    // Get all Payment
    public async findAll({request}: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let pagos:Pago[] = await Pago.query().paginate(page, perPage)
        return pagos
    }

    // Get a Payment by id

    public async findById({ params }:
        HttpContextContract) {
        const thePago = await Pago.findOrFail(params.id)
        return thePago
    }

    // Get all Payment by User

    public async findByUser({ params }:
        HttpContextContract) {
        const thePago = await Pago.findBy('usuario_id', params.id)
        return thePago
    }

    // Get all Payment by Subscription

    public async findBySubscription({ params }:
        HttpContextContract) {
        const thePago = await Pago.findBy('suscripcion_id', params.id)
        return thePago
    }
}
