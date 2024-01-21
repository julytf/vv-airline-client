import Joi from 'joi'
import {
  dateOfBirthSchema,
  emailSchema,
  firstNameSchema,
  genderSchema,
  lastNameSchema,
  phoneNumberSchema,
} from '../common'

const passengersInformationSchema = Joi.object({
  adultsInfo: Joi.array()
    .ordered(
      Joi.object({
        lastName: lastNameSchema,
        firstName: firstNameSchema,
        dateOfBirth: dateOfBirthSchema,
        gender: genderSchema,
        phoneNumber: phoneNumberSchema,
        email: emailSchema,
      }),
    )
    .items(
      Joi.object({
        lastName: lastNameSchema,
        firstName: firstNameSchema,
        dateOfBirth: dateOfBirthSchema,
        gender: genderSchema,
      }),
    ),
  childrenInfo: Joi.array().items(
    Joi.object({
      lastName: lastNameSchema,
      firstName: firstNameSchema,
      dateOfBirth: dateOfBirthSchema,
      gender: genderSchema,
    }),
  ),
})

export default passengersInformationSchema
