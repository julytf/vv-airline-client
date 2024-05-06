import Button from '@/components/ui/Button'
import { TicketClass } from '@/enums/ticket.enums'
import IAddress from '@/interfaces/address/address.interface'
import ICountry from '@/interfaces/address/country.interface'
import IAircraftModel, { ICabinModel } from '@/interfaces/aircraft/aircraftModel.interface'
import aircraftModelsService from '@/services/aircraftModels.service'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { FunctionComponent, useEffect, useState } from 'react'
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import SeatMapBuilder from './SeatMapBuilder'
import { SeatStatus, SeatType } from '@/enums/seat.enums'
import { useParams } from 'react-router'
import { useToast } from '@/contexts/ToastNotify.context'
import Loading from '@/components/ui/Loading'

interface IFormData {
  _id?: string
  name?: string
  seatQuantity: {
    [TicketClass.ECONOMY]: number
    [TicketClass.BUSINESS]: number
  }
  seatMap: ICabinModel[]
}

const formSchema = Joi.object({
  name: Joi.string().required(),
  // seatQuantity: Joi.object({
  //   [TicketClass.ECONOMY]: Joi.number().required(),
  //   [TicketClass.BUSINESS]: Joi.number().required(),
  // }).required(),
  seatMap: Joi.array().items(
    Joi.object({
      class: Joi.string().valid(TicketClass.ECONOMY, TicketClass.BUSINESS).required(),
      noRow: Joi.number().required(),
      noCol: Joi.number().required(),
      aisleCol: Joi.array().items(Joi.number()).required(),
      map: Joi.array().items(
        Joi.object({
          index: Joi.number().required(),
          hasExit: Joi.boolean().required(),
          seats: Joi.array().items(
            Joi.object({
              // _id: Joi.string().optional(),
              code: Joi.string().required(),
              col: Joi.string().required(),
              row: Joi.number().required(),
              seatType: Joi.string().valid(SeatType.WINDOW, SeatType.NORMAL, SeatType.AISLE).required(),
              ticketClass: Joi.string().valid(TicketClass.ECONOMY, TicketClass.BUSINESS).required(),
              status: Joi.string().valid(SeatStatus.AVAILABLE, SeatStatus.UNAVAILABLE).required(),
            }),
          ),
        }),
      ),
    }),
  ),
})

interface UpdateAircraftModelProps {}

