import { AirportType } from '@/enums/airport.enums'
import addressSchema, { IAddress } from '../address/address.interface'
import ICountry from '../address/country.interface'

export interface IAirport {
  IATA: string
  cityCode: string
  countryCode: string
  city: string
  country: ICountry
  type: AirportType
  name: string
  description?: string
  longitude?: number
  latitude?: number
  address?: IAddress
}

export default IAirport
