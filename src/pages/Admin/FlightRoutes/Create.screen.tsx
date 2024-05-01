import Button from '@/components/ui/Button'
import { TicketClass, TicketType } from '@/enums/ticket.enums'
import { UserGender, UserRole } from '@/enums/user.enums'
import IAddress from '@/interfaces/address/address.interface'
import ICountry from '@/interfaces/address/country.interface'
import IAirport from '@/interfaces/flight/airport.interface'
import IFlightRoute from '@/interfaces/flight/flightRoute.interface'
import addressService from '@/services/address.service'
import airportsService from '@/services/airports.service'
import flightRoutesService from '@/services/flightRoutes.service'
import updateUserSchema from '@/utils/validations/user/updateUser.schema'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { FunctionComponent, useEffect, useState } from 'react'
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form'

interface IFormData {
  distance?: number
  prices: {
    [TicketClass.ECONOMY]: {
      [TicketType.BUDGET]: number | null
      [TicketType.STANDARD]: number | null
      [TicketType.FLEXIBLE]: number | null
    }
    [TicketClass.BUSINESS]: {
      [TicketType.STANDARD]: number | null
      [TicketType.FLEXIBLE]: number | null
    }
  }
  departureAirport: string
  arrivalAirport: string
}

const formSchema = Joi.object({
  distance: Joi.number().required(),
  prices: {
    [TicketClass.ECONOMY]: {
      [TicketType.BUDGET]: Joi.number().required(),
      [TicketType.STANDARD]: Joi.number().required(),
      [TicketType.FLEXIBLE]: Joi.number().required(),
    },
    [TicketClass.BUSINESS]: {
      [TicketType.STANDARD]: Joi.number().required(),
      [TicketType.FLEXIBLE]: Joi.number().required(),
    },
  },
  departureAirport: Joi.string().required(),
  arrivalAirport: Joi.string().required(),
})

interface CreateFlightRouteProps {}

