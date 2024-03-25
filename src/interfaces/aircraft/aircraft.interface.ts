import { AircraftStatus } from '@/enums/aircraft.enums'
import IAircraftModel from './aircraftModel.interface'

export interface IAircraft {
  _id?: string
  registrationNumber: string
  name?: string
  status?: AircraftStatus
  aircraftModel?: IAircraftModel
}

export default IAircraft
