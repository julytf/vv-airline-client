import { TicketClass, TicketType } from '@/enums/ticket.enums'
import IAirport from './airport.interface'

export interface IFlightRoute {
  _id?: string
  distance?: number
  prices: {
    [TicketClass.ECONOMY]: {
      [TicketType.BUDGET]: number | null
      [TicketType.STANDARD]: number | null
      [TicketType.FLEXIBLE]: number | null
    }
    [TicketClass.BUSINESS]: {
      [TicketType.BUDGET]: number | null
      [TicketType.STANDARD]: number | null
      [TicketType.FLEXIBLE]: number | null
    }
  }
  departureAirport: IAirport
  arrivalAirport: IAirport
}

export default IFlightRoute
