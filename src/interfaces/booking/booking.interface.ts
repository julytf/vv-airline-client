export interface IBooking {
  adults: number
  children: number
  isRoundtrip: boolean
  totalPrice: number
  user: string
  passengers: string[]
  flights: string[]
}

export default IBooking
