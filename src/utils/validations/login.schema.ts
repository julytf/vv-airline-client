import Joi from 'joi'

const loginSchema = Joi.object({
  email: Joi.string().required().messages({
    'string.empty': 'Email không được để trống',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Mật khẩu không được để trống',
  }),
})

export default loginSchema
