import { joiResolver } from '@hookform/resolvers/joi'
import { format, subYears } from 'date-fns'
import Joi, { ValidationErrorItem } from 'joi'
import { FunctionComponent, useEffect, useRef, useState } from 'react'
import { Control, Controller, FieldErrors, FieldValues, SubmitHandler, UseFormRegister, useForm } from 'react-hook-form'
import { PassengerType } from '../../../enums/passenger.enums'
import passengersInformationSchema from '../../../utils/validations/searchWizard/passenger.schema'
import PaymentSummaryCard from '@/components/Card/PaymentSummaryCard'
import Loading from '@/components/Loading/Loading'
import WizardBottomNavBar from '@/components/SearchWizard/NavBar/WizardBottomNavBar'
import { PassengersData, useSearchWizard } from '@/contexts/SearchWizard.context'
import { UserGender } from '@/enums/user.enums'

// type FirstPassengerInformation = {
//   lastName: string
//   firstName: string
//   dateOfBirth: Date
//   gender: UserGender
//   phoneNumber: string
//   email: string
// }
// type PassengerInformation = {
//   lastName: string
//   firstName: string
//   dateOfBirth: Date
//   gender: UserGender
// }

// type PassengersInformation = {
//   adultsInfo: [FirstPassengerInformation, ...PassengerInformation[]]
//   childrenInfo: PassengerInformation[]
// }

interface PassengersInformationProps {}

const PassengersInformation: FunctionComponent<PassengersInformationProps> = () => {
  const { data, setData, actions } = useSearchWizard()

  const [loading, setLoading] = useState(true)
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
    watch,
  } = useForm<PassengersData>({
    mode: 'onChange',
    resolver: joiResolver(passengersInformationSchema),
  })
  const formData = watch()

  console.log('-----------')
  console.log('errors', errors)
  console.log('isValid', isValid)
  console.log('formData', formData)

  console.log('validate', passengersInformationSchema.validate(formData))

  const isForwardAble = isValid
  const isBackwardAble = true

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log('data', data)
    // reset()
  }

  const onForward = () => {
    console.log('onForward', formData)

    setData((prev) => ({
      ...prev,
      passengersData: formData,
    }))

    actions.nextStep()
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false)
  //   }, 500)
  // }, [])

  // if (loading) {
  //   return <Loading />
  // }
  return (
    <div>
      <div className='mx-auto mb-24 mt-16 grid grid-cols-12 gap-16'>
        <div className='col-span-8'>
          <form onSubmit={handleSubmit(onSubmit)} className='mx-auto flex max-w-2xl flex-col gap-y-16'>
            <button>button</button>
            {new Array(data.searchData.passengers[PassengerType.ADULT]).fill(0).map((_, index) => (
              <PassengerInformationForm key={index} type={PassengerType.ADULT} index={index} control={control} />
            ))}
            {new Array(data.searchData.passengers[PassengerType.CHILD]).fill(0).map((_, index) => (
              <PassengerInformationForm key={index} type={PassengerType.CHILD} index={index} control={control} />
            ))}
          </form>
        </div>
        <PaymentSummaryCard className='col-span-4' />
      </div>
      <WizardBottomNavBar
        isForwardEnabled={isForwardAble}
        onClickForward={onForward}
        isBackwardEnabled={isBackwardAble}
        onClickBackward={actions.prevStep}
      />
    </div>
  )
}

interface PassengerInformationFormProps {
  type: PassengerType
  index: number
  control?: Control<PassengersData>
}
const PassengerInformationForm: FunctionComponent<PassengerInformationFormProps> = ({ type, index, control }) => {
  return (
    <div className='rounded-md border-2 border-solid pt-0 shadow-lg'>
      <div className='w-full  border-b p-6 py-3 sm:w-full'>
        <h2 className='text-lg font-bold tracking-tight text-gray-900'>
          {type === PassengerType.ADULT ? 'Hành khách người lớn ' : 'Hành khách trẻ em '}
          {index + 1}
        </h2>
      </div>
      <div className='mx-auto max-w-2xl p-8'>
        <div className='space-y-12'>
          <div className='border-gray-900/10'>
            <div className='grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-3'>
                <label htmlFor='lastName' className='block text-sm font-medium leading-6 text-gray-900'>
                  Họ
                </label>
                <Controller
                  name={`${type}.${index}.lastName`}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <div className='mt-2'>
                        <input
                          id='lastName'
                          type='text'
                          value={field.value || ''}
                          onChange={(e) => {
                            field.onChange(e.target.value)
                          }}
                          className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-gray-900 outline-primary ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 sm:text-sm sm:leading-6'
                        />
                      </div>
                      <small className='text-red-600'>{<>{error?.message}</>}</small>
                    </>
                  )}
                />
              </div>

              <div className='sm:col-span-3'>
                <label htmlFor='firstName' className='block text-sm font-medium leading-6 text-gray-900'>
                  Tên
                </label>
                <Controller
                  name={`${type}.${index}.firstName`}
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
                  name={`${type}.${index}.dateOfBirth`}
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
                  name={`${type}.${index}.gender`}
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
                      <small className='text-red-600'>{<>{error?.message}</>}</small>
                    </>
                  )}
                />
              </div>
              {type === PassengerType.ADULT && index === 0 && (
                <>
                  <div className='sm:col-span-6'>
                    <label htmlFor='phoneNumber' className='block text-sm font-medium leading-6 text-gray-900'>
                      Số điện thoại
                    </label>
                    <Controller
                      name={`${type}.${index}.phoneNumber`}
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
                  <div className='sm:col-span-6'>
                    <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
                      Email
                    </label>
                    <Controller
                      name={`${type}.${index}.email`}
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
                              className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-gray-900 outline-primary ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 sm:text-sm sm:leading-6'
                            />
                          </div>
                          <small className='text-red-600'>{<>{error?.message}</>}</small>
                        </>
                      )}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PassengersInformation
