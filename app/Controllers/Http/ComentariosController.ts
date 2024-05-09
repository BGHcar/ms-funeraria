 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comentario from 'App/Models/Comentario';

export default class ComentrariosController {
    //Create
    public async store({request}:HttpContextContract){
     const body = request.body();
     const theComentario=await Comentario.create(body);
     return theComentario
    }
        
    //Get
    public async findAll({request}: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let comentario:Comentario[] = await Comentario.query().paginate(page, perPage)
        return comentario
    }
    //get comentarios id
    public async findById({ params }: HttpContextContract) {
        const theComentario = await Comentario.findOrFail(params.id)
        return theComentario
    }
    //upDate pro id
    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theComentario = await Comentario.findOrFail(params.id)
        theComentario.comentario = body.comentario
        return theComentario.save()
    }

    //detele
    public async delete({ params, response }: HttpContextContract) {
        const theComentario = await Comentario.findOrFail(params.id)
        response.status(204)
        return await theComentario.delete()
    }
}
