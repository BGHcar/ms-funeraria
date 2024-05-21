import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cliente from 'App/Models/Cliente'
import Titular from 'App/Models/Titular'
import TitularValidator from 'App/Validators/TitularValidator'


export default class TitularesController {

        // Create a new owner
    
        public async create({ request, response }: HttpContextContract) {
            // const theClient = await Cliente.create(request.body())
            const data = await request.validate(TitularValidator)
            // data.cliente_id = theClient.id
            const theTitular = await Titular.create(data)
            return response.json(theTitular)
        }
    
        // Get all owners
    
        public async findAll({request}: HttpContextContract) {
            const page = request.input('page', 1)
            const perPage = request.input('perPage', 20)
            let titulares: Titular[] = await Titular.query().preload("Beneficiarios").paginate(page, perPage)
            return titulares
        }
    
        // Get an owner by id
    
        public async findById({ params }: HttpContextContract) {
            const theTitular = await Titular.query().where('id', params.id).preload("Beneficiarios").firstOrFail()
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
