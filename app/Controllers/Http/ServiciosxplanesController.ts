import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ServicioxPlan from 'App/Models/ServicioxPlan'

export default class ServiciosxplanesController {

    // Create 
    public async create({ request }: HttpContextContract) {
        let body = request.body()
        const theServicioxPlan = await ServicioxPlan.create(body)
        return theServicioxPlan
    }

    // Get 
    public async findAll({request}: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let serviciosxplanes:ServicioxPlan[] = await ServicioxPlan.query().preload('servicio').preload('plan').paginate(page, perPage)
        return serviciosxplanes
    }

    // Get by id

    public async findById({ params }:
        HttpContextContract) {
        let theServicioxPlan : ServicioxPlan = await ServicioxPlan.query().where('id', params.id).preload('servicio').preload('plan').firstOrFail()
        return theServicioxPlan
    }


    // Delete

    public async delete({ params, response }: HttpContextContract) {
        const theServicioxPlan = await ServicioxPlan.findOrFail(params.id)
        response.status(204)
        return await theServicioxPlan.delete()
    }

}
