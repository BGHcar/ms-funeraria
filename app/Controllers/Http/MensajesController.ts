import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mensaje from 'App/Models/Mensaje'
import MensajeValidator from 'App/Validators/MensajeValidator'

export default class MensajesController {



    // Create 
    public async create({ request, response }: HttpContextContract) {
        const data = await request.validate(MensajeValidator)
        const theMensaje = await Mensaje.create(data)
        return response.json(theMensaje)
    }

    // Get 
    public async findAll({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let mensaje: Mensaje[] = await Mensaje.query().preload('chat').paginate(page, perPage)
        return mensaje
    }

    // Get by id

    public async findById({ params }: HttpContextContract) {
        let theMensaje: Mensaje = await Mensaje.query().where('id', params.id).preload('chat').firstOrFail()
        return theMensaje
    }

    // Update 

    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theMensaje = await Mensaje.findOrFail(params.id)
        theMensaje.contenido = body.mensaje
        return theMensaje.save()
    }

    // Delete 

    public async delete({ params, response }: HttpContextContract) {
        const theMensaje = await Mensaje.findOrFail(params.id)
        response.status(204)
        return await theMensaje.delete()
    }
}
