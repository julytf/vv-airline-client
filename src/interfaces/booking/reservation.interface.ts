import { SeatClass } from '@/enums/seat.enums'

export interface IReservation {
  price: number
  // status?: string
  // booking: string
  flightLeg: string
  passenger: string
  seat: string
  services: string[]
}

export default IReservation
