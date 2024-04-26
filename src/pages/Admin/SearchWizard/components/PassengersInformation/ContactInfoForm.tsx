import { PassengersData } from '@/contexts/SearchWizard.context'
import { PassengerType } from '@/enums/passenger.enums'
import { UserGender } from '@/enums/user.enums'
import { format, subYears } from 'date-fns'
import { FunctionComponent } from 'react'
import { Control, Controller } from 'react-hook-form'

interface ContactInfoFormProps {
  control?: Control<PassengersData>
}
const ContactInfoForm: FunctionComponent<ContactInfoFormProps> = ({ control }) => {
  return (
    <div className='rounded-md border-2 border-solid pt-0 shadow-lg'>
      {/* <Controller name={`${type}.${index}.type`} control={control} render={() => <input />} defaultValue={'type'} /> */}
      <div className='w-full  border-b p-6 py-3 sm:w-full'>
        <h2 className='text-lg font-bold tracking-tight text-gray-900'>Thông tin liên lạc</h2>
      </div>
      <div className='mx-auto max-w-2xl p-8'>
        <div className='space-y-12'>
          <div className='border-gray-900/10'>
            <div className='grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-3'>
                <label htmlFor='contactInfo.email' className='block text-sm font-medium leading-6 text-gray-900'>
                  Email
                </label>
                <Controller
                  name={'contactInfo.email'}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <div className='mt-2'>
                        <input
                          id='contactInfo.email'
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
                <label htmlFor='contactInfo.phoneNumber' className='block text-sm font-medium leading-6 text-gray-900'>
                  Số điện thoại
                </label>
                <Controller
                  name={'contactInfo.phoneNumber'}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <div className='mt-2'>
                        <input
                          id='contactInfo.phoneNumber'
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
{/* 
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
              </div> */}
              {/* {type === PassengerType.ADULT && index === 0 && (
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
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactInfoForm
