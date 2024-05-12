import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Servicio from 'App/Models/Servicio'
import ServicioValidator from 'App/Validators/ServicioValidator'

export default class ServiciosController {


    //create a new servicio

    public async create({ request, response }: HttpContextContract) {
        const data = await request.validate(ServicioValidator)
        const theServicio = await Servicio.create(data)
        return response.json(theServicio)
    }

    // Get all servicios
    public async findAll({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let servicio: Servicio[] = await Servicio.query()
        .preload('planes')
        .preload('clientes')
        .preload('traslados')
        .preload('sepultura')
        .preload('cremacion')
        .paginate(page, perPage)
        return servicio
    }

    // Get a servio by id

    public async findById({ params }: HttpContextContract) {
        let theServicio: Servicio = await Servicio.query()
            .where('id', params.id)
            .preload('planes')
            .preload('clientes')
            .preload('traslados')
            .preload('sepultura')
            .preload('cremacion')
            .firstOrFail()
        return theServicio
    }

    // Update a servicios by id

    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theServicio = await Servicio.findOrFail(params.id)
        theServicio.nombre = body.nombre
        theServicio.precio = body.precio
        theServicio.descripcion = body.descripcion
        theServicio.duracion = body.duracion
        return theServicio.save()
    }

    // Delete a servicios by id

    public async delete({ params, response }: HttpContextContract) {
        const theServicio = await Servicio.findOrFail(params.id)
        response.status(204)
        return await theServicio.delete()
    }
}
