import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Sepultura from 'App/Models/Sepultura'

export default class SepulturasController {

    /*

    El modelo de sepulturas tiene la siguiente estructura:

    ubicacion: string
    fecha_hora: DateTime
    servicio_id: number

    */

    //create a new sepultura

    public async create({ request }: HttpContextContract) {
        let body = request.body()
        const theSepultura = await Sepultura.create(body)
        return theSepultura
    }

    // Get all sepultura

    public async findAll({request}: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let sepultura:Sepultura[] = await Sepultura.query().paginate(page, perPage)
        return sepultura
    }

    // Get a sepultura by id

    public async findById({ params }: HttpContextContract) {
        const theSepultura = await Sepultura.findOrFail(params.id)
        return theSepultura
    }

    // Update a sepultura by id

    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theSepultura = await Sepultura.findOrFail(params.id)
        theSepultura.ubicacion = body.ubicacion
        theSepultura.fecha_hora = body.fecha_hora
        return theSepultura.save()
    }
    
    // Delete a sepultura by id

    public async delete({ params, response }: HttpContextContract) {
        const theSepultura = await Sepultura.findOrFail(params.id)
        response.status(204)
        return await theSepultura.delete()
    }
}
