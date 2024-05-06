import { TicketClass } from '@/enums/ticket.enums'
import IFlightLeg from '../flight/flightLeg.interface'
import IPassenger from './passenger.interface'
import ISeat from '../aircraft/seat.interface'
import { PaymentStatus } from '@/enums/payment.enums'

export interface IReservation {
  _id?: string
  price: number
  // status?: string
  // booking: string
  flightLeg: IFlightLeg
  passenger: IPassenger
  seat: ISeat
  // services: IService[]
  paymentStatus?: PaymentStatus
}

export default IReservation
