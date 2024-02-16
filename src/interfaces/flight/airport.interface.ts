import addressSchema, { IAddress } from '../address/address.interface'

export interface IAirport {
  name: string
  description?: string
  longitude?: number
  latitude?: number
  address?: IAddress
}

export default IAirport
