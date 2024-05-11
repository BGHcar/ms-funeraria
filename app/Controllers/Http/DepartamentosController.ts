import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Departamento from 'App/Models/Departamento'

export default class DepartamentosController {

    /*

    El modelo de departamentos tiene la siguiente estructura:

    nombre: string

    */

    // Create a new Departament
    public async create({ request }: HttpContextContract) {
        let body = request.body()
        const theDepartamento = await Departamento.create(body)
        return theDepartamento
    }

    // Get all Departament
    public async findAll({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let departamentos: Departamento[] = await Departamento.query().paginate(page, perPage)
        return departamentos
    }

    // Get a Departament by id

    public async findById({ params }: HttpContextContract) {
        const theDepartamento = await Departamento.findOrFail(params.id)
        return theDepartamento
    }

    // Update a driver by id

    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theDepartamento = await Departamento.findOrFail(params.id)
        theDepartamento.nombre = body.nombre
        return theDepartamento.save()
    }

    // Delete a driver by id

    public async delete({ params, response }: HttpContextContract) {
        const theDepartamento = await Departamento.findOrFail(params.id)
        response.status(204)
        return await theDepartamento.delete()
    }
}
