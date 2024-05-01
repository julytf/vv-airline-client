import Button from '@/components/ui/Button'
import { TicketClass } from '@/enums/ticket.enums'
import IAircraft from '@/interfaces/aircraft/aircraft.interface'
import IFlight from '@/interfaces/flight/flight.interface'
import IFlightRoute from '@/interfaces/flight/flightRoute.interface'
import aircraftsService from '@/services/aircrafts.service'
import flightsService from '@/services/flights.service'
import flightRoutesService from '@/services/flightRoutes.service'
import updateUserSchema from '@/utils/validations/user/updateUser.schema'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { FunctionComponent, useEffect, useState } from 'react'
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import IFlightLeg from '@/interfaces/flight/flightLeg.interface'
import flightLegsService from '@/services/flightLegs.service'
import { FlightLegType } from '@/enums/flightLeg.enums'
import { minNotNull } from '@/utils/helpers'
import { useToast } from '@/contexts/ToastNotify.context'
import { useParams } from 'react-router'
import Loading from '@/components/ui/Loading'
import { format } from 'date-fns'

interface IFormData {
  departureDate: string
  // arrivalDate: Date

  // hasTransit: boolean
  // departureTime: Date
  // arrivalTime: Date
  // remainingSeats: {
  //   [ticketClass.ECONOMY]: number
  //   [ticketClass.BUSINESS]: number
  // }
  // flightRoute: IFlightRoute
  flightLegs: {
    [FlightLegType.DEPARTURE]: string
    [FlightLegType.TRANSIT]: string | null
  }
}

const formSchema = Joi.object({
  departureDate: Joi.string().optional(),
  // arrivalDate: Joi.date().required().greater(Joi.ref('departureDate')),

  // hasTransit: boolean
  // departureTime: Date
  // arrivalTime: Date
  // remainingSeats: {
  //   [ticketClass.ECONOMY]: number
  //   [ticketClass.BUSINESS]: number
  // }
  // flightRoute: IFlightRoute
  flightLegs: {
    [FlightLegType.DEPARTURE]: Joi.string().required(),
    [FlightLegType.TRANSIT]: Joi.string().optional().allow(''),
  },
})

interface UpdateFlightProps {}

