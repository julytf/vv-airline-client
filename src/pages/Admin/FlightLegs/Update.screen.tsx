import Button from '@/components/ui/Button'
import Loading from '@/components/ui/Loading'
import { useToast } from '@/contexts/ToastNotify.context'
import { FlightLegStatus } from '@/enums/flightLeg.enums'
import { TicketClass } from '@/enums/ticket.enums'
import IAircraft from '@/interfaces/aircraft/aircraft.interface'
import IFlightLeg from '@/interfaces/flight/flightLeg.interface'
import IFlightRoute from '@/interfaces/flight/flightRoute.interface'
import aircraftsService from '@/services/aircrafts.service'
import flightLegsService from '@/services/flightLegs.service'
import flightRoutesService from '@/services/flightRoutes.service'
import updateUserSchema from '@/utils/validations/user/updateUser.schema'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { FunctionComponent, useEffect, useState } from 'react'
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router'

interface IFormData {
  flightNumber: string
  departureTime: string
  arrivalTime: string
  remainingSeats: {
    [TicketClass.ECONOMY]: number
    [TicketClass.BUSINESS]: number
  }
  status: FlightLegStatus
  flightRoute: string
  aircraft: string
}

const formSchema = Joi.object({
  flightNumber: Joi.string().optional(),
  departureTime: Joi.string().required(),
  arrivalTime: Joi.string().required(),
  remainingSeats: {
    [TicketClass.ECONOMY]: Joi.number().required(),
    [TicketClass.BUSINESS]: Joi.number().required(),
  },
  status: Joi.string().required(),
  flightRoute: Joi.string().required(),
  aircraft: Joi.string().required(),
})

interface UpdateFlightLegProps {}

