import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comentario from 'App/Models/Comentario'


export default class EjecucionServiciosController {

    /*
    El modelo de comentarios tiene la siguiente estructura:

    contenido: string
    Eservicio_id: number

    */

    // Create a new Comentario
    public async create({ request }: HttpContextContract) {
        let body = request.body()
        const theComentario = await Comentario.create(body)
        return theComentario
    }

    // Get all Comentarios
    public async findAll({request}: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let comentarios:Comentario[] = await Comentario.query().paginate(page, perPage)
        return comentarios
    }

    // Get a Comentario by id

    public async findById({ params }: HttpContextContract) {
        const theComentario = await Comentario.findOrFail(params.id)
        return theComentario
    }

    public async findByServicioId({ params }: HttpContextContract) {
        // Encuentra los comentarios por el ID de la llave foránea Eservicio_id
        const comentarios = await Comentario.query().where('Eservicio_id', params.id).exec()
        return comentarios
    }


    // Update a comentario by id

    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theComentario = await Comentario.findOrFail(params.id)
        theComentario.contenido = body.contenido
        return theComentario.save()
    }

    // Delete a driver by id

    public async delete({ params, response }: HttpContextContract) {
        const theComentario = await Comentario.findOrFail(params.id)
        response.status(204)
        return await theComentario.delete()
    }

}
