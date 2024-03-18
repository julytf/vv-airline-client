import { UserGender, UserRole, UserStatus } from '@/enums/user.enums'
import addressSchema, { IAddress } from './address/address.interface'
import Joi, { ValidationResult } from 'joi'

export interface IUser {
  _id: string
  firstName: string
  lastName: string
  role: UserRole
  _hashedPassword: string
  email: string
  phoneNumber?: string
  dateOfBirth?: Date | string
  gender?: UserGender
  idNumber?: string
  address?: IAddress
  isDeleted: boolean
  deletedAt?: Date
}

export default IUser
