import axiosClient from './api/axios.service'

class PaymentService {
  async getPaymentIntent(bookingId: string) {
    const response = await axiosClient.get('/payment/get-payment-intent', { params: { bookingId } })
    return response.data.data.paymentIntent
  }
  async paymentSuccess(bookingId: string) {
    const response = await axiosClient.get('/payment/payment-success', { params: { bookingId } })
    return response.data
  }
}

export default new PaymentService()
