import { FlightLegStatus } from '@/enums/flightLeg.enums'
import IFlightRoute from './flightRoute.interface'
import IAircraft from '../aircraft/aircraft.interface'

export interface IFlightLeg {
  departureTime: Date
  arrivalTime: Date
  remainingSeats: number
  status: FlightLegStatus
  flightRoute: IFlightRoute
  aircraft: IAircraft
}

export default IFlightLeg
