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
        // type: Joi.string().valid(PassengerType.ADULT, PassengerType.CHILD).required(),
      }),
    )
    .items(
      Joi.object({
        lastName: lastNameSchema,
        firstName: firstNameSchema,
        dateOfBirth: dateOfBirthSchema,
        gender: genderSchema,
        // type: Joi.string().valid(PassengerType.ADULT, PassengerType.CHILD).required(),
      }),
    ),
  [PassengerType.CHILD]: Joi.array().items(
    Joi.object({
      lastName: lastNameSchema,
      firstName: firstNameSchema,
      dateOfBirth: dateOfBirthSchema,
      gender: genderSchema,
      // type: Joi.string().valid(PassengerType.ADULT, PassengerType.CHILD).required(),
    }),
  ),
})

export default passengersInformationSchema
