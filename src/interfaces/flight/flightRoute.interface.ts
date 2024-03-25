import { SeatClass } from '@/enums/seat.enums'
import IAirport from './airport.interface'

export interface IFlightRoute {
  _id?: string
  distance?: number
  prices: {
    [SeatClass.ECONOMY]: number
    [SeatClass.BUSINESS]: number
  }
  departureAirport: IAirport
  arrivalAirport: IAirport
}

export default IFlightRoute
