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
  registrationNumber: Joi.string().required(),
  name: Joi.string().required(),
})

interface CreateAircraftModelProps {}

const CreateAircraftModel: FunctionComponent<CreateAircraftModelProps> = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
  } = useForm<IFormData>({
    mode: 'onChange',
    resolver: joiResolver(formSchema),
  })

  const watchAllFields = watch()

  // console.log(isValid)
  // console.log(errors)
  // console.log(formSchema.validate(watchAllFields))

  useEffect(() => {
    // aircraftModelModelsService.getAllAircraftModel().then((data) => {
    //   setAircraftModelModels(data)
    // })
  }, [])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log('data', data)

    await aircraftModelsService.createAircraftModel(data as IAircraftModel)
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
                {/* <div className='col-span-3'>
                  <label htmlFor='registrationNumber' className='block text-sm font-medium leading-6 text-gray-900'>
                    Số đăng ký
                  </label>
                  <Controller
                    name={'registrationNumber'}
                    control={control}
                    render={({ field, fieldState: { error }, formState }) => (
                      <>
                        <div className='mt-2'>
                          <input
                            id='registrationNumber'
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

export default CreateAircraftModel
