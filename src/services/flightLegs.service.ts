import { PassengerType } from '@/enums/passenger.enums'
import axiosClient from './api/axios.service'
import { FlightLegType } from '@/enums/flightLeg.enums'
import { FlightType } from '@/enums/flight.enums'
import { UserGender } from '@/enums/user.enums'
import { TicketClass } from '@/enums/ticket.enums'
import IFlightLeg from '@/interfaces/flight/flightLeg.interface'

interface QueryOption {
  page?: number
  perPage?: number
  // sort?: string
  // order?: string
  // filter?: string
  q?: string
  // searchFields?: string
}

class FlightLegsService {
  async getFlightLegsPaginate({ page = 1, perPage = 20, q = '' }: QueryOption) {
    // const accessToken = this.accessToken

    const response = await axiosClient.get('/flight-legs', {
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
  async getFlightLegsByDepartureTime(departureTime: Date) {
    const response = await axiosClient.get(`/flight-legs/get-by-departure-time`, {
      params: {
        departureTime,
      },
    })
    return response.data.data
  }
  async getFlightLeg(id: string) {
    const response = await axiosClient.get(`/flight-legs/${id}`)
    return response.data.data.doc
  }

  async createFlightLeg(data: IFlightLeg) {
    const response = await axiosClient.post('/flight-legs', data)
    return response.data
  }
  async updateFlightLeg(data: IFlightLeg) {
    const response = await axiosClient.patch(`/flight-legs/${data._id}`, data)
    return response.data
  }
}

export default new FlightLegsService()
