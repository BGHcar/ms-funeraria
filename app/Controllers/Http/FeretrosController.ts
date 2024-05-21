import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Feretro from 'App/Models/Feretro'
import FeretroValidator from 'App/Validators/FeretroValidator'

export default class FeretrosController {

    // Create a new Feretro

    public async create({ request, response }: HttpContextContract) {
        const data = await request.validate(FeretroValidator)
        const theFeretro = await Feretro.create(data)
        return response.json(theFeretro)
    }

    // Get all Feretros

    public async findAll({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let feretros: Feretro[] = await Feretro.query().paginate(page, perPage)
        return feretros
    }



}
