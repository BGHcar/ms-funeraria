import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EpaycoService from 'App/Services/EpaycoService'

export default class PaymentsController {
    public async createPayment({ request, response }: HttpContextContract) {
        const paymentData = request.only([
            'name',
            'amount',
            'description',
            'currency', // 'cop'
            'country', // 'CO'
            // Agrega más campos según sea necesario
        ])

        try {
            const paymentResponse = await EpaycoService.createPayment(paymentData)
            return response.status(200).send(paymentResponse)
        } catch (error) {
            return response.status(500).send('Error creating payment')
        }
    }

    public async getPaymentStatus({ request, response }: HttpContextContract) {
        const reference = request.input('reference')

        try {
            const statusResponse = await EpaycoService.getPaymentStatus(reference)
            return response.status(200).send(statusResponse)
        } catch (error) {
            return response.status(500).send('Error fetching payment status')
        }
    }
}
