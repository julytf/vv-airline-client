import Button from '@/components/ui/Button'
import authService from '@/services/auth.service'
import { AxiosError } from 'axios'
import { FunctionComponent, useContext, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ForgotPasswordContext } from './ForgotPassword.screen'

interface EmailInputProps {}

const EmailInput: FunctionComponent<EmailInputProps> = () => {
  const { setPage, setEmail } = useContext(ForgotPasswordContext)

  const emailRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    // console.log('submit')
    const email = emailRef.current?.value as string

    try {
      await authService.requestResetPasswordOTPEmail(email)
      setEmail(email)
      setPage('otp')
    } catch (error) {
      console.log(error)
      if (typeof error === 'string') {
        setError(error)
      } else if (error instanceof AxiosError) {
        if (error.code === 'ERR_BAD_REQUEST') {
          setError('Email không tồn tại!')
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
        <div className='text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>QUÊN MẬT KHẨU</div>
        <p>Vui lòng nhập email của bạn để nhận mã OTP</p>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form className='space-y-6' onSubmit={onSubmit}>
          <div>
            {/* <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
              Email
            </label> */}

            <div className='mt-2'>
              <input
                id='email'
                type='text'
                ref={emailRef}
                placeholder='Email'
                className='block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm outline-primary ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6'
              />
            </div>
            <small className='text-red-600'>{error}</small>
          </div>

          <div>
            <Button className='w-full'>Quên Mật khẩu</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EmailInput
