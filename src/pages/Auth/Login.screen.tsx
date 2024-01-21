import { EventHandler, FormEventHandler, FunctionComponent, useState } from 'react'
import { NavLink } from 'react-router-dom'
import routes from '../../routes'
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Joi from 'joi'
import { joiResolver } from '@hookform/resolvers/joi'
import Button from '../../components/ui/Button'
import loginSchema from '../../utils/validations/login.schema'

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(loginSchema),
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data)

    reset()
  }

  return (
    <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>ĐĂNG NHẬP</h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          <div>
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
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <label htmlFor='password' className='block text-sm font-medium leading-6 text-gray-900'>
                Mật khẩu
              </label>
              <div className='text-sm'>
                <NavLink to={'/forgot-password'}>
                  <span className='font-semibold text-primary hover:text-secondary'>Quên mật khẩu?</span>
                </NavLink>
              </div>
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
                      {...register('password')}
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
              Đăng nhập
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login