import { FlightLegType } from '@/enums/flightLeg.enums'
import IFlightLeg from './flightLeg.interface'
import IFlightRoute from './flightRoute.interface'
import { TicketClass } from '@/enums/ticket.enums'

export interface IFlight {
  _id: string
  hasTransit: boolean
  departureTime: Date
  arrivalTime: Date
  remainingSeats: {
    [TicketClass.ECONOMY]: number
    [TicketClass.BUSINESS]: number
  }
  flightRoute: IFlightRoute
  flightLegs: {
    [FlightLegType.DEPARTURE]: IFlightLeg
    [FlightLegType.TRANSIT]: IFlightLeg
  }
}

export default IFlight
