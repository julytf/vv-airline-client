import { PassengerType } from '@/enums/passenger.enums'
import axiosClient from './api/axios.service'
import { FlightLegType } from '@/enums/flightLeg.enums'
import { FlightType } from '@/enums/flight.enums'
import { UserGender } from '@/enums/user.enums'
import { TicketClass } from '@/enums/ticket.enums'
import IFlightRoute from '@/interfaces/flight/flightRoute.interface'

interface QueryOption {
  page?: number
  perPage?: number
  // sort?: string
  // order?: string
  // filter?: string
  q?: string
  // searchFields?: string
}

class FlightRoutesService {
  async getFlightRoutesPaginate({ page = 1, perPage = 20, q = '' }: QueryOption) {
    // const accessToken = this.accessToken

    const response = await axiosClient.get('/flight-routes', {
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
  async getAllFlightRoutes() {
    const response = await axiosClient.get(`/flight-routes/all`)
    return response.data.data
  }
  async getFlightRoute(id: string) {
    const response = await axiosClient.get(`/flight-routes/${id}`)
    return response.data.data.doc
  }

  async createFlightRoute(data: IFlightRoute) {
    const response = await axiosClient.post('/flight-routes', data)
    return response.data
  }
  async updateFlightRoute(data: IFlightRoute) {
    const response = await axiosClient.patch(`/flight-routes/${data._id}`, data)
    return response.data
  }
}

export default new FlightRoutesService()
