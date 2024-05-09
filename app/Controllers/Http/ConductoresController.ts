import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Conductor from 'App/Models/Conductor'

export default class ConductoresController {

    // Create a new driver

    public async create({ request }: HttpContextContract) {
        let body = request.body()
        const theConductor = await Conductor.create(body)
        return theConductor
    }

    // Get all drivers

    public async findAll({request}: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let conductores:Conductor[] = await Conductor.query().paginate(page, perPage)
        return conductores
    }

    // Get a driver by id

    public async findById({ params }: HttpContextContract) {
        const theConductor = await Conductor.findOrFail(params.id)
        return theConductor
    }

    // Update a driver by id

    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theConductor = await Conductor.findOrFail(params.id)
        theConductor.nombre = body.nombre
        theConductor.apellido = body.apellido
        theConductor.cedula = body.cedula
        theConductor.telefono = body.telefono
        return theConductor.save()
    }

    // Delete a driver by id

    public async delete({ params, response }: HttpContextContract) {
        const theConductor = await Conductor.findOrFail(params.id)
        response.status(204)
        return await theConductor.delete()
    }
}
