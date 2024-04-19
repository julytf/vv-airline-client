import { PassengerType } from '@/enums/passenger.enums'
import axiosClient from './api/axios.service'
import { FlightLegType } from '@/enums/flightLeg.enums'
import { FlightType } from '@/enums/flight.enums'
import { UserGender } from '@/enums/user.enums'
import { TicketClass } from '@/enums/ticket.enums'
import IAircraft from '@/interfaces/aircraft/aircraft.interface'
import IAircraftModel from '@/interfaces/aircraft/aircraftModel.interface'

interface QueryOption {
  page?: number
  perPage?: number
  // sort?: string
  // order?: string
  // filter?: string
  q?: string
  // searchFields?: string
}

class AircraftModelsService {
  async getAircraftModelsPaginate({ page = 1, perPage = 20, q = '' }: QueryOption) {
    // const accessToken = this.accessToken

    const response = await axiosClient.get('/aircraft-models', {
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
  async getAllAircraftModel() {
    const response = await axiosClient.get(`/aircraft-models/all`)
    return response.data.data
  }
  async getAircraftModel(id: string) {
    const response = await axiosClient.get(`/aircraft-models/${id}`)
    return response.data.data.doc
  }

  async createAircraftModel(data: IAircraftModel) {
    const response = await axiosClient.post('/aircraft-models', data)
    return response.data
  }
  async updateAircraftModel(data: IAircraftModel) {
    const response = await axiosClient.patch(`/aircraft-models/${data._id}`, data)
    return response.data
  }
}

export default new AircraftModelsService()
