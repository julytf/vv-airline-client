import { FlightType } from '@/enums/flight.enums'
import IUser from '../user.interface'
import IPassenger from './passenger.interface'
import IFlight from '../flight/flight.interface'
import { TicketClass, TicketType } from '@/enums/ticket.enums'
import { FlightLegType } from '@/enums/flightLeg.enums'
import IReservation from './reservation.interface'
import { PaymentMethod, PaymentStatus } from '@/enums/payment.enums'
import { PassengerType } from '@/enums/passenger.enums'

export interface IBooking {
  _id?: string
  passengersQuantity: {
    [PassengerType.ADULT]: number
    [PassengerType.CHILD]: number
  }
  isRoundtrip: boolean
  totalPrice: number
  user?: IUser
  contactInfo: {
    email: string
    phoneNumber: string
  }
  passengers: IPassenger[]
  flightsInfo: {
    [FlightType.OUTBOUND]: {
      flight: IFlight
      ticketClass: TicketClass
      ticketType: TicketType
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
      ticketClass: TicketClass
      ticketType: TicketType
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
  payment: {
    intentId?: string
    method?: PaymentMethod
    status?: PaymentStatus
  }
}

export default IBooking
