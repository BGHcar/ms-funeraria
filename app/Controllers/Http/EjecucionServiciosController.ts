import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ciudad from 'App/Models/Ciudad';
import Cliente from 'App/Models/Cliente';
import EjecucionServicio from 'App/Models/EjecucionServicio'
import Sede from 'App/Models/Sede';
import Servicio from 'App/Models/Servicio';
import EjecucionservicioValidator from 'App/Validators/EjecucionservicioValidator';
const { EmailClient } = require("@azure/communication-email");

const connectionString = process.env['CONNECTION_STRING'];
const client = new EmailClient(connectionString);

export default class EjecucionServiciosController {

    // Create a new Ejecucion Servicio
    public async create({ request, response }: HttpContextContract) {
        const data = await request.validate(EjecucionservicioValidator)
        data.token = this.generateRandomToken()
        this.searchClientAndService(data.cliente_id, data.servicio_id, data.token)
        const theEjecucionServicio = await EjecucionServicio.create(data)

        return response.json(theEjecucionServicio)
    }

    // Get all Ejecucion Servicio
    public async findAll({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)

        let ejecucion_servicios: EjecucionServicio[] = await EjecucionServicio
            .query()
            .preload('cliente', (query) => {
                query.select(['nombre', 'apellido', 'edad', 'cedula', 'telefono', 'email'])
            })
            .preload('servicio', (query) => {
                query.select(['nombre', 'precio', 'descripcion', 'duracion'])
            })
            .preload('chat', (query) => {
                query.preload('mensajes', (subQuery) => {
                    subQuery.select(['contenido', 'user_id'])
                })
            })
            .paginate(page, perPage)

        return ejecucion_servicios
    }

    // Get a Departament by id

    public async findById({ params }: HttpContextContract) {
        let theEjecucionServicio: EjecucionServicio = await EjecucionServicio
            .query()
            .where('id', params.id)
            .preload('cliente')
            .preload('servicio')
            .preload('chat')
            .preload('comentarios')
            .firstOrFail()
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


    public async notify(cliente: Cliente, servicio: Servicio, token: string) {
        try {
            // Cargar la relación de cremación y sepultura junto con las salas correspondientes
            await servicio.load('cremacion', (query) => {
                query.preload('sala');
            });
            await servicio.load('sepultura', (query) => {
                query.preload('sala');
            });

            // Obtener la información de cremación y sepultura desde las relaciones cargadas
            const cremacion = servicio.cremacion;
            let cremacionSedeName = "";
            let cremacionCiudadName = "";
            let sepulturaSedeName = "";
            let sepulturaCiudadName = "";

            if (cremacion) {
                cremacionSedeName = (await Sede.findOrFail(cremacion.sala.sede_id)).nombre
                cremacionCiudadName = (await Ciudad.findOrFail(Sede.findOrFail(cremacion.sala.sede_id))).nombre
            }
            const sepultura = servicio.sepultura;
            if (sepultura) {
                sepulturaSedeName = (await Sede.findOrFail(sepultura.sala.sede_id)).nombre
                sepulturaCiudadName = (await Ciudad.findOrFail(Sede.findOrFail(sepultura.sala.sede_id))).nombre
            }

            // Obtener el nombre de la sala de cremación
            const nombreSalaCremacion = cremacion ? cremacion.sala.nombre : "No asignada";

            // Obtener el nombre de la sala de sepultura
            const nombreSalaSepultura = sepultura ? sepultura.sala.nombre : "No asignada";

            const emailMessage = {
                senderAddress: process.env['SENDER_ADDRESS'],
                content: {
                    subject: "Se ha creado la ejecución de servicio.",
                    plainText: `Hola ${cliente.nombre} ${cliente.apellido},\n` +
                        `Usted ha solicitado ${servicio.nombre} de funeraria\n` +
                        `La sala asignada para la Sepultura es ${nombreSalaSepultura}.\n` +
                        `la sede de la sepultura es ${sepulturaSedeName} en la ciudad de ${sepulturaCiudadName}.\n` +
                        `La sala asignada para la Cremación es ${nombreSalaCremacion}.\n` +
                        `Su token para acceder al chat es: ${token}.`
                },
                recipients: {
                    to: [{ address: cliente.email }],
                },
            };

            const poller = await client.beginSend(emailMessage);
            const result = await poller.pollUntilDone();

            console.log("Email sent with status: " + result.status);
        } catch (error) {
            console.error('Error al enviar el correo electrónico:', error)
            throw new Error('Error al enviar el correo electrónico.')
        }
    }



    public async searchClientAndService(id_client: number, id_service: number, token: string) {
        const cliente: Cliente = await Cliente.findOrFail(id_client)
        const servicio: Servicio = await Servicio.findOrFail(id_service)
        this.notify(cliente, servicio, token)
    }

    generateRandomToken() { // Generate a random token de 10 caracteres
        return Math.random().toString(36).substring(2, 15);
    }

}
