import { SeatClass } from '@/enums/seat.enums'

export interface IFlightRoute {
  distance?: number
  prices: IPrice[]
  departureAirport: string
  destinationAirport: string
}

export interface IPrice {
  value: number
  seatClass: SeatClass
}

export default IFlightRoute
