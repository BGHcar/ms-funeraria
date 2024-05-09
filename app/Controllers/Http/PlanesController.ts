import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Plan from 'App/Models/Plan'

export default class PlanesController {

    // Create 
    public async create({ request }: HttpContextContract) {
        let body = request.body()
        const thePlan = await Plan.create(body)
        return thePlan
    }

    // Get 
    public async findAll({request}: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let planes:Plan[] = await Plan.query().paginate(page, perPage)
        return planes
    }

    // Get by id

    public async findById({ params }:
        HttpContextContract) {
        const thePlan = await Plan.findOrFail(params.id)
        return thePlan
    }

    // Update

    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const thePlan = await Plan.findOrFail(params.id)
        thePlan.nombre = body.nombre
        thePlan.precio = body.precio
        thePlan.duracion = body.duracion
        thePlan.descuento = body.descuento
        thePlan.precio_final = body.precio_final
        thePlan.estado = body.estado
        return thePlan.save()
    }

    // Delete

    public async delete({ params, response }: HttpContextContract) {
        const thePlan = await Plan.findOrFail(params.id)
        response.status(204)
        return await thePlan.delete()
    }


}
