import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Sede from 'App/Models/Sede'
import SedeValidator from 'App/Validators/SedeValidator'

export default class SedesController {

    // Create a new sede
    public async create({ request, response }: HttpContextContract) {
        const data = await request.validate(SedeValidator)
        const theSede = await Sede.create(data)
        return response.json(theSede)
    }

    // Get all sedes
    public async findAll({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let sedes: Sede[] = await Sede.query().preload('salas').paginate(page, perPage)
        return sedes
    }

    // Get a sede by id

    public async findById({ params }: HttpContextContract) {
        const theSede = await Sede.query().where('id', params.id).preload('salas').firstOrFail()
        return theSede
    }

    // Update a client by id

    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theSede = await Sede.findOrFail(params.id)
        theSede.nombre = body.nombre
        theSede.direccion = body.direccion
        theSede.telefono = body.telefono
        theSede.correo_electronico = body.correo_electronico
        theSede.ciudad_id = body.ciudad_id
        return theSede.save()
    }

    // Delete a client by id

    public async delete({ params, response }: HttpContextContract) {
        const theSede = await Sede.findOrFail(params.id)
        response.status(204)
        return await theSede.delete()
    }
}
