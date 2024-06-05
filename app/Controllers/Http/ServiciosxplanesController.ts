import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Plan from 'App/Models/Plan'
import Servicio from 'App/Models/Servicio'
import ServicioxPlan from 'App/Models/ServicioxPlan'
import ServicioxplanValidator from 'App/Validators/ServicioxplanValidator'

export default class ServiciosxplanesController {

    // Create 
    public async create({ request, response }: HttpContextContract) {
        
        const data = await request.validate(ServicioxplanValidator)
        const theServicio = await Servicio.findOrFail(data.servicio?.id)
        const thePlan = await Plan.findOrFail(data.plan?.id)
        const theServicioxPlan = await ServicioxPlan.create({
            servicio_id: theServicio.id,
            plan_id: thePlan.id
         })
        return response.json(theServicioxPlan)
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
