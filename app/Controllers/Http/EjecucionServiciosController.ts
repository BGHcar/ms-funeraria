import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cliente from 'App/Models/Cliente';
import EjecucionServicio from 'App/Models/EjecucionServicio'
import Servicio from 'App/Models/Servicio';
import EjecucionservicioValidator from 'App/Validators/EjecucionservicioValidator';
const { EmailClient } = require("@azure/communication-email");

const connectionString = process.env['CONNECTION_STRING'];
const client = new EmailClient(connectionString);

export default class EjecucionServiciosController {

    // Create a new Ejecucion Servicio
    public async create({ request, response }: HttpContextContract) {
        const data = await request.validate(EjecucionservicioValidator)
        const theEjecucionServicio = await EjecucionServicio.create(data)
        this.searchClientAndService(data.cliente_id, data.servicio_id)
        return response.json(theEjecucionServicio)
    }

    // Get all Ejecucion Servicio
    public async findAll({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let ejecucion_servicios: EjecucionServicio[] = await EjecucionServicio.query().preload('cliente').preload('servicio').preload('chat').preload('comentarios').paginate(page, perPage)
        return ejecucion_servicios
    }

    // Get a Departament by id

    public async findById({ params }: HttpContextContract) {
        let theEjecucionServicio: EjecucionServicio = await EjecucionServicio.query().where('id', params.id).preload('cliente').preload('servicio').preload('chat').preload('comentarios').firstOrFail()
        return theEjecucionServicio
    }

    // Update a driver by id

    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theEjecucionServicio = await EjecucionServicio.findOrFail(params.id)
        theEjecucionServicio.cliente_id = body.cliente_id
        theEjecucionServicio.servicio_id = body.servicio_id
        return theEjecucionServicio.save()
    }

    // Delete a driver by id

    public async delete({ params, response }: HttpContextContract) {
        const theEjecucionServicio = await EjecucionServicio.findOrFail(params.id)
        response.status(204)
        return await theEjecucionServicio.delete()
    }

    public async notify(cliente: Cliente, servicio: Servicio) {

        const emailMessage = {
            senderAddress: process.env['SENDER_ADDRESS'],
            content: {
                subject: "Se ha creado la ejecución de servicio.",
                plainText: `Hola ${cliente.nombre}, se ha creado la ejecución del servicio ${servicio.nombre}.`
            },
            recipients: {
                to: [{ address: cliente.email }],
            },
        };

        const poller = await client.beginSend(emailMessage);
        const result = await poller.pollUntilDone();

        console.log("Email sent with status: " + result.status);
    }

    public async searchClientAndService( id_client: number, id_service: number) {
        const cliente: Cliente = await Cliente.findOrFail(id_client)
        const servicio: Servicio = await Servicio.findOrFail(id_service)
        this.notify(cliente, servicio)
    }

}