const UpdateFlight: FunctionComponent<UpdateFlightProps> = () => {
  const { id } = useParams() as { id: string }
  const toast = useToast()

  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [departureFlightLegs, setDepartureFlightLegs] = useState<IFlightLeg[]>([])
  const [transitFlightLegs, setTransitFlightLegs] = useState<IFlightLeg[]>([])

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

  const formData = watch()

  // console.log(isValid)
  // console.log(errors)
  // console.log(formSchema.validate(formData))

  const departureFlightLeg = departureFlightLegs.find(
    (flightLeg) => flightLeg._id === formData.flightLegs?.[FlightLegType.DEPARTURE],
  )
  const transitFlightLeg = transitFlightLegs.find(
    (flightLeg) => flightLeg._id === formData.flightLegs?.[FlightLegType.TRANSIT],
  )

  const displayData = {
    // hasTransit: boolean,
    departureTime: departureFlightLeg?.departureTime,
    arrivalTime: transitFlightLeg?.arrivalTime ?? departureFlightLeg?.arrivalTime,
    remainingSeats: {
      [TicketClass.ECONOMY]: minNotNull(
        departureFlightLeg?.remainingSeats[TicketClass.ECONOMY] || null,
        transitFlightLeg?.remainingSeats[TicketClass.ECONOMY] || null,
      ),
      [TicketClass.BUSINESS]: minNotNull(
        departureFlightLeg?.remainingSeats[TicketClass.BUSINESS] || null,
        transitFlightLeg?.remainingSeats[TicketClass.BUSINESS] || null,
      ),
    },
    flightRoute: {
      departureAirport: departureFlightLeg?.flightRoute.departureAirport,
      arrivalAirport: transitFlightLeg?.flightRoute.arrivalAirport ?? departureFlightLeg?.flightRoute.arrivalAirport,
    },
  }

  useEffect(() => {
    if (!formData.departureDate) {
      setDepartureFlightLegs([])
      return
    }

    flightLegsService.getFlightLegsByDepartureTime(new Date(formData.departureDate)).then((data) => {
      setDepartureFlightLegs(data)
    })
  }, [formData.departureDate])

  useEffect(() => {
    if (!formData.flightLegs?.[FlightLegType.DEPARTURE]) {
      setDepartureFlightLegs([])
      return
    }
    const departureFlightLegDepartureTime = departureFlightLegs.find(
      (flightLeg) => flightLeg._id === formData.flightLegs?.[FlightLegType.DEPARTURE],
    )?.arrivalTime
    flightLegsService.getFlightLegsByDepartureTime(departureFlightLegDepartureTime!).then((data) => {
      setTransitFlightLegs(data)
    })
  }, [formData.flightLegs?.[FlightLegType.DEPARTURE]])

  useEffect(() => {
    flightsService.getFlight(id).then((data) => {
      reset({
        departureDate: format(data.departureTime, 'yyyy-MM-dd'),
        flightLegs: {
          [FlightLegType.DEPARTURE]: data.flightLegs[FlightLegType.DEPARTURE],
          [FlightLegType.TRANSIT]: data.flightLegs[FlightLegType.TRANSIT],
        },
      })
      setIsLoading(false)
    })
  }, [])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log('data', data)

    await flightsService
      .updateFlight({
        _id: id!,
        ...data,
      } as IFlight)
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
          <h2 className='text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Cập nhật Chuyến Bay</h2>
        </div>
        <div className='mx-auto'>
          <div className='space-y-12'>
            <div className='border-b border-gray-900/10 pb-12'>
              <div className='mt-10 grid grid-cols-6 gap-x-6 gap-y-8 '>
                <div className='col-span-3'>
                  <label htmlFor={'departureDate'} className='block text-sm font-medium leading-6 text-gray-900'>
                    Ngày đi
                  </label>
                  <Controller
                    name={'departureDate'}
                    control={control}
                    render={({ field, fieldState: { error }, formState }) => (
                      <>
                        <div className='mt-2'>
                          <input
                            id={'departureDate'}
                            value={field.value?.toString() || ''}
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
                <div className='col-span-3'></div>
                <div className='col-span-6'>
                  <label
                    htmlFor={`flightLegs.${FlightLegType.DEPARTURE}`}
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Chặng bay đi
                  </label>
                  <Controller
                    name={`flightLegs.${FlightLegType.DEPARTURE}`}
                    control={control}
                    render={({ field, fieldState: { error }, formState }) => (
                      <>
                        <div className='mt-2'>
                          <select
                            id={`flightLegs.${FlightLegType.DEPARTURE}`}
                            value={field.value || ''}
                            onChange={(e) => {
                              field.onChange(e.target.value)
                            }}
                            className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
                          >
                            <option value=''>--Chọn--</option>
                            {departureFlightLegs.map((flightLeg) => (
                              <option key={flightLeg._id} value={flightLeg._id}>
                                {flightLeg.flightRoute.departureAirport.IATA}-
                                {flightLeg.flightRoute.arrivalAirport.IATA} ({flightLeg.aircraft.name} ) -{' '}
                                {flightLeg._id}
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
                  <label
                    htmlFor={`flightLegs.${FlightLegType.TRANSIT}`}
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Chặng bay nối chuyến
                  </label>
                  <Controller
                    name={`flightLegs.${FlightLegType.TRANSIT}`}
                    control={control}
                    render={({ field, fieldState: { error }, formState }) => (
                      <>
                        <div className='mt-2'>
                          <select
                            id={`flightLegs.${FlightLegType.TRANSIT}`}
                            value={field.value || ''}
                            onChange={(e) => {
                              field.onChange(e.target.value)
                            }}
                            className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
                          >
                            <option value=''>--Chọn--</option>
                            {transitFlightLegs.map((flightLeg) => (
                              <option key={flightLeg._id} value={flightLeg._id}>
                                {flightLeg.flightRoute.departureAirport.IATA}-
                                {flightLeg.flightRoute.arrivalAirport.IATA} ({flightLeg.aircraft.name} ) -{' '}
                                {flightLeg._id}
                              </option>
                            ))}
                          </select>
                        </div>

                        <small className='text-red-600'>{error?.message}</small>
                      </>
                    )}
                  />
                </div>
                {/* <div className='col-span-3'>
                  <label
                    htmlFor={`remainingSeats.${ticketClass.ECONOMY}`}
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Số ghế hạng phổ thông
                  </label>
                  <Controller
                    name={`remainingSeats.${ticketClass.ECONOMY}`}
                    control={control}
                    render={({ field, fieldState: { error }, formState }) => (
                      <>
                        <div className='mt-2'>
                          <input
                            id={`remainingSeats.${ticketClass.ECONOMY}`}
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
                    htmlFor={`remainingSeats.${ticketClass.BUSINESS}`}
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Số ghế hạng thương gia
                  </label>
                  <Controller
                    name={`remainingSeats.${ticketClass.BUSINESS}`}
                    control={control}
                    render={({ field, fieldState: { error }, formState }) => (
                      <>
                        <div className='mt-2'>
                          <input
                            id={`remainingSeats.${ticketClass.BUSINESS}`}
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
                </div> */}
                <div className='col-span-3'>
                  <label htmlFor='status' className='block text-sm font-medium leading-6 text-gray-900'>
                    Sân bay khởi hành
                  </label>
                  <div className='mt-2'>
                    <div className='block w-full rounded-md border-0 bg-gray-300 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'>
                      {displayData?.flightRoute?.departureAirport?.IATA ?? '---'}
                    </div>
                  </div>

                  {/* <small className='text-red-600'>{error?.message}</small> */}
                </div>
                <div className='col-span-3'>
                  <label htmlFor='status' className='block text-sm font-medium leading-6 text-gray-900'>
                    Sân bay đến
                  </label>
                  <div className='mt-2'>
                    <div className='block w-full rounded-md border-0 bg-gray-300 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'>
                      {displayData?.flightRoute?.arrivalAirport?.IATA ?? '---'}
                    </div>
                  </div>

                  {/* <small className='text-red-600'>{error?.message}</small> */}
                </div>
                <div className='col-span-3'>
                  <label htmlFor='status' className='block text-sm font-medium leading-6 text-gray-900'>
                    Thời gian khởi hành
                  </label>
                  <div className='mt-2'>
                    <div className='block w-full rounded-md border-0 bg-gray-300 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'>
                      {displayData.departureTime ? new Date(displayData.departureTime).toLocaleString() : '---'}
                    </div>
                  </div>

                  {/* <small className='text-red-600'>{error?.message}</small> */}
                </div>
                <div className='col-span-3'>
                  <label htmlFor='status' className='block text-sm font-medium leading-6 text-gray-900'>
                    Thời gian đến
                  </label>
                  <div className='mt-2'>
                    <div className='block w-full rounded-md border-0 bg-gray-300 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'>
                      {displayData.arrivalTime ? new Date(displayData.arrivalTime).toLocaleString() : '---'}
                    </div>
                  </div>

                  {/* <small className='text-red-600'>{error?.message}</small> */}
                </div>
                <div className='col-span-3'>
                  <label htmlFor='status' className='block text-sm font-medium leading-6 text-gray-900'>
                    Số ghế hạng phổ thông
                  </label>
                  <div className='mt-2'>
                    <div className='block w-full rounded-md border-0 bg-gray-300 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'>
                      {displayData.remainingSeats[TicketClass.ECONOMY] !== Infinity
                        ? displayData.remainingSeats[TicketClass.ECONOMY]
                        : '---'}
                    </div>
                  </div>

                  {/* <small className='text-red-600'>{error?.message}</small> */}
                </div>
                <div className='col-span-3'>
                  <label htmlFor='status' className='block text-sm font-medium leading-6 text-gray-900'>
                    Số ghế hạng thương gia
                  </label>
                  <div className='mt-2'>
                    <div className='block w-full rounded-md border-0 bg-gray-300 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'>
                      {displayData.remainingSeats[TicketClass.BUSINESS] !== Infinity
                        ? displayData.remainingSeats[TicketClass.BUSINESS]
                        : '---'}
                    </div>
                  </div>

                  {/* <small className='text-red-600'>{error?.message}</small> */}
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
                            {Object.values(FlightType).map((type) => (
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

export default UpdateFlight
