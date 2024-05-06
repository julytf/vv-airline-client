import { ChangeEventHandler, FunctionComponent, useEffect, useRef, useState } from 'react'
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Joi from 'joi'
import { joiResolver } from '@hookform/resolvers/joi'
import { format, subYears } from 'date-fns'
import { useQuery } from 'react-query'
import authService from '@/services/auth.service'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '@/services/state/store'
import { UserGender, UserRole } from '@/enums/user.enums'
import updateUserSchema from '@/utils/validations/user/updateUser.schema'
import UserProfileSidebar from '@/components/Sidebar/UserProfileSidebar'
import usersService from '@/services/users.service'
import IUser from '@/interfaces/user.interface'
import * as auth from '@/services/state/auth/authSlice'
import Button from '@/components/ui/Button'
import AdminProfileSidebar from '@/components/Sidebar/AdminProfileSidebar'
import IProvince from '@/interfaces/address/province.interface'
import IDistrict from '@/interfaces/address/district.interface'
import IWard from '@/interfaces/address/ward.interface'
import addressService from '@/services/address.service'

interface IFormData {
  role: UserRole
  firstName: string
  lastName: string
  // password: string
  // confirmPassword: string
  email: string
  phoneNumber?: string
  dateOfBirth?: Date | string
  gender?: UserGender
  idNumber?: string
  address?: {
    address: string
    address2?: string
    province: string
    district?: string
    ward?: string
  }
  // isDeleted: boolean
  // deletedAt?: Date
}

interface IndexProps {}

