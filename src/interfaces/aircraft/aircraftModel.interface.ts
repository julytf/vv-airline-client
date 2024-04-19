import { TicketClass } from '@/enums/ticket.enums'
import ISeat from './seat.interface'

export interface IRowModel {
  index: number
  hasExit: boolean
  seats: ISeat[]
}

export interface ICabinModel {
  class: TicketClass
  noRow: number
  noCol: number
  aisleCol: number[]
  map: IRowModel[]
}

export type IAircraftSeatMap = ICabinModel[]

export interface IAircraftModel {
  _id?: string
  name?: string
  seatQuantity: {
    [TicketClass.ECONOMY]: number
    [TicketClass.BUSINESS]: number
  }
  seatMap: ICabinModel[]
}

export default IAircraftModel
