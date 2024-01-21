import Joi from 'joi'
import {
  address2Schema,
  addressSchema,
  dateOfBirthSchema,
  districtCodeSchema,
  emailSchema,
  firstNameSchema,
  genderSchema,
  lastNameSchema,
  passwordConfirmSchema,
  passwordSchema,
  phoneNumberSchema,
  provinceCodeSchema,
  wardCodeSchema,
} from './common'

const registerSchema = Joi.object({
  lastName: lastNameSchema,
  firstName: firstNameSchema,
  dateOfBirth: dateOfBirthSchema,
  gender: genderSchema,
  phoneNumber: phoneNumberSchema,
  provinceCode: provinceCodeSchema,
  districtCode: districtCodeSchema,
  wardCode: wardCodeSchema,
  address: addressSchema,
  address2: address2Schema,
  email: emailSchema,
  password: passwordSchema,
  passwordConfirm: passwordConfirmSchema,
})

export default registerSchema
