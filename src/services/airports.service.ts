import { PassengerType } from '@/enums/passenger.enums'
import axiosClient from './api/axios.service'
import { FlightLegType } from '@/enums/flightLeg.enums'
import { FlightType } from '@/enums/flight.enums'
import { UserGender } from '@/enums/user.enums'
import { TicketClass } from '@/enums/ticket.enums'
import IAirport from '@/interfaces/flight/airport.interface'

interface QueryOption {
  page?: number
  perPage?: number
  // sort?: string
  // order?: string
  // filter?: string
  q?: string
  // searchFields?: string
}

class AirportsService {
  async getAirportsPaginate({ page = 1, perPage = 20, q = '' }: QueryOption) {
    // const accessToken = this.accessToken

    const response = await axiosClient.get('/airports', {
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
  async getAllAirports(): Promise<IAirport[]> {
    const response = await axiosClient.get(`/airports/all`)
    return response.data.data
  }

  async getAirport(id: string) {
    const response = await axiosClient.get(`/airports/${id}`)
    return response.data.data.doc
  }

  async createAirport(data: IAirport) {
    const response = await axiosClient.post('/airports', data)
    return response.data
  }
  async updateAirport(data: IAirport) {
    const response = await axiosClient.patch(`/airports/${data._id}`, data)
    return response.data
  }
}

export default new AirportsService()
