import Joi from 'joi'
import { confirmPasswordSchema, passwordSchema } from '../common'

const resetUserPassword = Joi.object({
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema,
})

export default resetUserPassword
