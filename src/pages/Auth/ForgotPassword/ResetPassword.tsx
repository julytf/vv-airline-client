import { EventHandler, FormEventHandler, FunctionComponent, useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Joi from 'joi'
import { joiResolver } from '@hookform/resolvers/joi'
import authService from '@/services/auth.service'
import { AppDispatch } from '@/services/state/store'
import { useDispatch } from 'react-redux'
import * as auth from '@/services/state/auth/authSlice'
import { useToast } from '@/contexts/ToastNotify.context'
import { AxiosError } from 'axios'
import Button from '@/components/ui/Button'
import { passwordSchema } from '@/utils/validations/common'
import resetUserPasswordSchema from '@/utils/validations/user/resetPassword.schema'
import { ForgotPasswordContext } from './ForgotPassword.screen'

interface ResetPasswordProps {}

const ResetPassword: FunctionComponent<ResetPasswordProps> = () => {
  const toast = useToast()

  const { setPage, email, setEmail, OTP, setOTP } = useContext(ForgotPasswordContext)

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(resetUserPasswordSchema),
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { password, confirmPassword } = data
    console.log(data)

    // if (password !== confirmPassword) {
    //   return
    // }
    try {
      await authService.resetPasswordWithOTP(email!, OTP!, password)
      setPage('recovered')
      // console.log({ user, accessToken })
    } catch (error) {
      console.log(error)
      if (typeof error === 'string') {
        toast.error({ message: error })
      } else if (error instanceof AxiosError) {
        toast.error({ message: error.response?.data.message })
      } else if (error instanceof Error) {
        toast.error({ message: error.message })
      }
    }
    // reset()
  }

  return (
    <div className='flex min-h-full w-full flex-col justify-center px-6 py-24 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>ĐẶT LẠI MẬT KHẨU</h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          {/* <div>
            <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
              Email
            </label>

            <Controller
              name={`email`}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <div className='mt-2'>
                    <input
                      id='email'
                      type='text'
                      value={field.value || ''}
                      onChange={(e) => {
                        field.onChange(e.target.value)
                      }}
                      className='block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm outline-primary ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6'
                    />
                  </div>
                  <small className='text-red-600'>{error?.message}</small>
                </>
              )}
            />
          </div> */}

          <div>
            <div className='flex items-center justify-between'>
              <label htmlFor='password' className='block text-sm font-medium leading-6 text-gray-900'>
                Mật khẩu
              </label>
              {/* <div className='text-sm'>
                <NavLink to={'/forgot-password'}>
                  <span className='font-semibold text-primary hover:text-secondary'>Quên mật khẩu?</span>
                </NavLink>
              </div> */}
            </div>

            <Controller
              name={`password`}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <div className='mt-2'>
                    <input
                      id='password'
                      type='password'
                      value={field.value || ''}
                      onChange={(e) => {
                        field.onChange(e.target.value)
                      }}
                      className='block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm outline-primary ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 sm:text-sm sm:leading-6'
                    />
                  </div>
                  <small className='text-red-600'>{error?.message}</small>
                </>
              )}
            />
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <label htmlFor='confirmPassword' className='block text-sm font-medium leading-6 text-gray-900'>
                Nhập lại mật khẩu
              </label>
            </div>

            <Controller
              name={`confirmPassword`}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <div className='mt-2'>
                    <input
                      id='confirmPassword'
                      type='password'
                      value={field.value || ''}
                      onChange={(e) => {
                        field.onChange(e.target.value)
                      }}
                      className='block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm outline-primary ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 sm:text-sm sm:leading-6'
                    />
                  </div>
                  <small className='text-red-600'>{error?.message}</small>
                </>
              )}
            />
          </div>
          <div>
            <Button disabled={!isValid} className='w-full'>
              Đặt Lại
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
