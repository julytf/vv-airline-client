import Joi from 'joi'
import {
  dateOfBirthSchema,
  emailSchema,
  firstNameSchema,
  genderSchema,
  lastNameSchema,
  phoneNumberSchema,
} from '../common'
import { PassengerType } from '@/enums/passenger.enums'

const passengersInformationSchema = Joi.object({
  [PassengerType.ADULT]: Joi.array()
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
  [PassengerType.CHILD]: Joi.array().items(
    Joi.object({
      lastName: lastNameSchema,
      firstName: firstNameSchema,
      dateOfBirth: dateOfBirthSchema,
      gender: genderSchema,
    }),
  ),
})

export default passengersInformationSchema
