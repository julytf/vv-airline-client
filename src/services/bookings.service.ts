import { PassengerType } from '@/enums/passenger.enums'
import axiosClient from './api/axios.service'
import { FlightLegType } from '@/enums/flightLeg.enums'
import { FlightType } from '@/enums/flight.enums'
import { UserGender } from '@/enums/user.enums'
import { TicketClass } from '@/enums/ticket.enums'

interface QueryOption {
  page?: number
  perPage?: number
  // sort?: string
  // order?: string
  // filter?: string
  q?: string
  // searchFields?: string
}

class BookingsService {
  async getBookingsPaginate({ page = 1, perPage = 20, q = '' }: QueryOption) {
    // const accessToken = this.accessToken

    const response = await axiosClient.get('/bookings', {
      params: {
        page,
        perPage,
        q,
      },
      headers: {},
    })
    const data = response.data.data
    return data
  }
  async getBooking(id: string) {
    const response = await axiosClient.get(`/bookings/${id}`)
    return response.data.data.doc
  }
}

export default new BookingsService()
