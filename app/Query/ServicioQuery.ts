import Sepultura from 'App/Models/Sepultura'
import Cremacion from 'App/Models/Cremacion'

export default class ServicioQueries {
    public static async obtenerDetallesDeSepulturaYCremacion(servicioId: number) {
        try {
            // Consultar la sepultura asociada al servicio
            const sepultura = await Sepultura.query()
                .where('servicio_id', servicioId)
                .firstOrFail()

            // Consultar la cremación asociada al servicio
            const cremacion = await Cremacion.query()
                .where('servicio_id', servicioId)
                .firstOrFail()

            return { sepultura, cremacion }
        } catch (error) {
            // Manejar cualquier error que pueda ocurrir, como si no se encuentra la sepultura o cremación asociada
            console.error('Error al obtener detalles de sepultura y cremación:', error)
            throw new Error('No se encontró la sepultura o cremación asociada al servicio.')
        }
    }
}
