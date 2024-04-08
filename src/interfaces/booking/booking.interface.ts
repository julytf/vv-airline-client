import { FlightType } from '@/enums/flight.enums'
import IUser from '../user.interface'
import IPassenger from './passenger.interface'
import IFlight from '../flight/flight.interface'
import { SeatClass } from '@/enums/seat.enums'
import { FlightLegType } from '@/enums/flightLeg.enums'
import IReservation from './reservation.interface'
import { PaymentMethod, PaymentStatus } from '@/enums/payment.enums'

export interface IBooking {
  _id?: string
  adults: number
  children: number
  isRoundtrip: boolean
  totalPrice: number
  user?: IUser
  passengers: IPassenger[]
  flightsInfo: {
    [FlightType.OUTBOUND]: {
      flight: IFlight
      seatClass: SeatClass
      price: number
      reservations: {
        [FlightLegType.DEPARTURE]: {
          reservation: IReservation
          surcharge: number
        }[]
        [FlightLegType.TRANSIT]: {
          reservation: IReservation
          surcharge: number
        }[]
      }
    }
    [FlightType.INBOUND]?: {
      flight: IFlight
      seatClass: SeatClass
      price: number
      reservations: {
        [FlightLegType.DEPARTURE]: {
          reservation: IReservation
          surcharge: number
        }[]
        [FlightLegType.TRANSIT]: {
          reservation: IReservation
          surcharge: number
        }[]
      }
    }
  }
  paymentMethod?: PaymentMethod
  paymentStatus?: PaymentStatus
}

export default IBooking