const CreateFlightRoute: FunctionComponent<CreateFlightRouteProps> = () => {
  const [isLoading, setIsLoading] = useState(true)

  const [airports, setAirports] = useState<IAirport[]>([])

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
  } = useForm<IFormData>({
    mode: 'onChange',
    resolver: joiResolver(formSchema),
  })

  // const watchAllFields = watch()

  // console.log(isValid)
  // console.log(errors)
  // console.log(formSchema.validate(watchAllFields))

  useEffect(() => {
    setIsLoading(true)
    airportsService.getAllAirports().then((data) => {
      setAirports(data)
      setIsLoading(false)
    })
  }, [])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log('data', data)

    await flightRoutesService.createFlightRoute(data as IFlightRoute)
    // reset()
  }

  return (
    <div className='flex justify-center p-8'>
      <form method='post' className='max-w-2xl flex-1 rounded-md bg-white p-6' onSubmit={handleSubmit(onSubmit)}>
        <div className='mx-auto w-full max-w-sm pt-6'>
          <h2 className='text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Thêm Tuyến bay</h2>
        </div>
        <div className='mx-auto'>
          <div className='space-y-12'>
            <div className='border-b border-gray-900/10 pb-12'>
              <div className='mt-10 grid grid-cols-6 gap-x-6 gap-y-8 '>
                <div className='col-span-3'>
                  <label htmlFor='departureAirport' className='block text-sm font-medium leading-6 text-gray-900'>
                    Sân bay đi
                  </label>
                  <Controller
                    name={'departureAirport'}
                    control={control}
                    render={({ field, fieldState: { error }, formState }) => (
                      <>
                        <div className='mt-2'>
                          <select
                            id='departureAirport'
                            value={field.value || ''}
                            onChange={(e) => {
                              field.onChange(e.target.value)
                            }}
                            className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
                          >
                            <option value=''>--Chọn--</option>
                            {airports.map((airport) => (
                              <option key={airport._id} value={airport._id}>
                                {airport.name}
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
                  <label htmlFor='arrivalAirport' className='block text-sm font-medium leading-6 text-gray-900'>
                    Sân bay đến
                  </label>
                  <Controller
                    name={'arrivalAirport'}
                    control={control}
                    render={({ field, fieldState: { error }, formState }) => (
                      <>
                        <div className='mt-2'>
                          <select
                            id='arrivalAirport'
                            value={field.value || ''}
                            onChange={(e) => {
                              field.onChange(e.target.value)
                            }}
                            className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
                          >
                            <option value=''>--Chọn--</option>
                            {airports.map((airport) => (
                              <option key={airport._id} value={airport._id}>
                                {airport.name}
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
                  <label className='block text-sm font-medium leading-6 text-gray-900'>Giá vé hạng Phổ thông</label>
                  <Controller
                    name={`prices.${TicketClass.ECONOMY}.${TicketType.FLEXIBLE}`}
                    control={control}
                    render={({ field, fieldState: { error }, formState }) => (
                      <>
                        <div className='mt-2 flex justify-between'>
                          <label
                            htmlFor={`prices.${TicketClass.ECONOMY}.${TicketType.FLEXIBLE}`}
                            className='block text-sm font-medium leading-6 text-gray-900'
                          >
                            Linh hoạt
                          </label>
                          <input
                            id={`prices.${TicketClass.ECONOMY}.${TicketType.FLEXIBLE}`}
                            value={field.value || ''}
                            onChange={(e) => {
                              field.onChange(e.target.value)
                            }}
                            type='number'
                            className='block rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
                          />
                        </div>

                        <small className='text-red-600'>{error?.message}</small>
                      </>
                    )}
                  />
                  <Controller
                    name={`prices.${TicketClass.ECONOMY}.${TicketType.STANDARD}`}
                    control={control}
                    render={({ field, fieldState: { error }, formState }) => (
                      <>
                        <div className='mt-2 flex justify-between'>
                          <label
                            htmlFor={`prices.${TicketClass.ECONOMY}.${TicketType.STANDARD}`}
                            className='block text-sm font-medium leading-6 text-gray-900'
                          >
                            Tiêu chuẩn
                          </label>
                          <input
                            id={`prices.${TicketClass.ECONOMY}.${TicketType.STANDARD}`}
                            value={field.value || ''}
                            onChange={(e) => {
                              field.onChange(e.target.value)
                            }}
                            type='number'
                            className='block rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
                          />
                        </div>

                        <small className='text-red-600'>{error?.message}</small>
                      </>
                    )}
                  />
                  <Controller
                    name={`prices.${TicketClass.ECONOMY}.${TicketType.BUDGET}`}
                    control={control}
                    render={({ field, fieldState: { error }, formState }) => (
                      <>
                        <div className='mt-2 flex justify-between'>
                          <label
                            htmlFor={`prices.${TicketClass.ECONOMY}.${TicketType.BUDGET}`}
                            className='block text-sm font-medium leading-6 text-gray-900'
                          >
                            Tiết kiệm
                          </label>
                          <input
                            id={`prices.${TicketClass.ECONOMY}.${TicketType.BUDGET}`}
                            value={field.value || ''}
                            onChange={(e) => {
                              field.onChange(e.target.value)
                            }}
                            type='number'
                            className='block rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
                          />
                        </div>

                        <small className='text-red-600'>{error?.message}</small>
                      </>
                    )}
                  />
                </div>
                <div className='col-span-3'>
                  <label className='block text-sm font-medium leading-6 text-gray-900'>Giá vé hạng Thương gia</label>
                  <Controller
                    name={`prices.${TicketClass.BUSINESS}.${TicketType.FLEXIBLE}`}
                    control={control}
                    render={({ field, fieldState: { error }, formState }) => (
                      <>
                        <div className='mt-2 flex justify-between'>
                          <label
                            htmlFor={`prices.${TicketClass.BUSINESS}.${TicketType.FLEXIBLE}`}
                            className='block text-sm font-medium leading-6 text-gray-900'
                          >
                            Linh hoạt
                          </label>
                          <input
                            id={`prices.${TicketClass.BUSINESS}.${TicketType.FLEXIBLE}`}
                            value={field.value || ''}
                            onChange={(e) => {
                              field.onChange(e.target.value)
                            }}
                            type='number'
                            className='block rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
                          />
                        </div>

                        <small className='text-red-600'>{error?.message}</small>
                      </>
                    )}
                  />
                  <Controller
                    name={`prices.${TicketClass.BUSINESS}.${TicketType.STANDARD}`}
                    control={control}
                    render={({ field, fieldState: { error }, formState }) => (
                      <>
                        <div className='mt-2 flex justify-between'>
                          <label
                            htmlFor={`prices.${TicketClass.BUSINESS}.${TicketType.STANDARD}`}
                            className='block text-sm font-medium leading-6 text-gray-900'
                          >
                            Tiêu chuẩn
                          </label>
                          <input
                            id={`prices.${TicketClass.BUSINESS}.${TicketType.STANDARD}`}
                            value={field.value || ''}
                            onChange={(e) => {
                              field.onChange(e.target.value)
                            }}
                            type='number'
                            className='block rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
                          />
                        </div>

                        <small className='text-red-600'>{error?.message}</small>
                      </>
                    )}
                  />
                </div>
                <div className='col-span-3'>
                  <label htmlFor={'distance'} className='block text-sm font-medium leading-6 text-gray-900'>
                    Khoảng cách
                  </label>
                  <Controller
                    name={'distance'}
                    control={control}
                    render={({ field, fieldState: { error }, formState }) => (
                      <>
                        <div className='mt-2'>
                          <input
                            id={'distance'}
                            value={field.value || ''}
                            onChange={(e) => {
                              field.onChange(e.target.value)
                            }}
                            type='number'
                            className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
                          />
                        </div>

                        <small className='text-red-600'>{error?.message}</small>
                      </>
                    )}
                  />
                </div>
                {/* <div className='col-span-3'>
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
                </div> */}
                {/* <div className='col-span-6'>
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
                </div> */}

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
                            {Object.values(FlightRouteType).map((type) => (
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

export default CreateFlightRoute
