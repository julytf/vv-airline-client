import { UserGender } from '@/enums/user.enums'
import { PassengerType } from '@/enums/passenger.enums'

export interface IPassenger {
  type: PassengerType
  // email?: string
  // phoneNumber?: string
  firstName: string
  lastName: string
  dateOfBirth?: Date
  gender?: UserGender
  // booking: string
}

export default IPassenger
