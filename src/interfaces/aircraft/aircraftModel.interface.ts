import { SeatClass } from '@/enums/seat.enums'

interface IRowModel {
  hasExit: boolean
  seats: string[][]
}

interface ICabinModel {
  class: SeatClass
  noRow: number
  noCol: number
  aisleCol: number[]
  map: IRowModel[]
}

export interface IAircraftModel {
  name?: string
  seatMap: ICabinModel[]
}

export default IAircraftModel