const UpdateFlightLeg: FunctionComponent<UpdateFlightLegProps> = () => {
  const { id } = useParams() as { id: string }
  const toast = useToast()

  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [flightRoutes, setFlightRoutes] = useState<IFlightRoute[]>([])
  const [aircrafts, setAircrafts] = useState<IAircraft[]>([])

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
    flightRoutesService.getAllFlightRoutes().then((data) => {
      setFlightRoutes(data)
    })
    aircraftsService.getAllAircrafts().then((data) => {
      setAircrafts(data)
    })
  }, [])

  useEffect(() => {
    flightLegsService.getFlightLeg(id).then((data) => {
      reset({
        flightNumber: data.flightNumber,
        departureTime: new Date(data.departureTime).toISOString().slice(0, -5),
        arrivalTime: new Date(data.arrivalTime).toISOString().slice(0, -5),
        remainingSeats: {
          [TicketClass.ECONOMY]: data.remainingSeats[TicketClass.ECONOMY],
          [TicketClass.BUSINESS]: data.remainingSeats[TicketClass.BUSINESS],
        },
        status: data.status,
        flightRoute: data.flightRoute?._id || data.flightRoute,
        aircraft: data.aircraft?._id || data.aircraft,
      })
      setIsLoading(false)
    })
  }, [])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log('data', data)

    await flightLegsService
      .updateFlightLeg({
        _id: id!,
        ...data,
      } as IFlightLeg)
      .then((data) => {
        toast.success('Cập nhật thành công')
      })
    // reset()
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className='flex justify-center p-8'>
      <form method='post' className='max-w-2xl flex-1 rounded-md bg-white p-6' onSubmit={handleSubmit(onSubmit)}>
        <div className='mx-auto w-full max-w-sm pt-6'>
          <h2 className='text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Cập nhật Chặng Bay</h2>
        </div>
        <div className='mx-auto'>
          <div className='space-y-12'>
            <div className='border-b border-gray-900/10 pb-12'>
              <div className='mt-10 grid grid-cols-6 gap-x-6 gap-y-8 '>
                <div className='col-span-3'>
                  <label htmlFor={'flightNumber'} className='block text-sm font-medium leading-6 text-gray-900'>
                    Số hiệu chuyến bay
                  </label>
                  <Controller
                    name={'flightNumber'}
                    control={control}
                    render={({ field, fieldState: { error }, formState }) => (
                      <>
                        <div className='mt-2'>
                          <input
                            id={'flightNumber'}
                            value={field.value || ''}
                            disabled
                            className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
                          />
                        </div>

                        <small className='text-red-600'>{error?.message}</small>
                      </>
                    )}
                  />
                </div>
                <div className='col-span-3'></div>
                <div className='col-span-3'>
                  <label htmlFor={'departureTime'} className='block text-sm font-medium leading-6 text-gray-900'>
                    Thời gian khởi hành
                  </label>
                  <Controller
                    name={'departureTime'}
                    control={control}
                    render={({ field, fieldState: { error }, formState }) => (
                      <>
                        <div className='mt-2'>
                          <input
                            id={'departureTime'}
                            value={field.value || ''}
                            onChange={(e) => {
                              console.log(e.target.value)
                              field.onChange(e.target.value)
                            }}
                            type='datetime-local'
                            className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
                          />
                        </div>

                        <small className='text-red-600'>{error?.message}</small>
                      </>
                    )}
                  />
                </div>
                <div className='col-span-3'>
                  <label htmlFor={'arrivalTime'} className='block text-sm font-medium leading-6 text-gray-900'>
                    Thời gian đến
                  </label>
                  <Controller
                    name={'arrivalTime'}
                    control={control}
                    render={({ field, fieldState: { error }, formState }) => (
                      <>
                        <div className='mt-2'>
                          <input
                            id={'arrivalTime'}
                            value={field.value}
                            onChange={(e) => {
                              field.onChange(e.target.value)
                            }}
                            type='datetime-local'
                            className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
                          />
                        </div>

                        <small className='text-red-600'>{error?.message}</small>
                      </>
                    )}
                  />
                </div>
                <div className='col-span-3'>
                  <label
                    htmlFor={`remainingSeats.${TicketClass.ECONOMY}`}
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Số ghế hạng phổ thông
                  </label>
                  <Controller
                    name={`remainingSeats.${TicketClass.ECONOMY}`}
                    control={control}
                    render={({ field, fieldState: { error }, formState }) => (
                      <>
                        <div className='mt-2'>
                          <input
                            id={`remainingSeats.${TicketClass.ECONOMY}`}
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
                <div className='col-span-3'>
                  <label
                    htmlFor={`remainingSeats.${TicketClass.BUSINESS}`}
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Số ghế hạng thương gia
                  </label>
                  <Controller
                    name={`remainingSeats.${TicketClass.BUSINESS}`}
                    control={control}
                    render={({ field, fieldState: { error }, formState }) => (
                      <>
                        <div className='mt-2'>
                          <input
                            id={`remainingSeats.${TicketClass.BUSINESS}`}
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
                <div className='col-span-3'>
                  <label htmlFor='flightRoute' className='block text-sm font-medium leading-6 text-gray-900'>
                    Tuyến bay
                  </label>
                  <Controller
                    name={'flightRoute'}
                    control={control}
                    render={({ field, fieldState: { error }, formState }) => (
                      <>
                        <div className='mt-2'>
                          <select
                            id='flightRoute'
                            value={field.value || ''}
                            onChange={(e) => {
                              field.onChange(e.target.value)
                            }}
                            className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
                          >
                            <option value=''>--Chọn--</option>
                            {flightRoutes.map((flightRoute) => (
                              <option key={flightRoute._id} value={flightRoute._id}>
                                {flightRoute.departureAirport.IATA} - {flightRoute.arrivalAirport.IATA}
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
                  <label htmlFor='aircraft' className='block text-sm font-medium leading-6 text-gray-900'>
                    Máy bay
                  </label>
                  <Controller
                    name={'aircraft'}
                    control={control}
                    render={({ field, fieldState: { error }, formState }) => (
                      <>
                        <div className='mt-2'>
                          <select
                            id='aircraft'
                            value={field.value || ''}
                            onChange={(e) => {
                              field.onChange(e.target.value)
                            }}
                            className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
                          >
                            <option value=''>--Chọn--</option>
                            {aircrafts.map((aircraft) => (
                              <option key={aircraft._id} value={aircraft._id}>
                                {aircraft.name} - {aircraft.aircraftModel?.name}
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
                  <label htmlFor='status' className='block text-sm font-medium leading-6 text-gray-900'>
                    Trạng thái
                  </label>
                  <Controller
                    name={'status'}
                    control={control}
                    render={({ field, fieldState: { error }, formState }) => (
                      <>
                        <div className='mt-2'>
                          <select
                            id='status'
                            value={field.value || ''}
                            onChange={(e) => {
                              field.onChange(e.target.value)
                            }}
                            className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
                          >
                            <option value=''>--Chọn--</option>
                            {Object.values(FlightLegStatus).map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </div>

                        <small className='text-red-600'>{error?.message}</small>
                      </>
                    )}
                  />
                </div>
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
                            {Object.values(FlightLegType).map((type) => (
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

export default UpdateFlightLeg
