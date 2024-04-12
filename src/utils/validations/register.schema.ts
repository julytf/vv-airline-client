import Joi from 'joi'
import {
  address2Schema,
  addressSchema,
  dateOfBirthSchema,
  districtSchema,
  emailSchema,
  firstNameSchema,
  genderSchema,
  lastNameSchema,
  confirmPasswordSchema,
  passwordSchema,
  phoneNumberSchema,
  provinceSchema,
  wardSchema,
} from './common'

const registerSchema = Joi.object({
  lastName: lastNameSchema,
  firstName: firstNameSchema,
  dateOfBirth: dateOfBirthSchema,
  gender: genderSchema,
  phoneNumber: phoneNumberSchema,
  address: {
    province: provinceSchema,
    district: districtSchema,
    ward: wardSchema,
    address: addressSchema,
    address2: address2Schema,
  },
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema,
})

export default registerSchema
