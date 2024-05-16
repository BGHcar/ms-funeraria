import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Desplazamiento from 'App/Models/Desplazamiento'
import DesplazamientoValidator from 'App/Validators/DesplazamientoValidator'

export default class DesplazamientosController {

    // Create a new Desplazamiento

    public async create({ request, response }: HttpContextContract) {
        const desplazamientoData = await request.validate(DesplazamientoValidator);

        // Realizar la solicitud a la API para obtener los datos del aeropuerto
        const apiResponse = await fetch(`https://api-colombia.com/api/v1/Airport/${desplazamientoData.id_aeropuerto}`);
        const data: any = await apiResponse.json();
        console.log("Este es el nombre del aeropuerto : ", data.name);

        // Asignar el nombre del aeropuerto a desplazamientoData
        desplazamientoData.nombre_aeropuerto = data.name;

        // Crear el registro en la base de datos
        const theDesplazamiento = await Desplazamiento.create(desplazamientoData);

        // Devolver la respuesta JSON
        return response.json(theDesplazamiento);
    }


    // Get all Desplazamientos

    public async findAll({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let desplazamientos: Desplazamiento[] = await Desplazamiento.query().paginate(page, perPage)
        return desplazamientos
    }

    public async searchApi(string) {
        const apiResponse = await fetch(`https://api-colombia.com/api/v1/Airport/${string}`);
        const data: any = await apiResponse.json();
        console.log(data);
    }


}
