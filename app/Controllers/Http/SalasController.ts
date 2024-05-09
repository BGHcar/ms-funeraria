import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Sala from 'App/Models/Sala'

export default class SalasController {

    // Create a new sede
    public async create({ request }: HttpContextContract) {
        let body = request.body()
        const theSala = await Sala.create(body)
        return theSala
    }

    // Get all sedes
    public async findAll({request}: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let salas:Sala[] = await Sala.query().paginate(page, perPage)
        return salas
    }

    // Get a sede by id

    public async findById({ params }: HttpContextContract) {
        const theSala = await Sala.findOrFail(params.id)
        return theSala
    }

    // Update a client by id

    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theSala = await Sala.findOrFail(params.id)
        theSala.nombre = body.nombre
        theSala.capacidad = body.capacidad
        theSala.disponibilidad = body.disponibilidad
        theSala.sedes_id = body.sede_id
        return theSala.save()
    }

    // Delete a client by id

    public async delete({ params, response }: HttpContextContract) {
        const theSala = await Sala.findOrFail(params.id)
        response.status(204)
        return await theSala.delete()
    }

}
