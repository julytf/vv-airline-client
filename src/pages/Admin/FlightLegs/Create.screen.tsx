import Button from '@/components/ui/Button'
import { AirportType } from '@/enums/airport.enums'
import { UserGender, UserRole } from '@/enums/user.enums'
import IAddress from '@/interfaces/address/address.interface'
import ICountry from '@/interfaces/address/country.interface'
import IAirport from '@/interfaces/flight/airport.interface'
import addressService from '@/services/address.service'
import airportsService from '@/services/airports.service'
import updateUserSchema from '@/utils/validations/user/updateUser.schema'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { FunctionComponent, useEffect, useState } from 'react'
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form'

interface IFormData {
  IATA: string
  //   countryCode: string
  city: string
  country: string
  type: AirportType
  name: string
  description?: string
  longitude?: number
  latitude?: number
  address?: IAddress
}

const formSchema = Joi.object({
  IATA: Joi.string().required(),
  //   countryCode: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  type: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string(),
  //   longitude: Joi.number(),
  //   latitude: Joi.number(),
  //   address: Joi.object(),
})

interface CreateAirportProps {}

const CreateAirport: FunctionComponent<CreateAirportProps> = () => {
  const [countries, setCountries] = useState<ICountry[]>([])

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
    watch,
  } = useForm<IFormData>({
    mode: 'onChange',
    resolver: joiResolver(formSchema),
  })

  const watchAllFields = watch()

  console.log(isValid)
  console.log(errors)
  console.log(formSchema.validate(watchAllFields))

  useEffect(() => {
    addressService.getCountries().then((data) => {
      setCountries(data)
    })
  }, [])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log('data', data)

    await airportsService.createAirport(data as IAirport)
    // reset()
  }

  return (
    <div className='flex justify-center p-8'>
      <form method='post' className='max-w-2xl flex-1 rounded-md bg-white p-6' onSubmit={handleSubmit(onSubmit)}>
        <div className='mx-auto w-full max-w-sm pt-6'>
          <h2 className='text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Thêm Sân Bay</h2>
        </div>
        <div className='mx-auto'>
          <div className='space-y-12'>
            <div className='border-b border-gray-900/10 pb-12'>
              <div className='mt-10 grid grid-cols-6 gap-x-6 gap-y-8 '>
                <div className='col-span-3'>
                  <label htmlFor='IATA' className='block text-sm font-medium leading-6 text-gray-900'>
                    IATA
                  </label>
                  <Controller
                    name={'IATA'}
                    control={control}
                    render={({ field, fieldState: { error }, formState }) => (
                      <>
                        <div className='mt-2'>
                          <input
                            id='IATA'
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
                  <label htmlFor='city' className='block text-sm font-medium leading-6 text-gray-900'>
                    Thành phố
                  </label>
                  <Controller
                    name={'city'}
                    control={control}
                    render={({ field, fieldState: { error }, formState }) => (
                      <>
                        <div className='mt-2'>
                          <input
                            id='city'
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
                <div className='col-span-6'>
                  <label htmlFor='name' className='block text-sm font-medium leading-6 text-gray-900'>
                    Tên
                  </label>
                  <Controller
                    name={'name'}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <div className='mt-2'>
                          <input
                            id='name'
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
                  <label htmlFor='country' className='block text-sm font-medium leading-6 text-gray-900'>
                    Quốc gia
                  </label>
                  <Controller
                    name={'country'}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <div className='mt-2'>
                          <select
                            id='country'
                            value={field.value || ''}
                            onChange={(e) => {
                              field.onChange(e.target.value)
                            }}
                            className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
                            // onChange='provinceChangeHandler(this.value)'
                          >
                            <option value=''>--Chọn--</option>
                            {/* <option value='test value'>test</option> */}
                            {countries.map((country, index) => (
                              <option key={index} value={country._id}>
                                {country.name}
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
                            {Object.values(AirportType).map((type) => (
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
                </div>
                <div className='col-span-6'>
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
                </div>
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

export default CreateAirport
