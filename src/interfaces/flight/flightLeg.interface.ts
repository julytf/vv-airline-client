import { FlightLegStatus } from '@/enums/flightLeg.enums'
import IFlightRoute from './flightRoute.interface'
import IAircraft from '../aircraft/aircraft.interface'
import { TicketClass } from '@/enums/ticket.enums'

export interface IFlightLeg {
  _id?: string
  flightNumber: string
  departureTime: Date
  arrivalTime: Date
  remainingSeats: {
    [TicketClass.ECONOMY]: number
    [TicketClass.BUSINESS]: number
  }
  status: FlightLegStatus
  flightRoute: IFlightRoute
  aircraft: IAircraft
}

export default IFlightLeg
