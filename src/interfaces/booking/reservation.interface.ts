import { SeatClass } from '@/enums/seat.enums'
import IFlightLeg from '../flight/flightLeg.interface'
import IPassenger from './passenger.interface'
import ISeat from '../aircraft/seat.interface'
import IService from './service.interface'

export interface IReservation {
  price: number
  // status?: string
  // booking: string
  flightLeg: IFlightLeg
  passenger: IPassenger
  seat: ISeat
  services: IService[]
}

export default IReservation
