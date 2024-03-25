import { PassengerType } from '@/enums/passenger.enums'
import axiosClient from './api/axios.service'
import { FlightType } from '@/enums/flight.enums'
import { UserGender } from '@/enums/user.enums'
import { SeatClass } from '@/enums/seat.enums'
import IFlight from '@/interfaces/flight/flight.interface'

interface QueryOption {
  page?: number
  perPage?: number
  // sort?: string
  // order?: string
  // filter?: string
  q?: string
  // searchFields?: string
}

class FlightsService {
  async getFlightsPaginate({ page = 1, perPage = 20, q = '' }: QueryOption) {
    // const accessToken = this.accessToken

    const response = await axiosClient.get('/flights', {
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
  async getFlight(id: string) {
    const response = await axiosClient.get(`/flights/${id}`)
    return response.data.data.doc
  }

  async createFlight(data: IFlight) {
    const response = await axiosClient.post('/flights', data)
    return response.data
  }
  async updateFlight(data: IFlight) {
    const response = await axiosClient.patch(`/flights/${data._id}`, data)
    return response.data
  }
}

export default new FlightsService()
