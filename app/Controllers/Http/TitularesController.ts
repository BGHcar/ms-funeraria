import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Titular from 'App/Models/Titular'


export default class TitularesController {
    
        // Create a new owner
    
        public async create({ request }: HttpContextContract) {
            let body = request.body()
            const theTitular = await Titular.create(body)
            return theTitular
        }
    
        // Get all owners
    
        public async findAll({request}: HttpContextContract) {
            const page = request.input('page', 1)
            const perPage = request.input('perPage', 20)
            let titulares:Titular[] = await Titular.query().paginate(page, perPage)
            return titulares
        }
    
        // Get an owner by id
    
        public async findById({ params }: HttpContextContract) {
            const theTitular = await Titular.findOrFail(params.id)
            return theTitular
        }

        // Update an owner by id

        public async update({ params, request }: HttpContextContract) {
            const body = request.body()
            const theTitular = await Titular.findOrFail(params.id)
            theTitular.nombre = body.nombre
            theTitular.apellido = body.apellido
            theTitular.cedula = body.cedula
            theTitular.telefono = body.telefono
            return theTitular.save()
        }

        // Delete an owner by id

        public async delete({ params, response }: HttpContextContract) {
            const theTitular = await Titular.findOrFail(params.id)
            response.status(204)
            return await theTitular.delete()
        }


}
