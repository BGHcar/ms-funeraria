import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cremacion from 'App/Models/Cremacion'
import CremacionValidator from 'App/Validators/CremacionValidator'

export default class CremacionesController {


    //create a new cremacion

    public async create({ request, response }: HttpContextContract) {
        const data = await request.validate(CremacionValidator)
        const theCremacion = await Cremacion.create(data)
        return response.json(theCremacion)
    }

    // Get all cremacion

    public async findAll({request}: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let cremacion:Cremacion[] = await Cremacion.query().paginate(page, perPage)
        return cremacion
    }
    public async findAllByServicio({ params, response }: HttpContextContract) {
        try {
            let cremacion: Cremacion[] = await Cremacion.query().where('servicio_id', params.id).preload('servicio').paginate(1, 20)
            return cremacion
        } catch (error) {
            return response.status(404).json({ message: 'Servicio no encontrado' })
        }
    }
    // Get a cremacion by id

    public async findById({ params }: HttpContextContract) {
        const theCremacion = await Cremacion.findOrFail(params.id)
        return theCremacion
    }

    // Update a cremacion by id

    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theCremacion = await Cremacion.findOrFail(params.id)
        theCremacion.ciudad_id = body.ciudad_id
        theCremacion.fecha_hora = body.fecha_hora
        return theCremacion.save()
    }
    
    // Delete a cremacion by id

    public async delete({ params, response }: HttpContextContract) {
        const theCremacion = await Cremacion.findOrFail(params.id)
        response.status(204)
        return await theCremacion.delete()
    }
}
