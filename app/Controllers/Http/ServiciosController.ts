import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cremacion from 'App/Models/Cremacion'
import Sepultura from 'App/Models/Sepultura'
import Servicio from 'App/Models/Servicio'
import Traslado from 'App/Models/Traslado'
import ServicioValidator from 'App/Validators/ServicioValidator'

export default class ServiciosController {


    //create a new servicio

    public async create({ request, response }: HttpContextContract) {
        const data = await request.validate(ServicioValidator)
        const theServicio = await Servicio.create(data)
        if(data.cremacion){
            let theCremation:Cremacion=await Cremacion.findOrFail(data.cremacion.id)
            theCremation.servicio_id=theServicio.id
            theCremation.save()
        }
        if(data.sepultura){
            let theSepultura:Sepultura=await Sepultura.findOrFail(data.sepultura.id)
            theSepultura.servicio_id=theServicio.id
            theSepultura.save()
        }
        if(data.traslado){
            let theTraslado:Traslado=await Traslado.findOrFail(data.traslado.id)
            theTraslado.servicio_id=theServicio.id
            theTraslado.save()
        }
        return response.json(theServicio)
    }

    // Get all servicios
    public async findAll({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let servicio: Servicio[] = await Servicio.query()
        .preload('planes')
        .preload('clientes')
        .preload('traslado')
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
            .preload('traslado')
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