const Index: FunctionComponent<IndexProps> = () => {
  const dispatch = useDispatch<AppDispatch>()

  const [provinces, setProvinces] = useState<IProvince[]>([])
  const [districts, setDistricts] = useState<IDistrict[]>([])
  const [wards, setWards] = useState<IWard[]>([])

  const provinceInputRef = useRef<HTMLSelectElement>(null)
  const districtInputRef = useRef<HTMLSelectElement>(null)

  const { user, accessToken } = useSelector((state: AppState) => state.auth)
  const sanitizedData = updateUserSchema.validate(user, { stripUnknown: true }).value
  // console.log('user', user)
  // console.log('date', user?.dateOfBirth?.toString())

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
    watch,
  } = useForm<IFormData>({
    mode: 'onChange',
    resolver: joiResolver(updateUserSchema),
    defaultValues: sanitizedData ?? {},
  })

  const formData = watch()
  // console.log('isValid', isValid)
  // console.log('errors', errors)

  // const { data, isFetching, isLoading, error, isError } = useQuery({
  //   queryKey: ['user.profile', accessToken],
  //   queryFn: () => authService.getProfile(accessToken!),
  // })
  // console.log('data', data)

  useEffect(() => {
    addressService.getProvinces().then((docs) => {
      setProvinces(docs)
    })
  }, [])
  useEffect(() => {
    const provinceCode = provinces.find((province) => province._id === provinceInputRef.current?.value)?.code
    addressService.getDistricts(provinceCode || '').then((docs) => {
      setDistricts(docs)
    })
  }, [provinceInputRef.current?.value])
  useEffect(() => {
    const districtCode = districts.find((district) => district._id === districtInputRef.current?.value)?.code
    addressService.getWards(districtCode || '').then((docs) => {
      setWards(docs)
    })
  }, [districtInputRef.current?.value])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log('accessToken', accessToken)
    console.log('data', data)

    const user = await usersService.updateProfile(data as IUser)
    console.log('user', user)

    dispatch(auth.setProfile(user))

    // reset()
  }
  return (
    <div className='p-8'>
      <div className='mt-16 grid grid-cols-12 gap-6'>
        <AdminProfileSidebar className='col-span-3' />
        <div className='col-span-9 w-full'>
          <div className='mx-auto mb-24 max-w-2xl'>
            <form method='post' className='max-w-2xl flex-1 rounded-md bg-white p-6 ' onSubmit={handleSubmit(onSubmit)}>
              <div className='mx-auto w-full max-w-sm pt-8'>
                <h2 className='text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Tài Khoản</h2>
              </div>
              <div className='mx-auto max-w-2xl'>
                <div className='space-y-12'>
                  <div className='border-b border-gray-900/10 pb-12'>
                    <h2 className='text-lg font-semibold leading-9 text-gray-900'>Thông tin cá nhân</h2>
                    <div className='mt-10 grid grid-cols-6 gap-x-6 gap-y-8'>
                      <div className='col-span-3'>
                        <label htmlFor='lastName' className='block text-sm font-medium leading-6 text-gray-900'>
                          Họ
                        </label>
                        <Controller
                          name={'lastName'}
                          control={control}
                          render={({ field, fieldState: { error }, formState }) => (
                            <>
                              <div className='mt-2'>
                                <input
                                  id='lastName'
                                  value={field.value || ''}
                                  onChange={(e) => {
                                    field.onChange(e.target.value)
                                  }}
                                  type='text'
                                  className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
                                />
                              </div>

                              <small className='text-red-600'>{error?.message}</small>
                            </>
                          )}
                        />
                      </div>

                      <div className='col-span-3'>
                        <label htmlFor='firstName' className='block text-sm font-medium leading-6 text-gray-900'>
                          Tên
                        </label>
                        <Controller
                          name={'firstName'}
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <>
                              <div className='mt-2'>
                                <input
                                  id='firstName'
                                  value={field.value || ''}
                                  onChange={(e) => {
                                    field.onChange(e.target.value)
                                  }}
                                  type='text'
                                  className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
                                />
                              </div>

                              <small className='text-red-600'>{error?.message}</small>
                            </>
                          )}
                        />
                      </div>

                      <div className='col-span-3'>
                        <label htmlFor='dateOfBirth' className='block text-sm font-medium leading-6 text-gray-900'>
                          Ngày sinh
                        </label>
                        <Controller
                          name={'dateOfBirth'}
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <>
                              <div className='mt-2'>
                                <input
                                  id='dateOfBirth'
                                  value={format(field.value || '', 'yyyy-MM-dd')}
                                  onChange={(e) => {
                                    field.onChange(e.target.value)
                                  }}
                                  type='date'
                                  max={format(subYears(new Date(), 12), 'yyyy-MM-dd')}
                                  min={format(new Date('1900'), 'yyyy-MM-dd')}
                                  className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
                                />
                              </div>

                              <small className='text-red-600'>{error?.message}</small>
                            </>
                          )}
                        />
                      </div>
                      <div className='col-span-3'>
                        <div className=' text-sm font-medium leading-6 text-gray-900'>Giới tính</div>
                        <Controller
                          name={'gender'}
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <>
                              <div>
                                <div className='mt-3 inline-block gap-x-3'>
                                  <label className='ml-2  inline-block text-sm font-medium leading-6 text-gray-900'>
                                    <input
                                      id='male'
                                      value={UserGender.MALE}
                                      checked={field.value === UserGender.MALE}
                                      onChange={(e) => {
                                        field.onChange(UserGender.MALE)
                                      }}
                                      type='radio'
                                      className='inline-block h-4 w-4 border-gray-300 text-primary focus:ring-primary'
                                    />
                                    <span className='ml-2'>Nam</span>
                                  </label>
                                </div>
                                <div className='ml-3 inline-block gap-x-3'>
                                  <label className='ml-2  inline-block text-sm font-medium leading-6 text-gray-900'>
                                    <input
                                      id='female'
                                      value={UserGender.FEMALE}
                                      checked={field.value === UserGender.FEMALE}
                                      onChange={(e) => {
                                        field.onChange(UserGender.FEMALE)
                                      }}
                                      type='radio'
                                      className='inline-block h-4 w-4 border-gray-300 text-primary focus:ring-primary'
                                    />
                                    <span className='ml-2'>Nữ</span>
                                  </label>
                                </div>
                              </div>

                              <small className='text-red-600'>{error?.message}</small>
                            </>
                          )}
                        />
                      </div>
                      <div className='col-span-6'>
                        <label htmlFor='phoneNumber' className='block text-sm font-medium leading-6 text-gray-900'>
                          Số điện thoại
                        </label>
                        <Controller
                          name={'phoneNumber'}
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <>
                              <div className='mt-2'>
                                <input
                                  id='phoneNumber'
                                  value={field.value || ''}
                                  onChange={(e) => {
                                    field.onChange(e.target.value)
                                  }}
                                  type='text'
                                  className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
                                />
                              </div>

                              <small className='text-red-600'>{error?.message}</small>
                            </>
                          )}
                        />
                      </div>

                      <div className='col-span-2'>
                        <label htmlFor='address.province' className='block text-sm font-medium leading-6 text-gray-900'>
                          Tỉnh/Thành phố
                        </label>
                        <Controller
                          name={'address.province'}
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <>
                              <div className='mt-2'>
                                <select
                                  id='address.province'
                                  ref={provinceInputRef}
                                  value={field.value || ''}
                                  onChange={(e) => {
                                    field.onChange(e.target.value)
                                  }}
                                  className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
                                  // onChange='provinceChangeHandler(this.value)'
                                >
                                  <option value=''>--Chọn--</option>
                                  {provinces.map((province) => (
                                    <option key={province._id} value={province._id}>
                                      {province.name}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <small className='text-red-600'>{error?.message}</small>
                            </>
                          )}
                        />
                      </div>

                      <div className='col-span-2'>
                        <label htmlFor='address.district' className='block text-sm font-medium leading-6 text-gray-900'>
                          Quận/Huyện
                        </label>
                        <Controller
                          name={'address.district'}
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <>
                              <div className='mt-2'>
                                <select
                                  id='address.district'
                                  ref={districtInputRef}
                                  value={field.value || ''}
                                  onChange={(e) => {
                                    field.onChange(e.target.value)
                                  }}
                                  className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
                                  // onChange='DistrictChangeHandler(this.value)'
                                >
                                  <option value=''>--Chọn--</option>
                                  {districts.map((district) => (
                                    <option key={district._id} value={district._id}>
                                      {district.name}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <small className='text-red-600'>{error?.message}</small>
                            </>
                          )}
                        />
                      </div>

                      <div className='col-span-2'>
                        <label htmlFor='address.ward' className='block text-sm font-medium leading-6 text-gray-900'>
                          Xã/Phường
                        </label>
                        <Controller
                          name={'address.ward'}
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <>
                              <div className='mt-2'>
                                <select
                                  id='address.ward'
                                  value={field.value || ''}
                                  onChange={(e) => {
                                    field.onChange(e.target.value)
                                  }}
                                  className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
                                >
                                  <option value=''>--Chọn--</option>
                                  {wards.map((ward) => (
                                    <option key={ward._id} value={ward._id}>
                                      {ward.name}
                                    </option>
                                  ))}
                                </select>

                                <small className='text-red-600'>{error?.message}</small>
                              </div>
                            </>
                          )}
                        />
                      </div>
                      <div className='col-span-full'>
                        <label htmlFor='address.address' className='block text-sm font-medium leading-6 text-gray-900'>
                          Địa chỉ
                        </label>
                        <Controller
                          name={'address.address'}
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <>
                              <div className='mt-2'>
                                <input
                                  id='address.address'
                                  value={field.value || ''}
                                  onChange={(e) => {
                                    field.onChange(e.target.value)
                                  }}
                                  type='text'
                                  className='block w-full rounded-md border-0 p-3 py-1.5 text-sm leading-6 text-gray-900 shadow-sm outline-primary ring-1   ring-inset ring-gray-300 placeholder:text-gray-400'
                                />
                              </div>

                              <small className='text-red-600'>{error?.message}</small>
                            </>
                          )}
                        />
                      </div>
                      <div className='col-span-full'>
                        <label htmlFor='address.address2' className='block text-sm font-medium leading-6 text-gray-900'>
                          Tòa nhà, tầng, số phòng
                        </label>
                        <Controller
                          name={'address.address2'}
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <>
                              <div className='mt-2'>
                                <input
                                  id='address.address2'
                                  value={field.value || ''}
                                  onChange={(e) => {
                                    field.onChange(e.target.value)
                                  }}
                                  type='text'
                                  className='block w-full rounded-md border-0 p-3 py-1.5 text-sm leading-6 text-gray-900 shadow-sm outline-primary ring-1   ring-inset ring-gray-300 placeholder:text-gray-400'
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

                <div className='border-b border-gray-900/10 pb-12'>
                  <h2 className='text-lg font-semibold leading-7 text-gray-900'>Thông tin tài khoản</h2>
                  <div className='mt-10 grid grid-cols-6 gap-x-6 gap-y-8'>
                    <div className='col-span-6'>
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
                                className='block w-2/3 rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
                              />
                            </div>

                            <small className='text-red-600'>{error?.message}</small>
                          </>
                        )}
                      />
                    </div>
                    {/* <div className='col-span-6'>
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
                              className='block w-2/3 rounded-md border-0 bg-transparent p-3 py-1.5 text-gray-900 outline-primary ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 text-sm leading-6'
                            />
                          </div>

                          <small className='text-red-600'>{error?.message}</small>
                        </>
                      )}
                    />
                  </div>
                  <div className='col-span-6'>
                    <label htmlFor='confirmPassword' className='block text-sm font-medium leading-6 text-gray-900'>
                      Nhập lại mật khẩu
                    </label>
                    <Controller
                      name={'confirmPassword'}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <div className='mt-2'>
                            <input
                              id='confirmPassword'
                              value={field.value || ''}
                              onChange={(e) => {
                                field.onChange(e.target.value)
                              }}
                              type='password'
                              className='block w-2/3 rounded-md border-0 bg-transparent p-3 py-1.5 text-gray-900 outline-primary ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 text-sm leading-6'
                            />
                          </div>

                          <small className='text-red-600'>{error?.message}</small>
                        </>
                      )}
                    />
                  </div> */}
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
    </div>
  )
}

export default Index
