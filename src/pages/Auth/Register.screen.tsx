import { ChangeEventHandler, FunctionComponent, useEffect, useRef, useState } from 'react'
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Button from '../../components/ui/Button'
import Joi from 'joi'
import { joiResolver } from '@hookform/resolvers/joi'
import { format, subYears } from 'date-fns'
import registerSchema from '../../utils/validations/register.schema'
import { UserGender } from '@/enums/user.enums'
import IProvince from '@/interfaces/address/province.interface'
import IDistrict from '@/interfaces/address/district.interface'
import IWard from '@/interfaces/address/ward.interface'
import addressService from '@/services/address.service'
import authService from '@/services/auth.service'
import usersService from '@/services/users.service'
import IUser from '@/interfaces/user.interface'
import { useToast } from '@/contexts/ToastNotify.context'
import { useNavigate } from 'react-router'

interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
  const toast = useToast()
  const navigate = useNavigate()

  const [provinces, setProvinces] = useState<IProvince[]>([])
  const [districts, setDistricts] = useState<IDistrict[]>([])
  const [wards, setWards] = useState<IWard[]>([])

  const provinceInputRef = useRef<HTMLSelectElement>(null)
  const districtInputRef = useRef<HTMLSelectElement>(null)

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(registerSchema),
  })
  const watchAllFields = watch()

  console.log('errors', errors)

  console.log('provinceInputRef.current?.value', provinceInputRef.current?.value)

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
    console.log('data', data)

    authService.register(data as IUser).then((data) => {
      console.log('data', data)
      toast.success('Đăng ký thành công')
      navigate('/login')
    })

    // reset()
  }
  return (
    <div className='mx-auto mb-24 mt-16 w-full  max-w-2xl px-4 sm:px-6 lg:px-8' onSubmit={handleSubmit(onSubmit)}>
      <form method='post' className='rounded-md border-2 border-solid p-8 pt-0 shadow-lg'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>ĐĂNG KÝ</h2>
        </div>
        <div className='mx-auto max-w-2xl'>
          <div className='space-y-12'>
            <div className='border-b border-gray-900/10 pb-12'>
              <h2 className='text-lg font-semibold leading-9 text-gray-900'>Thông tin cá nhân</h2>
              <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                <div className='sm:col-span-3'>
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
                            className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-gray-900 outline-primary ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 sm:text-sm sm:leading-6'
                          />
                        </div>

                        <small className='text-red-600'>{error?.message}</small>
                      </>
                    )}
                  />
                </div>

                <div className='sm:col-span-3'>
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
                            className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-gray-900 outline-primary ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 sm:text-sm sm:leading-6'
                          />
                        </div>

                        <small className='text-red-600'>{error?.message}</small>
                      </>
                    )}
                  />
                </div>

                <div className='sm:col-span-3'>
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
                            value={field.value || ''}
                            onChange={(e) => {
                              field.onChange(e.target.value)
                            }}
                            type='date'
                            max={format(subYears(new Date(), 12), 'yyyy-MM-dd')}
                            min={format(new Date('1900'), 'yyyy-MM-dd')}
                            className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-gray-900 outline-primary ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 sm:text-sm sm:leading-6'
                          />
                        </div>

                        <small className='text-red-600'>{error?.message}</small>
                      </>
                    )}
                  />
                </div>
                <div className='sm:col-span-3'>
                  <div className=' text-sm font-medium leading-6 text-gray-900'>Giới tính</div>
                  <Controller
                    name={'gender'}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <div>
                          <div className='mt-3 inline-block gap-x-3'>
                            <label className='ml-2 block inline-block text-sm font-medium leading-6 text-gray-900'>
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
                            <label className='ml-2 block inline-block text-sm font-medium leading-6 text-gray-900'>
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
                <div className='sm:col-span-6'>
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
                            className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-gray-900 outline-primary ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 sm:text-sm sm:leading-6'
                          />
                        </div>

                        <small className='text-red-600'>{error?.message}</small>
                      </>
                    )}
                  />
                </div>

                <div className='sm:col-span-2'>
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
                            className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-gray-900 outline-primary ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 sm:text-sm sm:leading-6'
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

                <div className='sm:col-span-2'>
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
                            className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-gray-900 outline-primary ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 sm:text-sm sm:leading-6'
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

                <div className='sm:col-span-2'>
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
                            className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-gray-900 outline-primary ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 sm:text-sm sm:leading-6'
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
                            className='block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm outline-primary ring-1 ring-inset ring-gray-300   placeholder:text-gray-400 sm:text-sm sm:leading-6'
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
                            className='block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm outline-primary ring-1 ring-inset ring-gray-300   placeholder:text-gray-400 sm:text-sm sm:leading-6'
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
            <div className='mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-6'>
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
              </div>
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
          <Button disabled={!isValid}>Đăng ký</Button>
        </div>
      </form>
    </div>
  )
}

export default Register
