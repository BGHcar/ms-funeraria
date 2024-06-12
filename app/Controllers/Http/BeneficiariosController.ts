import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Beneficiario from 'App/Models/Beneficiario'
import Cliente from 'App/Models/Cliente'
import Titular from 'App/Models/Titular'
import BeneficiarioValidator from 'App/Validators/BeneficiarioValidator'

export default class BeneficiariosController {

    // Create a new beneficiary
    public async create({ request, response }: HttpContextContract) {
        const data = await request.validate(BeneficiarioValidator)
        let totalData = [0, 0]
        if (data.titular) {
            totalData = await this.findTitularAndPlan(data.titular.id)
        }
        const theTitular = await Titular.findOrFail(data.titular?.id)

        if (totalData[0] < totalData[1]) {
            const existingBeneficiario = await Beneficiario.query()
                .where('cedula', request.body().cedula)
                .where('titular_id', request.body().titular.id)
                .first()

            if (!existingBeneficiario) {
                // Eliminar el campo titular_id del cuerpo de la solicitud
                
                // const { titular_id, ...clienteData } = request.body()

                // // Crear el cliente con los datos filtrados
                // const theClient = await Cliente.create(clienteData)

                // Asignar el cliente_id al objeto de datos del beneficiario
                // data.cliente_id = theClient.id

                // Crear el beneficiario
                const theBeneficiario = await Beneficiario.create({
                    nombre: data.nombre,
                    apellido: data.apellido,
                    cedula: data.cedula,
                    edad: data.edad,
                    telefono: data.telefono,
                    esta_vivo: data.esta_vivo,
                    email: data.email,
                    password: data.password,
                    titular_id: theTitular.id,
                    cliente_id: data.cliente_id
                })

                return response.status(200).json(theBeneficiario)
            } else {
                return response.status(400).json({ message: 'Ya existe este beneficiario con este titular' })
            }
        } else {
            return response.status(400).json({ message: 'No se pueden agregar mas beneficiarios' })
        }
    }
        
    


    // Get all beneficiaries

    public async findAll({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let beneficiarios: Beneficiario[] = await Beneficiario.query().preload('titular').paginate(page, perPage)
        return beneficiarios
    }

    // Get a beneficiary by id

    public async findById({ params, response }: HttpContextContract) {
        try {
            const theBeneficiario = (await Beneficiario.query().where('id', params.id).preload('titular').firstOrFail())
            return theBeneficiario
        } catch (error) {
            return response.status(404).json({ message: 'Beneficiario no encontrado' })
        }
    }

    public async findAllByTitular({ params, response }: HttpContextContract) {
        try {
            let beneficiarios: Beneficiario[] = await Beneficiario.query().where('titular_id', params.id).preload('titular').paginate(1, 20)
            return beneficiarios
        } catch (error) {
            return response.status(404).json({ message: 'Titular no encontrado' })
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

    public async findTitularAndPlan(titular_id: number) {
        const titular = await Titular.query().where('id', titular_id).preload('beneficiarios').firstOrFail()
        const theClient = await Cliente.query().where('id', titular.cliente_id).preload('planes').firstOrFail()
        return ([titular.beneficiarios.length, theClient.planes[0].max_beneficiarios])
    }
    
}
