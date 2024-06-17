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
        data.token = this.generateRandomToken()
        this.searchClientAndService(data.cliente_id, data.servicio_id, data.token)
        const theEjecucionServicio = await EjecucionServicio.create(data)

        return response.json(theEjecucionServicio)
    }
    public async findAllByTitular({ params, response }: HttpContextContract) {
        try {
            let beneficiarios: EjecucionServicio[] = await EjecucionServicio.query().where('cliente_id', params.id).preload('cliente').paginate(1, 20)
            return beneficiarios
        } catch (error) {
            return response.status(404).json({ message: 'Titular no encontrado' })
        }
    }
    // Get all Ejecucion Servicio
    public async findAll({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)

        let ejecucion_servicios: EjecucionServicio[] = await EjecucionServicio
            .query()
            .preload('cliente', (query) => {
                query.select(['nombre','email'])
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
            // Cargar la relación de cremación junto con la sala, la sede y la ciudad correspondientes
            await servicio.load('cremacion', (query) => {
                query.preload('sala', (query) => {
                    query.preload('sede', (query) => {
                        query.preload('ciudades');
                    });
                });
            });
            // Cargar la relación de sepultura junto con la sala, la sede y la ciudad correspondientes
            await servicio.load('sepultura', (query) => {
                query.preload('sala', (query) => {
                    query.preload('sede', (query) => {
                        query.preload('ciudades');
                    });
                });
            });
    
            // Obtener la información de cremación y sepultura desde las relaciones cargadas
            const cremacion = servicio.cremacion;
            const sepultura = servicio.sepultura;
    
            // Obtener el nombre de la sala de cremación, la ciudad y el nombre de la sede asociada a la sala de cremación
            const nombreSalaCremacion = cremacion ? cremacion.sala.nombre : "No asignada";
            const ciudadSalaCremacion = cremacion ? cremacion.sala.sede.ciudades.nombre : "No asignada";
            const nombreSedeCremacion = cremacion ? cremacion.sala.sede.nombre : "No asignada";
    
            // Obtener el nombre de la sala de sepultura, la ciudad y el nombre de la sede asociada a la sala de sepultura
            const nombreSalaSepultura = sepultura ? sepultura.sala.nombre : "No asignada";
            const ciudadSalaSepultura = sepultura ? sepultura.sala.sede.ciudades.nombre : "No asignada";
            const nombreSedeSepultura = sepultura ? sepultura.sala.sede.nombre : "No asignada";
    
            const emailMessage = {
                senderAddress: process.env['SENDER_ADDRESS'],
                content: {
                    subject: "Se ha creado la ejecución de servicio.",
                    plainText: `Hola ${cliente.nombre},\n` +
                        `Usted ha solicitado ${servicio.nombre} de funeraria.\n` +
                        `Para la Cremación:\n` +
                        `La sala asignada es ${nombreSalaCremacion}, en la ciudad de ${ciudadSalaCremacion}, en la sede ${nombreSedeCremacion}.\n` +
                        `Para la Sepultura:\n` +
                        `La sala asignada es ${nombreSalaSepultura}, en la ciudad de ${ciudadSalaSepultura}, en la sede ${nombreSedeSepultura}.\n` +
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
