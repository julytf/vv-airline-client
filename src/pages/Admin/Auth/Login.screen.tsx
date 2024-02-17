import { FunctionComponent } from 'react'

import Logo from '@/assets/images/logos/logo.png'

import AdminLoginBackground from '@/assets/images/backgrounds/cloud.avif'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/services/state/store'
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import loginSchema from '@/utils/validations/login.schema'
import authService from '@/services/auth.service'
import * as auth from '@/services/state/auth/authSlice'

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const dispatch = useDispatch<AppDispatch>()

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
  console.log('[info]:errors ',errors);
  

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log('here');
    
    const { email, password } = data
    const { accessToken, user } = await authService.login({ email, password })
    console.log({ user, accessToken })
    dispatch(auth.login({ user, accessToken }))
    reset()
  }
  return (
    <div
      className='flex min-h-screen flex-col items-center justify-center bg-cover bg-bottom'
      style={{ backgroundImage: `url(${AdminLoginBackground})` }}
    >
      <div className='mb-4 w-32'>
        <img className='w-full' src={Logo} alt='' />
      </div>
      <div className='relative mb-6 flex w-96  min-w-0 flex-col break-words rounded-lg border-0 bg-gray-200 shadow-lg'>
        <div className='mb-0 rounded-t px-6 py-6'>
          <div className='mb-3 text-center'>
            <div className='text-2xl font-bold text-gray-500'>Đăng Nhập Admin</div>
          </div>
          {/* <div className='btn-wrapper text-center'>
            <button
              className='mb-1 mr-2 inline-flex items-center rounded bg-white px-4 py-2 text-xs font-bold font-normal uppercase text-gray-700 shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-gray-50'
              type='button'
            >
              <img alt='...' className='mr-1 w-5' src='../../assets/img/github.svg' />
              Github
            </button>
            <button
              className='mb-1 mr-1 inline-flex items-center rounded bg-white px-4 py-2 text-xs font-bold font-normal uppercase text-gray-700 shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-gray-50'
              type='button'
            >
              <img alt='...' className='mr-1 w-5' src='../../assets/img/google.svg' />
              Google
            </button>
          </div> */}
          <hr className=' mt-6' />
        </div>
        <div className='flex-auto px-4 py-10 pt-0 lg:px-10'>
          {/* <div className='mb-3 text-center font-bold text-gray-400'>
            <small>Or sign in with credentials</small>
          </div> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='relative mb-3 w-full'>
              <label className='mb-2 block text-xs font-bold uppercase text-gray-600' htmlFor='grid-password'>
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
                        className='w-full rounded border-0 bg-white px-3 py-3 text-sm text-gray-600 placeholder-gray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring'
                        placeholder='Email'
                      />
                    </div>
                    <small className='text-red-600'>{error?.message}</small>
                  </>
                )}
              />
            </div>
            <div className='relative mb-3 w-full'>
              <label className='mb-2 block text-xs font-bold uppercase text-gray-600' htmlFor='grid-password'>
                Password
              </label>

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
                        className='w-full rounded border-0 bg-white px-3 py-3 text-sm text-gray-600 placeholder-gray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring'
                        placeholder='Password'
                      />
                    </div>
                    <small className='text-red-600'>{error?.message}</small>
                  </>
                )}
              />
            </div>
            {/* <div>
              <label className='inline-flex cursor-pointer items-center'>
                <input
                  id='customCheckLogin'
                  type='checkbox'
                  className='form-checkbox ml-1 h-5 w-5 rounded border-0 text-gray-700 transition-all duration-150 ease-linear'
                />
                <span className='ml-2 text-sm font-semibold text-gray-600'>Remember me</span>
              </label>
            </div> */}
            <div className='mt-6 text-center'>
              <button
                className='mb-1 mr-1 w-full rounded bg-gray-800 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-gray-600'
              >
                Đăng Nhập
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
