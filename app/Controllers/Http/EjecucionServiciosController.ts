import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EjecucionServicio from 'App/Models/EjecucionServicio'
const { EmailClient } = require("@azure/communication-email");

const connectionString = process.env['CONNECTION_STRING'];
const client = new EmailClient(connectionString);

export default class EjecucionServiciosController {

    /*
    El modelo de ejecucion_servicios tiene la siguiente estructura:

    cliente_id: number
    servicio_id: number
    */




    // Create a new Ejecucion Servicio
    public async create({ request }: HttpContextContract) {
        let body = request.body()
        const theEjecucionServicio = await EjecucionServicio.create(body)
        this.notify()
        return theEjecucionServicio
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

    public async notify() {
        const emailMessage = {
            senderAddress: process.env['SENDER_ADDRESS'],
            content: {
                subject: "Correo electrónico de prueba",
                plainText: "Se ha creado una ejecución de servicio.",
            },
            recipients: {
                to: [{ address: "sr.macm@gmail.com" }],
            },
        };

        const poller = await client.beginSend(emailMessage);
        const result = await poller.pollUntilDone();
    }

}
