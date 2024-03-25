import { FlightLegStatus } from '@/enums/flightLeg.enums'
import IFlightRoute from './flightRoute.interface'
import IAircraft from '../aircraft/aircraft.interface'
import { SeatClass } from '@/enums/seat.enums'

export interface IFlightLeg {
  _id?: string
  departureTime: Date
  arrivalTime: Date
  remainingSeats: {
    [SeatClass.ECONOMY]: number
    [SeatClass.BUSINESS]: number
  }
  status: FlightLegStatus
  flightRoute: IFlightRoute
  aircraft: IAircraft
}

export default IFlightLeg
