import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cliente from 'App/Models/Cliente'
import Plan from 'App/Models/Plan'
import Suscripcion from 'App/Models/Suscripcion'
import Titular from 'App/Models/Titular'
import SuscripcionValidator from 'App/Validators/SuscripcionValidator'

export default class SuscripcionesController {


    // Create 
    public async create({ request, response }: HttpContextContract) {

        const data = await request.validate(SuscripcionValidator)
        const id = (await Titular.findOrFail(data.cliente?.id)).cliente_id
        const existingSuscripcion = await Suscripcion.query().where('cliente_id', id).first()
        const theCliente = await Cliente.findOrFail(id)
        const thePlan = await Plan.findOrFail(data.plan?.id)

        if (existingSuscripcion) {
            return response.status(400).json({ message: 'Ya existe una suscripcion con este cliente' })
        } else {
            const theSuscripcion = await Suscripcion.create({
                cliente_id: theCliente.id,
                plan_id: thePlan.id
            })
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

    public async findByClienteId({ params, request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let theTitular = await Titular.findOrFail(params.id)
        let theCliente = await Cliente.findOrFail(theTitular.cliente_id)
        let suscripciones = await Suscripcion.query().where('cliente_id', theCliente.id).preload('plan').preload('cliente').paginate(page, perPage)
        return suscripciones
    }

    // Delete

    public async delete({ params, response }: HttpContextContract) {
        const theSuscripcion = await Suscripcion.findOrFail(params.id)
        response.status(204)
        return await theSuscripcion.delete()
    }

    // Update

    public async update({ request, response, params }: HttpContextContract) {
        const theSuscripcion = await Suscripcion.findOrFail(params.id)
        const data = await request.validate(SuscripcionValidator)
        const theCliente = await Cliente.findOrFail(data.cliente?.id)
        const thePlan = await Plan.findOrFail(data.plan?.id)
        theSuscripcion.cliente_id = theCliente.id
        theSuscripcion.plan_id = thePlan.id
        await theSuscripcion.save()
        return response.json(theSuscripcion)
    }
}
