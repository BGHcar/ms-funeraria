import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cliente from 'App/Models/Cliente'
import ClienteValidator from 'App/Validators/ClienteValidator'

export default class ClientesController {

    // Create a new client
    public async create({ request, response }: HttpContextContract) {
        const data = await request.validate(ClienteValidator)
        const theCliente = await Cliente.create(data)
        return response.json(theCliente)
    }

    // Get all clients

    public async findAll({request}: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let clientes:Cliente[] = await Cliente.query().preload('servicios').preload('planes').paginate(page, perPage)
        return clientes
    }


    // Get a client by id

    public async findById({ params }: HttpContextContract) {
        let theCliente : Cliente = await Cliente.query().where('id', params.id).preload('servicios').preload('planes').preload("beneficiarios").preload("titular").firstOrFail()
        return theCliente
    }

    // Update a client by id

    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theCliente = await Cliente.findOrFail(params.id)
        theCliente.nombre = body.nombre
        return theCliente.save()
    }

    // Delete a client by id

    public async delete({ params, response }: HttpContextContract) {
        const theCliente = await Cliente.findOrFail(params.id)
        response.status(204)
        return await theCliente.delete()
    }
}
