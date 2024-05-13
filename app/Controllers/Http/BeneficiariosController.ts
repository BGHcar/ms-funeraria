import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Beneficiario from 'App/Models/Beneficiario'
import Plan from 'App/Models/Plan'
import Titular from 'App/Models/Titular'
import BeneficiarioValidator from 'App/Validators/BeneficiarioValidator'

export default class BeneficiariosController {

    // Create a new beneficiary

    public async create({ request, response }: HttpContextContract) {

        const totalData = this.findTitularAndPlan(request.body().titular_id, request.body().plan_id)
        console.log("Estos son los beneficiarios: ", totalData[0], "Estos son los maximos que se pueden tener: ", totalData[1])
        if (totalData[0].length < totalData[1]) {
        const data = await request.validate(BeneficiarioValidator)
        const theBeneficiario = await Beneficiario.create(data)
        return response.status(200).json(theBeneficiario)
        }else{
            return response.status(400).json({message: 'No se pueden agregar mas beneficiarios'})
        }

    }

    // Get all beneficiaries

    public async findAll({request}: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let beneficiarios:Beneficiario[] = await Beneficiario.query().paginate(page, perPage)
        return beneficiarios
    }

    // Get a beneficiary by id

    public async findById({ params }: HttpContextContract) {
        const theBeneficiario = await Beneficiario.findOrFail(params.id)
        return theBeneficiario
    }

    // Update a beneficiary by id

    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theBeneficiario = await Beneficiario.findOrFail(params.id)
        theBeneficiario.nombre = body.nombre
        theBeneficiario.apellido = body.apellido
        theBeneficiario.cedula = body.cedula
        theBeneficiario.telefono = body.telefono
        theBeneficiario.titular_id = body.titular_id
        theBeneficiario.cliente_id = body.cliente_id
        return theBeneficiario.save()
    }

    // Delete a beneficiary by id

    public async delete({ params, response }: HttpContextContract) {
        const theBeneficiario = await Beneficiario.findOrFail(params.id)
        response.status(204)
        return await theBeneficiario.delete()
    }
    
    public async findTitularAndPlan( titular_id: number, plan_id: number) {
        const titular = await Titular.query().where('id', titular_id).preload('Beneficiarios').firstOrFail()
        const thePlan = await Plan.findOrFail(plan_id)
        console.log("Estos son los beneficiarios : ", titular.Beneficiarios, "Este es el plan: ", thePlan)
        return (titular.Beneficiarios, thePlan.max_beneficiarios)
    }
}
