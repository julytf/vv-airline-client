import { PassengerType } from '@/enums/passenger.enums'
import axiosClient from './api/axios.service'
import { FlightLegType } from '@/enums/flightLeg.enums'
import { FlightType } from '@/enums/flight.enums'
import { UserGender } from '@/enums/user.enums'
import { SeatClass } from '@/enums/seat.enums'

class FilesService {
  async uploadImage(file: File) {
    const response = await axiosClient.post('/files/upload-image', file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data.data.filename
  }
}

export default new FilesService()
