import { SeatClass, SeatStatus, SeatType } from '@/enums/seat.enums'

export interface ISeat {
  code: string
  row: number
  col: string
  status?: SeatStatus
  seatType?: SeatType
  seatClass?: SeatClass
  // aircraftModel: string
}

export default ISeat
