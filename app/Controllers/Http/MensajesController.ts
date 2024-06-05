import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mensaje from 'App/Models/Mensaje'
import MensajeValidator from 'App/Validators/MensajeValidator'

export default class MensajesController {

    // Método para crear un mensaje
    public async create({ request, response }: HttpContextContract) {
        const data = await request.validate(MensajeValidator)
        const theMensaje = await Mensaje.create(data)
        return response.json(theMensaje)
    }

    // Método para obtener todos los mensajes paginados
    public async findAll({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let mensajes: Mensaje[] = await Mensaje.query().preload('chat').paginate(page, perPage)
        return mensajes
    }

    // Método para encontrar mensajes por chat_id
    public async findByChatId({ params }: HttpContextContract) {
        const { id } = params; // Usamos el parámetro id que viene de la URL
        const mensajes: Mensaje[] = await Mensaje.query().where('chat_id', id).preload('chat');
        return mensajes;
    }

    // Método para obtener un mensaje por su ID
    public async findById({ params }: HttpContextContract) {
        const theMensaje: Mensaje = await Mensaje.query().where('id', params.id).preload('chat').firstOrFail()
        return theMensaje
    }

    // Método para actualizar un mensaje
    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theMensaje = await Mensaje.findOrFail(params.id)
        theMensaje.contenido = body.contenido
        return theMensaje.save()
    }

    // Método para eliminar un mensaje
    public async delete({ params, response }: HttpContextContract) {
        const theMensaje = await Mensaje.findOrFail(params.id)
        response.status(204)
        return await theMensaje.delete()
    }
}
