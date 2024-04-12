import Button from '@/components/ui/Button'
import authService from '@/services/auth.service'
import { AxiosError } from 'axios'
import { FunctionComponent, useContext, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ForgotPasswordContext } from './ForgotPassword.screen'

interface OTPInputProps {}

const OTPInput: FunctionComponent<OTPInputProps> = () => {
  const { setPage, email, setEmail, setOTP } = useContext(ForgotPasswordContext)

  const OTPRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    // console.log('submit')
    const OTP = OTPRef.current?.value as string

    try {
      await authService.verifyOTP(email!, OTP)
      setOTP(OTP)
      setPage('reset')
    } catch (error) {
      console.log(error)
      if (typeof error === 'string') {
        setError(error)
      } else if (error instanceof AxiosError) {
        if (error.code === 'ERR_BAD_REQUEST') {
          setError('mã OTP không hợp lệ!')
        } else {
          setError('Đã có lỗi xảy ra, Vui lòng thử lại sau!')
        }
      } else if (error instanceof Error) {
        setError('Đã có lỗi xảy ra, Vui lòng thử lại sau!')
      } else {
        setError('Đã có lỗi xảy ra, Vui lòng thử lại sau!')
      }
    }
  }

  return (
    <div className='flex min-h-full w-full flex-col justify-center px-6 py-24 lg:px-8'>
      <div className='text-center sm:mx-auto sm:w-full sm:max-w-sm'>
        <div className='text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>XÁC MINH OTP</div>
        <p>Vui lòng nhập mã OTP bạn đã nhận được qua mail {email} để đặt lại mật khẩu! </p>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form className='space-y-6' onSubmit={onSubmit}>
          <div>
            {/* <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
              OTP
            </label> */}

            <div className='mt-2 flex justify-center'>
              <input
                id='email'
                type='text'
                ref={OTPRef}
                placeholder='OTP'
                className='block w-full max-w-64 rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm outline-primary ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6'
              />
            </div>
            <small className='text-red-600'>{error}</small>
          </div>

          <div>
            <Button className='w-full'>Xác Minh</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default OTPInput
