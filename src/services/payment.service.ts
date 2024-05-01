import { FlightType } from '@/enums/flight.enums'
import axiosClient from './api/axios.service'

interface RefundData {
  pnr?: string
  email?: string
  [FlightType.OUTBOUND]: boolean[]
  [FlightType.INBOUND]: boolean[]
}

class PaymentService {
  async getPaymentIntent(bookingId: string) {
    const response = await axiosClient.get('/payment/get-payment-intent', { params: { bookingId } })
    return response.data.data.paymentIntent
  }
  async paymentSuccess(bookingId: string) {
    const response = await axiosClient.get('/payment/payment-success', { params: { bookingId } })
    return response.data
  }
  async refund(bookingId: string, refundData: RefundData) {
    const response = await axiosClient.post(`/payment/${bookingId}/refund`, refundData)
    return response.data.data.booking
  }
  async paymentSuccessByStaff(bookingId: string) {
    const response = await axiosClient.get('/payment/payment-success-by-staff', { params: { bookingId } })
    return response.data
  }
  async refundByStaff(bookingId: string, refundData: RefundData) {
    const response = await axiosClient.post(`/payment/${bookingId}/refund-by-staff`, refundData)
    return response.data.data.booking
  }
}

export default new PaymentService()
