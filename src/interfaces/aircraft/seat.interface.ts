import { SeatStatus, SeatType } from '@/enums/seat.enums'
import { TicketClass } from '@/enums/ticket.enums'

export interface ISeat {
  _id: string
  code: string
  row: number
  col: string
  status?: SeatStatus
  seatType?: SeatType
  ticketClass?: TicketClass
  // aircraftModel: string
}

export default ISeat
