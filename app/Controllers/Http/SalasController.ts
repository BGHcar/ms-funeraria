import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Sala from 'App/Models/Sala'
import SalaValidator from 'App/Validators/SalaValidator'

export default class SalasController {

    /*

    El modelo de salas tiene la siguiente estructura:

    nombre: string
    capacidad: number
    disponibilidad: boolean
    sede_id: number

    */

    // Create a new salas
    public async create({ request, response }: HttpContextContract) {
        const data = await request.validate(SalaValidator)
        const theSala = await Sala.create(data)
        return response.json(theSala)
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
        theSala.sede_id = body.sede_id
        return theSala.save()
    }

    // Delete a client by id

    public async delete({ params, response }: HttpContextContract) {
        const theSala = await Sala.findOrFail(params.id)
        response.status(204)
        return await theSala.delete()
    }

}
