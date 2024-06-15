import Route from '@ioc:Adonis/Core/Route'

Route.post('/payments', 'PaymentsController.createPayment')
Route.get('/payments/status', 'PaymentsController.getPaymentStatus')
