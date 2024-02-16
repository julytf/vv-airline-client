import { AircraftStatus } from '@/enums/aircraft.enums'

export interface IAircraft {
  registrationNumber: string
  name?: string
  status?: AircraftStatus
  aircraftModel?: string
}

export default IAircraft
