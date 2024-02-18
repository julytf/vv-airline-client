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
  passwordConfirmSchema,
  passwordSchema,
  phoneNumberSchema,
  provinceSchema,
  wardSchema,
} from '../common'

const changeUserPassword = Joi.object({
  // lastName: lastNameSchema,
  // firstName: firstNameSchema,
  // dateOfBirth: dateOfBirthSchema,
  // gender: genderSchema,
  // phoneNumber: phoneNumberSchema,
  // address: {
  //   provinceCode: provinceSchema,
  //   district: districtSchema,
  //   ward: wardSchema,
  //   address: addressSchema,
  //   address2: address2Schema,
  // },
  // email: emailSchema,
  password: passwordSchema,
  newPassword: passwordSchema,
})

export default changeUserPassword
