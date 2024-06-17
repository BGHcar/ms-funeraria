import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

class EpaycoService {
    private publicKey: string
    private privateKey: string

    constructor() {
        this.publicKey = Env.get('EPAYCO_PUBLIC_KEY')
        this.privateKey = Env.get('EPAYCO_PRIVATE_KEY')
    }

    public async createPayment(data: any) {
        try {
            console.log(JSON.stringify(data))
            const response = await axios.post('https://api.secure.payco.co/checkout', {
                ...data,
                public_key: this.publicKey,
            })
            return response.data
        } catch (error) {
            console.error('Error creating payment:', error)
            throw error
        }
    }

    public async getPaymentStatus(ref: string) {
        try {
            const response = await axios.get(`https://secure.payco.co/validation/v1/reference/${ref}`)
            return response.data
        } catch (error) {
            console.error('Error fetching payment status:', error)
            throw error
        }
    }
}

export default new EpaycoService()
