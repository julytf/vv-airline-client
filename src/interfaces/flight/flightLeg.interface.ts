import { FlightLegStatus } from '@/enums/flightLeg.enums'

export interface IFlightLeg {
  departureTime: Date
  arrivalTime: Date
  remainingSeats: number
  status: FlightLegStatus
  flightRoute: string
}

export default IFlightLeg
