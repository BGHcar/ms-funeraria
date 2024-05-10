import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EjecucionServicio from 'App/Models/EjecucionServicio'


export default class EjecucionServiciosController {

    // Create a new Ejecucion Servicio
    public async create({ request }: HttpContextContract) {
        let body = request.body()
        const theEjecucionServicio = await EjecucionServicio.create(body)
        return theEjecucionServicio
    }

    // Get all Ejecucion Servicio
    public async findAll({request}: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let ejecucion_servicios:EjecucionServicio[] = await EjecucionServicio.query().paginate(page, perPage)
        return ejecucion_servicios
    }

    // Get a Departament by id

    public async findById({ params }: HttpContextContract) {
        const theEjecucionServicio = await EjecucionServicio.findOrFail(params.id)
        return theEjecucionServicio
    }

    // Update a driver by id

    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theEjecucionServicio = await EjecucionServicio.findOrFail(params.id)
        theEjecucionServicio.cliente_id = body.cliente_id
        theEjecucionServicio.servicio_id = body.servicio_id
        return theEjecucionServicio.save()
    }

    // Delete a driver by id

    public async delete({ params, response }: HttpContextContract) {
        const theEjecucionServicio = await EjecucionServicio.findOrFail(params.id)
        response.status(204)
        return await theEjecucionServicio.delete()
    }

}
