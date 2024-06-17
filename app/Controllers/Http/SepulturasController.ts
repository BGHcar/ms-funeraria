import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Sepultura from 'App/Models/Sepultura'
import SepulturaValidator from 'App/Validators/SepulturaValidator'

export default class SepulturasController {



    //create a new sepultura

    public async create({ request, response }: HttpContextContract) {
        const data = await request.validate(SepulturaValidator)
        const theSepultura = await Sepultura.create(data)
        return response.json(theSepultura)
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

    public async findAllByServicio({ params, response }: HttpContextContract) {
        try {
            let servicios: Sepultura[] = await Sepultura.query().where('servicio_id', params.id).preload('servicio').paginate(1, 20)
            return servicios
        } catch (error) {
            return response.status(404).json({ message: 'Servicio no encontrado' })
        }
    }

    // Update a sepultura by id

    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theSepultura = await Sepultura.findOrFail(params.id)
        theSepultura.ciudad_id = body.ubicacion
        theSepultura.fecha_hora = body.fecha_hora
        theSepultura.sala_id = body.ubicacion

        return theSepultura.save()
    }
    
    // Delete a sepultura by id

    public async delete({ params, response }: HttpContextContract) {
        const theSepultura = await Sepultura.findOrFail(params.id)
        response.status(204)
        return await theSepultura.delete()
    }
}
