import { PassengerType } from '@/enums/passenger.enums'
import axiosClient from './api/axios.service'
import { FlightLegType } from '@/enums/flightLeg.enums'
import { FlightType } from '@/enums/flight.enums'
import { UserGender } from '@/enums/user.enums'
import { TicketClass } from '@/enums/ticket.enums'

class FilesService {
  async uploadImage(file: File) {
    const response = await axiosClient.post(
      '/files/upload-image',
      { image: file },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
    console.log('response', response)
    return response.data.data.filePath
  }
}

export default new FilesService()
