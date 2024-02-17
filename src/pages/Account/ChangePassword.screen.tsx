import { ChangeEventHandler, FunctionComponent, useState } from 'react'
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Button from '../../components/ui/Button'
import Joi from 'joi'
import { joiResolver } from '@hookform/resolvers/joi'
import { format, subYears } from 'date-fns'
import registerSchema from '../../utils/validations/register.schema'
import { useQuery } from 'react-query'
import authService from '@/services/auth.service'
import { useSelector } from 'react-redux'
import { AppState } from '@/services/state/store'
import { UserGender, UserRole } from '@/enums/user.enums'
import updateUserSchema from '@/utils/validations/user/updateUser.schema'
import UserProfileSidebar from '@/components/Sidebar/UserProfileSidebar'
import changeUserPasswordSchema from '@/utils/validations/user/changeUserPassword.schema'

interface IFormData {
  // role: UserRole
  // firstName: string
  // lastName: string
  password: string
  passwordConfirm: string
  // email: string
  // phoneNumber?: string
  // dateOfBirth?: Date | string
  // gender?: UserGender
  // idNumber?: string
  // address?: {
  //   address: string
  //   address2?: string
  //   province: string
  //   district?: string
  //   ward?: string
  // }
  // isDeleted: boolean
  // deletedAt?: Date
}

interface ChangePasswordProps {}

const ChangePassword: FunctionComponent<ChangePasswordProps> = () => {
  const { user } = useSelector((state: AppState) => state.auth)

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<IFormData>({
    mode: 'onChange',
    resolver: joiResolver(changeUserPasswordSchema),
  })
  // console.log('errors', errors)

  // const { data, isFetching, isLoading, error, isError } = useQuery({
  //   queryKey: ['user.profile', accessToken],
  //   queryFn: () => authService.getProfile(accessToken!),
  // })
  // console.log('data', data)

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log('data', data)

    reset()
  }
  return (
    <div className='mt-16 grid grid-cols-12 gap-6'>
      <UserProfileSidebar className='col-span-3' />
      <div className='col-span-9 w-full'>
        <div className='mx-auto mb-24 max-w-2xl'>
          <form method='post' className='rounded-md p-8 pt-0 ' onSubmit={handleSubmit(onSubmit)}>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
              <h2 className='text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Đổi mật khẩu</h2>
            </div>
            <div className='mx-auto max-w-2xl'>
              <div className='border-b border-gray-900/10 pb-12'>
                {/* <h2 className='text-lg font-semibold leading-7 text-gray-900'>Thông tin tài khoản</h2> */}
                <div className='mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-6'>
                  {/* <div className='sm:col-span-6'>
                    <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
                      Email
                    </label>
                    <Controller
                      name={'email'}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <div className='mt-2'>
                            <input
                              id='email'
                              value={field.value || ''}
                              onChange={(e) => {
                                field.onChange(e.target.value)
                              }}
                              type='text'
                              className='block w-2/3 rounded-md border-0 bg-transparent p-3 py-1.5 text-gray-900 outline-primary ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 sm:text-sm sm:leading-6'
                            />
                          </div>

                          <small className='text-red-600'>{error?.message}</small>
                        </>
                      )}
                    />
                  </div> */}
                  <div className='sm:col-span-6'>
                    <label htmlFor='password' className='block text-sm font-medium leading-6 text-gray-900'>
                      Mật khẩu
                    </label>
                    <Controller
                      name={'password'}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <div className='mt-2'>
                            <input
                              id='password'
                              value={field.value || ''}
                              onChange={(e) => {
                                field.onChange(e.target.value)
                              }}
                              type='password'
                              className='block w-2/3 rounded-md border-0 bg-transparent p-3 py-1.5 text-gray-900 outline-primary ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 sm:text-sm sm:leading-6'
                            />
                          </div>

                          <small className='text-red-600'>{error?.message}</small>
                        </>
                      )}
                    />
                  </div>
                  <div className='sm:col-span-6'>
                    <label htmlFor='passwordConfirm' className='block text-sm font-medium leading-6 text-gray-900'>
                      Nhập lại mật khẩu
                    </label>
                    <Controller
                      name={'passwordConfirm'}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <div className='mt-2'>
                            <input
                              id='passwordConfirm'
                              value={field.value || ''}
                              onChange={(e) => {
                                field.onChange(e.target.value)
                              }}
                              type='password'
                              className='block w-2/3 rounded-md border-0 bg-transparent p-3 py-1.5 text-gray-900 outline-primary ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 sm:text-sm sm:leading-6'
                            />
                          </div>

                          <small className='text-red-600'>{error?.message}</small>
                        </>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-6 flex items-center justify-end gap-x-6'>
              <Button disabled={!isValid}>Lưu</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
