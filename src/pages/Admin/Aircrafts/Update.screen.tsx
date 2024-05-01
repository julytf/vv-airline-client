import Button from '@/components/ui/Button'
import Loading from '@/components/ui/Loading'
import { useToast } from '@/contexts/ToastNotify.context'
import { AircraftStatus } from '@/enums/aircraft.enums'
import IAddress from '@/interfaces/address/address.interface'
import ICountry from '@/interfaces/address/country.interface'
import IAircraft from '@/interfaces/aircraft/aircraft.interface'
import IAircraftModel from '@/interfaces/aircraft/aircraftModel.interface'
import addressService from '@/services/address.service'
import aircraftModelsService from '@/services/aircraftModels.service'
import aircraftsService from '@/services/aircrafts.service'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { FunctionComponent, useEffect, useState } from 'react'
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router'

interface IFormData {
  registrationNumber: string
  name?: string
  status?: AircraftStatus
  aircraftModel?: string
}

const formSchema = Joi.object({
  registrationNumber: Joi.string().required(),
  name: Joi.string().required(),
  status: Joi.string()
    .required()
    .valid(...Object.values(AircraftStatus)),
  aircraftModel: Joi.string().required(),
})

interface UpdateAircraftProps {}

const UpdateAircraft: FunctionComponent<UpdateAircraftProps> = () => {
  const { id } = useParams() as { id: string }
  const toast = useToast()

  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [aircraftModels, setAircraftModels] = useState<IAircraftModel[]>([])

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

  // console.log(isValid)
  // console.log(errors)
  console.log(formSchema.validate(watchAllFields))

  useEffect(() => {
    aircraftModelsService.getAllAircraftModel().then((data) => {
      setAircraftModels(data)
    })
  }, [])

  useEffect(() => {
    aircraftsService.getAircraft(id).then((data) => {
      reset({
        registrationNumber: data.registrationNumber,
        name: data.name,
        status: data.status,
        aircraftModel: data.aircraftModel,
      })
      setIsLoading(false)
    })
  }, [])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log('data', data)

    await aircraftsService
      .updateAircraft({
        _id: id!,
        ...data,
      } as IAircraft)
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
          <h2 className='text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Cập nhật Máy bay</h2>
        </div>
        <div className='mx-auto'>
          <div className='space-y-12'>
            <div className='border-b border-gray-900/10 pb-12'>
              <div className='mt-10 grid grid-cols-6 gap-x-6 gap-y-8 '>
                <div className='col-span-3'>
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
                </div>
                <div className='col-span-6'>
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

                <div className='col-span-3'>
                  <label htmlFor='aircraftModel' className='block text-sm font-medium leading-6 text-gray-900'>
                    Mẫu Máy bay
                  </label>
                  <Controller
                    name={'aircraftModel'}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <div className='mt-2'>
                          <select
                            id='aircraftModel'
                            value={field.value || ''}
                            onChange={(e) => {
                              field.onChange(e.target.value)
                            }}
                            className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
                            // onChange='provinceChangeHandler(this.value)'
                          >
                            <option value=''>--Chọn--</option>
                            {/* <option value='test value'>test</option> */}
                            {aircraftModels.map((model, index) => (
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
                </div>
                <div className='col-span-3'>
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
                            {/* <option value='test value'>test</option> */}
                            {Object.values(AircraftStatus).map((status, index) => (
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
                            {Object.values(AircraftType).map((type) => (
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

export default UpdateAircraft
