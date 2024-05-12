import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Chat from 'App/Models/Chat'
import ChatValidator from 'App/Validators/ChatValidator'

export default class ChatsController {


    // Create 

    public async create({ request,response }: HttpContextContract) {
        const data = await request.validate(ChatValidator)
        const theChat = await Chat.create(data)
        return response.json(theChat)
    }

    // Get 

    public async findAll({request}: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let chat:Chat[] = await Chat.query().preload('mensajes').paginate(page, perPage)
        return chat
    }
      // Get  id

    public async findById({ params }: HttpContextContract) {
        let theChat : Chat = await Chat.query().where('id', params.id).preload('mensajes').firstOrFail()
        return theChat
    }
    // Delete a client by id

    public async delete({ params, response }: HttpContextContract) {
        const theChat = await Chat.findOrFail(params.id)
        response.status(204)
        return await theChat.delete()
    }
}
