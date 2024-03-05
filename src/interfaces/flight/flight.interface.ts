import IFlightLeg from "./flightLeg.interface"
import IFlightRoute from "./flightRoute.interface"

export interface IFlight {
  hasTransit: boolean
  departureTime: Date
  arrivalTime: Date
  remainingSeats?: number
  flightRoute: IFlightRoute
  flightLegs: IFlightLeg[]
}

export default IFlight
