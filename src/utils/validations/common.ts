import { UserGender } from '@/enums/user.enums'
import Joi from 'joi'

export const lastNameSchema = Joi.string().required().min(2).max(50).messages({
  'any.required': 'Họ có ít nhất 2 ký tự',
  'string.empty': 'Họ có ít nhất 2 ký tự',
  'string.min': 'Họ có ít nhất 2 ký tự',
  'string.max': 'Họ có nhiều nhất 50 ký tự',
})
export const firstNameSchema = Joi.string().required().min(2).max(50).messages({
  'any.required': 'Tên có ít nhất 2 ký tự',
  'string.empty': 'Tên có ít nhất 2 ký tự',
  'string.min': 'Tên có ít nhất 2 ký tự',
  'string.max': 'Tên có nhiều nhất 50 ký tự',
})
export const dateOfBirthSchema = Joi.string().required().isoDate().messages({
  'any.required': 'Ngày sinh không thể để trống',
  'string.empty': 'Ngày sinh không thể để trống',
  'string.isoDate': 'Ngày sinh không hợp lệ',
})
export const genderSchema = Joi.string().valid(UserGender.MALE, UserGender.FEMALE).required().messages({
  'any.required': 'Giới tính không thể để trống',
})
export const phoneNumberSchema = Joi.string()
  .required()
  .pattern(/^[0-9+-]{9,15}$/)
  .messages({
    'any.required': 'Số điện thoại không thể để trống',
    'string.empty': 'Số điện thoại không thể để trống',
    'string.pattern.base': 'Số điện thoại không hợp lệ',
  })
export const provinceSchema = Joi.string().optional().messages({
  'string.empty': 'Tỉnh/Thành phố không thể để trống',
})
export const districtSchema = Joi.string().optional().messages({
  'string.empty': 'Quận/Huyện không thể để trống',
})
export const wardSchema = Joi.string().optional().messages({
  'string.empty': 'Xã/Phường không thể để trống',
})
export const addressSchema = Joi.string().optional().messages({
  'string.empty': 'Địa chỉ không thể để trống',
})
export const address2Schema = Joi.string().optional().messages({})
export const emailSchema = Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  .required()
  .messages({
    'any.required': 'Email không thể để trống',
    'string.email': 'Email không hợp lệ',
    'string.empty': 'Email không thể để trống',
  })
export const passwordSchema = Joi.string()
  .required()
  .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
  .messages({
    'any.required': 'Mật khẩu không thể để trống',
    'string.empty': 'Mật khẩu không thể để trống',
    'string.pattern.base': 'Mật khẩu không hợp lệ (ít nhất 8 ký tự, 1 chữ cái, 1 số và 1 ký tự đặc biệt)',
  })
export const passwordConfirmSchema = Joi.string().required().valid(Joi.ref('password')).messages({
  'any.required': 'Nhập lại mật khẩu không thể để trống',
  'string.empty': 'Nhập lại mật khẩu không thể để trống',
  'any.only': 'Nhập lại mật khẩu không trùng khớp với mật khẩu',
})
