import Button from '@/components/ui/Button'
import { UserGender, UserRole } from '@/enums/user.enums'
import IAddress from '@/interfaces/address/address.interface'
import ICountry from '@/interfaces/address/country.interface'
import IDistrict from '@/interfaces/address/district.interface'
import IProvince from '@/interfaces/address/province.interface'
import IWard from '@/interfaces/address/ward.interface'
import IUser from '@/interfaces/user.interface'
import addressService from '@/services/address.service'
import usersService from '@/services/users.service'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { FunctionComponent, useEffect, useRef, useState } from 'react'
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form'

interface IFormData {
  firstName: string
  lastName: string
  role: UserRole
  password: string
  email: string
  phoneNumber?: string
  dateOfBirth?: string
  gender?: UserGender
  address?: IAddress
}

const formSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  role: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().required(),
  phoneNumber: Joi.string().optional(),
  dateOfBirth: Joi.string().optional(),
  gender: Joi.string().optional(),
  address: {
    province: Joi.string().optional(),
    district: Joi.string().optional(),
    ward: Joi.string().optional(),
    address: Joi.string().optional(),
    address2: Joi.string().optional(),
  },
})

interface CreateUsersProps {}

const CreateUsers: FunctionComponent<CreateUsersProps> = () => {
  const [provinces, setProvinces] = useState<IProvince[]>([])
  const [districts, setDistricts] = useState<IDistrict[]>([])
  const [wards, setWards] = useState<IWard[]>([])

  const provinceInputRef = useRef<HTMLSelectElement>(null)
  const districtInputRef = useRef<HTMLSelectElement>(null)

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
  } = useForm<IFormData>({
    mode: 'onChange',
    resolver: joiResolver(formSchema),
  })

  const formData = watch()

  // console.log(isValid)
  console.log(errors)
  console.log(formSchema.validate(formData))
  // console.log(formSchema)
  console.log('here')

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

  useEffect(() => {}, [])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log('data', data)

    await usersService.createUser(data as IUser)

    // reset()
  }

  return (
    <div className='flex justify-center p-8'>
      <form method='post' className='max-w-2xl flex-1 rounded-md bg-white p-6' onSubmit={handleSubmit(onSubmit)}>
        <div className='mx-auto w-full max-w-sm pt-6'>
          <h2 className='text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Thêm Người Dùng</h2>
        </div>
        <div className='mx-auto'>
          <div className='space-y-12'>
            <div className='border-b border-gray-900/10 pb-12'>
              <div className='mt-10 grid grid-cols-6 gap-x-6 gap-y-8 '>
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
                    render={({ field, fieldState: { error }, formState }) => (
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
                  <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
                    Email
                  </label>
                  <Controller
                    name={'email'}
                    control={control}
                    render={({ field, fieldState: { error }, formState }) => (
                      <>
                        <div className='mt-2'>
                          <input
                            id='email'
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
                  <label htmlFor='phoneNumber' className='block text-sm font-medium leading-6 text-gray-900'>
                    Số điện thoại
                  </label>
                  <Controller
                    name={'phoneNumber'}
                    control={control}
                    render={({ field, fieldState: { error }, formState }) => (
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
                <div className='col-span-3'>
                  <label htmlFor='role' className='block text-sm font-medium leading-6 text-gray-900'>
                    Vai trò
                  </label>
                  <Controller
                    name={'role'}
                    control={control}
                    render={({ field, fieldState: { error }, formState }) => (
                      <>
                        <div className='mt-2'>
                          <select
                            id='role'
                            value={field.value || ''}
                            onChange={(e) => {
                              field.onChange(e.target.value)
                            }}
                            className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-gray-900 outline-primary ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 sm:text-sm sm:leading-6'
                            // onChange='provinceChangeHandler(this.value)'
                          >
                            <option value=''>--Chọn--</option>
                            {Object.values(UserRole).map((role) => (
                              <option key={role} value={role}>
                                {role}
                              </option>
                            ))}
                          </select>
                        </div>

                        <small className='text-red-600'>{error?.message}</small>
                      </>
                    )}
                  />
                </div>
                <div className='col-span-3'>
                  <label htmlFor='password' className='block text-sm font-medium leading-6 text-gray-900'>
                    Mật khẩu
                  </label>
                  <Controller
                    name={'password'}
                    control={control}
                    render={({ field, fieldState: { error }, formState }) => (
                      <>
                        <div className='mt-2'>
                          <input
                            id='password'
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
                  <label htmlFor='gender' className='block text-sm font-medium leading-6 text-gray-900'>
                    Giới tính
                  </label>
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
                                  field.onChange(e.target.value)
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
                                  field.onChange(e.target.value)
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
                <div className='col-span-3'>
                  <label htmlFor='dateOfBirth' className='block text-sm font-medium leading-6 text-gray-900'>
                    Ngày sinh
                  </label>
                  <Controller
                    name={'dateOfBirth'}
                    control={control}
                    render={({ field, fieldState: { error }, formState }) => (
                      <>
                        <div className='mt-2'>
                          <input
                            id='dateOfBirth'
                            value={field.value || ''}
                            onChange={(e) => {
                              field.onChange(e.target.value)
                            }}
                            type='date'
                            className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
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
                {/* <div className='col-span-3'>
                  <label htmlFor='type' className='block text-sm font-medium leading-6 text-gray-900'>
                    Loại Sân bay
                  </label>
                  <Controller
                    name={'type'}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <div className='mt-2'>
                          <select
                            id='type'
                            value={field.value || ''}
                            onChange={(e) => {
                              field.onChange(e.target.value)
                            }}
                            className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
                            // onChange='provinceChangeHandler(this.value)'
                          >
                            <option value=''>--Chọn--</option>
                            {Object.values(UsersType).map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>

                        <small className='text-red-600'>{error?.message}</small>
                      </>
                    )}
                  />
                </div> */}
                {/* <div className='col-span-6'>
                  <label htmlFor='description' className='block text-sm font-medium leading-6 text-gray-900'>
                    Thông tin
                  </label>
                  <Controller
                    name={'description'}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <div className='mt-2'>
                          <textarea
                            id='description'
                            value={field.value || ''}
                            onChange={(e) => {
                              field.onChange(e.target.value)
                            }}
                            //   type='text'
                            className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
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
        </div>
        <div className='mt-6 flex items-center justify-end gap-x-6 p-6'>
          <Button disabled={!isValid}>Lưu</Button>
        </div>
      </form>
    </div>
  )
}

export default CreateUsers