const UpdateAircraftModel: FunctionComponent<UpdateAircraftModelProps> = () => {
  const { id } = useParams() as { id: string }
  const toast = useToast()

  const [isLoading, setIsLoading] = useState<boolean>(true)

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
    reset,
  } = useForm<IFormData>({
    mode: 'onChange',
    resolver: joiResolver(formSchema),
  })

  const watchAllFields = watch()
  console.log(watchAllFields)

  // console.log(isValid)
  // console.log(errors)
  console.log(formSchema.validate(watchAllFields))

  const economySeatsQuantity = watchAllFields.seatMap
    ?.map((cabin) => {
      if (cabin.class !== TicketClass.ECONOMY) return 0
      return cabin.map
        .map((row) => row.seats.filter((seat) => seat.status === SeatStatus.AVAILABLE).length)
        .reduce((a, b) => a + b, 0)
    })
    .reduce((a, b) => a + b, 0)
  const businessSeatsQuantity = watchAllFields.seatMap
    ?.map((cabin) => {
      if (cabin.class !== TicketClass.BUSINESS) return 0
      return cabin.map
        .map((row) => row.seats.filter((seat) => seat.status === SeatStatus.AVAILABLE).length)
        .reduce((a, b) => a + b, 0)
    })
    .reduce((a, b) => a + b, 0)

  const displayData = {
    seatQuantity: {
      [TicketClass.ECONOMY]: economySeatsQuantity,
      [TicketClass.BUSINESS]: businessSeatsQuantity,
    },
  }

  useEffect(() => {
    aircraftModelsService.getAircraftModel(id!).then((data) => {
      reset({
        name: data.name,
        // seatQuantity: {
        //   [TicketClass.ECONOMY]: data.seatQuantity[TicketClass.ECONOMY],
        //   [TicketClass.BUSINESS]: data.seatQuantity[TicketClass.BUSINESS],
        // },
        seatMap: data.seatMap.map(
          (cabin: ICabinModel) =>
            ({
              class: cabin.class,
              noRow: cabin.noRow,
              noCol: cabin.noCol,
              aisleCol: cabin.aisleCol,
              map: cabin.map.map((row) => ({
                index: row.index,
                hasExit: row.hasExit,
                seats: row.seats.map((seat) => ({
                  code: seat.code,
                  col: seat.col,
                  row: seat.row,
                  seatType: seat.seatType,
                  ticketClass: seat.ticketClass,
                  status: seat.status,
                })),
              })),
            }) as ICabinModel,
        ),
      })
      setIsLoading(false)
    })
  }, [])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log('data', data)

    await await aircraftModelsService
      .updateAircraftModel({
        _id: id!,
        ...data,
      } as IAircraftModel)
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
          <h2 className='text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Cập nhật Sân Bay</h2>
        </div>
        <div className='mx-auto'>
          <div className='space-y-12'>
            <div className='border-b border-gray-900/10 pb-12'>
              <div className='mt-10 grid grid-cols-6 gap-x-6 gap-y-8 '>
                <div className='col-span-3'>
                  <label htmlFor='name' className='block text-sm font-medium leading-6 text-gray-900'>
                    Tên
                  </label>
                  <Controller
                    name={'name'}
                    control={control}
                    render={({ field, fieldState: { error }, formState }) => (
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
                <div className='col-span-3'></div>
                <div className='col-span-3'>
                  <label
                    htmlFor={`seatQuantity.${TicketClass.BUSINESS}`}
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Số lượng ghế Hạng Thương Gia
                  </label>
                  <div className='mt-2'>
                    <input
                      id={`seatQuantity.${TicketClass.BUSINESS}`}
                      value={displayData.seatQuantity[TicketClass.BUSINESS]?.toString() || '---'}
                      disabled
                      placeholder='---'
                      type='text'
                      className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
                    />
                  </div>
                </div>
                <div className='col-span-3'>
                  <label
                    htmlFor={`seatQuantity.${TicketClass.ECONOMY}`}
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Số lượng ghế Hạng Phổ Thông
                  </label>
                  <div className='mt-2'>
                    <input
                      id={`seatQuantity.${TicketClass.ECONOMY}`}
                      value={displayData.seatQuantity[TicketClass.ECONOMY]?.toString() || '---'}
                      disabled
                      placeholder='---'
                      type='text'
                      className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
                    />
                  </div>
                </div>
                <div className='col-span-6'>
                  <label className='block text-sm font-medium leading-6 text-gray-900'>Bản đồ ghế</label>
                  <Controller
                    name={`seatMap`}
                    control={control}
                    render={({ field, fieldState: { error }, formState }) => (
                      <>
                        <div className='mt-2'>
                          <SeatMapBuilder
                            value={field.value || []}
                            onChange={(value) => {
                              field.onChange(value)
                            }}
                          />
                        </div>

                        {/* <small className='text-red-600'>{error?.message}</small> */}
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
                    render={({ field, fieldState: { error }, formState }) => (
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
                  <label htmlFor='aircraftModelModel' className='block text-sm font-medium leading-6 text-gray-900'>
                    Mẫu Máy bay
                  </label>
                  <Controller
                    name={'aircraftModelModel'}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <div className='mt-2'>
                          <select
                            id='aircraftModelModel'
                            value={field.value || ''}
                            onChange={(e) => {
                              field.onChange(e.target.value)
                            }}
                            className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
                            // onChange='provinceChangeHandler(this.value)'
                          >
                            <option value=''>--Chọn--</option>
                            {aircraftModelModels.map((model, index) => (
                              <option key={index} value={model._id}>
                                {model.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <small className='text-red-600'>{error?.message}</small>
                      </>
                    )}
                  />
                </div> */}
                {/* <div className='col-span-3'>
                  <label htmlFor='status' className='block text-sm font-medium leading-6 text-gray-900'>
                    Trạng thái
                  </label>
                  <Controller
                    name={'status'}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <div className='mt-2'>
                          <select
                            id='status'
                            value={field.value || ''}
                            onChange={(e) => {
                              field.onChange(e.target.value)
                            }}
                            className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
                            // onChange='provinceChangeHandler(this.value)'
                          >
                            <option value=''>--Chọn--</option>
                            {Object.values(AircraftModelStatus).map((status, index) => (
                              <option key={index} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
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

export default UpdateAircraftModel
