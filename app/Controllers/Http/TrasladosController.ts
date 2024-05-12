import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Traslado from 'App/Models/Traslado'
import TrasladoValidator from 'App/Validators/TrasladoValidator'

export default class TrasladosController {

    //create a new traslado

    public async create({ request, response }: HttpContextContract) {
        
        const data = await request.validate(TrasladoValidator)
        const theTraslado = await Traslado.create(data)
        return response.json(theTraslado)
    }

    // Get all traslados

    public async findAll({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let traslado: Traslado[] = await Traslado.query().paginate(page, perPage)
        return traslado
    }

    // Get a traslado by id

    public async findById({ params }: HttpContextContract) {
        const theTraslado = await Traslado.findOrFail(params.id)
        return theTraslado
    }

    // Update a traslados by id

    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theTraslado = await Traslado.findOrFail(params.id)
        theTraslado.origen = body.origen
        theTraslado.destino = body.destino
        theTraslado.fecha_hora = body.fecha_hora
        return theTraslado.save()
    }

    // Delete a traslados by id

    public async delete({ params, response }: HttpContextContract) {
        const theTraslado = await Traslado.findOrFail(params.id)
        response.status(204)
        return await theTraslado.delete()
    }
}
