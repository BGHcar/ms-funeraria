import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Chat from 'App/Models/Chat'

export default class ChatsController {
    // Create 

    public async create({ request }: HttpContextContract) {
        let body = request.body()
        const theChat = await Chat.create(body)
        return theChat
    }

    // Get 

    public async findAll({request}: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let chat:Chat[] = await Chat.query().paginate(page, perPage)
        return chat
    }
      // Get  id

      public async findById({ params }: HttpContextContract) {
        const theChat = await Chat.findOrFail(params.id)
        return theChat
    }

    // Update  id

    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theChat = await Chat.findOrFail(params.id)
        theChat.chat = body.chat
     
        return theChat.save()
    }

    // Delete a client by id

    public async delete({ params, response }: HttpContextContract) {
        const theChat = await Chat.findOrFail(params.id)
        response.status(204)
        return await theChat.delete()
    }
    public async shwo({params}:HttpContextContract){
        return Chat.query().where("id",params.id).preload('mensajes');
    }
}
