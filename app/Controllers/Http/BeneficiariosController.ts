import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Beneficiario from 'App/Models/Beneficiario'
import Suscripcion from 'App/Models/Suscripcion'
import BeneficiarioValidator from 'App/Validators/BeneficiarioValidator'

export default class BeneficiariosController {

    // Create a new beneficiary
    public async create({ request, response }: HttpContextContract) {
        try {
            const totalData = await this.findPlanAndBeneficiarios(request.body().cliente_id);
            console.log("Estos son los beneficiarios: ", totalData[0], "Estos son los maximos que se pueden tener: ", totalData[1]);
            const numberOfBeneficiaries: number = totalData[0];
            const maxBeneficiarios: number = totalData[1];
    
            if (typeof numberOfBeneficiaries === 'number' && numberOfBeneficiaries < maxBeneficiarios) {
                const data = await request.validate(BeneficiarioValidator);
    
                // Verificar si ya existe un beneficiario con los mismos datos
                const existingBeneficiario = await Beneficiario.query()
                    .where('titular_id', data.titular_id)
                    .where('cedula', data.cedula)
                    .first();
    
                if (existingBeneficiario) {
                    return response.status(400).json({ message: 'Ya existe un beneficiario con los mismos datos' });
                }
    
                const theBeneficiario = await Beneficiario.create(data);
                return response.status(200).json(theBeneficiario);
            } else {
                return response.status(400).json({ message: "Estos son los beneficiarios: " + totalData[0] + ". Estos son los maximos que se pueden tener: " + totalData[1] })
            }
        } catch (error) {
            return response.status(500).json({ message: 'Error interno del servidor' });
        }
    }
        
    

    // Get all beneficiaries

    public async findAll({ request, response }: HttpContextContract) {
        try {
            const page = request.input('page', 1)
            const perPage = request.input('perPage', 20)
            let beneficiarios: Beneficiario[] = await Beneficiario.query().paginate(page, perPage)
            return beneficiarios
        } catch (error) {
            return response.status(500).json({ message: 'Error interno del servidor' })
        }
    }

    // Get a beneficiary by id

    public async findById({ params, response }: HttpContextContract) {
        try {
            const theBeneficiario = await Beneficiario.findOrFail(params.id)
            return theBeneficiario
        } catch (error) {
            return response.status(404).json({ message: 'Beneficiario no encontrado' })
        }
    }

    // Update a beneficiary by id

    public async update({ params, request, response }: HttpContextContract) {
        try {
            const body = request.body()
            const theBeneficiario = await Beneficiario.findOrFail(params.id)
            theBeneficiario.merge({
                nombre: body.nombre,
                apellido: body.apellido,
                cedula: body.cedula,
                telefono: body.telefono,
                cliente_id: body.cliente_id
            })
            await theBeneficiario.save()
            return response.status(200).json(theBeneficiario)
        } catch (error) {
            return response.status(500).json({ message: 'Error interno del servidor' })
        }
    }

    // Delete a beneficiary by id

    public async delete({ params, response }: HttpContextContract) {
        try {
            const theBeneficiario = await Beneficiario.findOrFail(params.id)
            await theBeneficiario.delete()
            return response.status(204)
        } catch (error) {
            return response.status(500).json({ message: 'Error interno del servidor' })
        }
    }
    
    public async findPlanAndBeneficiarios(cliente_id: number) {
        try {
            const suscripcion = await Suscripcion.query()
                .where('cliente_id', cliente_id)
                .preload('plan')
                .firstOrFail()
    
            const cliente = await suscripcion.related('cliente').query().firstOrFail()
    
            const beneficiarios = await Beneficiario.query().where('cliente_id', cliente.id)
    
            console.log("Beneficiarios:", beneficiarios.map(b => b.toJSON())) // Convertir modelos a objetos JSON
    
            const totalBeneficiaries = beneficiarios.length
    
            return [totalBeneficiaries, suscripcion.plan.max_beneficiarios]
        } catch (error) {
            throw new Error('Suscripción no encontrada para el cliente')
        }
    }
    
}
