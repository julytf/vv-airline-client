import { SeatClass } from '@/enums/seat.enums'
import ISeat from './seat.interface'

export interface IRowModel {
  index: number
  hasExit: boolean
  seats: ISeat[]
}

export interface ICabinModel {
  class: SeatClass
  noRow: number
  noCol: number
  aisleCol: number[]
  map: IRowModel[]
}

export type IAircraftSeatMap = ICabinModel[]

export interface IAircraftModel {
  name?: string
  seatQuantity: {
    [SeatClass.ECONOMY]: number
    [SeatClass.BUSINESS]: number
  }
  seatMap: ICabinModel[]
}

export default IAircraftModel
