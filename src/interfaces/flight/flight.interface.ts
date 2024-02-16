export interface IFlight {
  hasTransit: boolean
  departureTime: Date
  arrivalTime: Date
  remainingSeats?: number
  flightRoute: string
  flightLegs: string[]
}

export default IFlight
