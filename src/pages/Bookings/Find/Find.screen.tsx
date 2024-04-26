import Button from '@/components/ui/Button'
import { useToast } from '@/contexts/ToastNotify.context'
import bookingsService from '@/services/bookings.service'
import { FunctionComponent, useRef, useState } from 'react'
import { useNavigate } from 'react-router'

interface FindProps {}

const Find: FunctionComponent<FindProps> = () => {
  const toast = useToast()
  const navigate = useNavigate()

  const pnrRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    const email = emailRef.current?.value as string
    const pnr = pnrRef.current?.value as string

    bookingsService
      .getByPnr(pnr, email)
      .then((data) => {
        // console.log(data)
        navigate(`/bookings/${data._id}`, { state: { pnr, email } })
      })
      .catch((error) => {
        // console.log(error)
        toast.error('Không tìm thấy chuyến bay')
      })
  }
  return (
    <div className='flex min-h-full w-full flex-col justify-center px-6 py-24 lg:px-8'>
      <div className='text-center sm:mx-auto sm:w-full sm:max-w-sm'>
        <div className='text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          TÌM CHUYẾN BAY ĐÃ ĐẶT
        </div>
        {/* <p>Vui lòng nhập email của bạn để nhận mã OTP</p> */}
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form className='space-y-6' onSubmit={onSubmit}>
          <div className='mt-2 flex flex-col gap-2'>
            <input
              id='pnr'
              type='text'
              ref={pnrRef}
              placeholder='PNR'
              className='block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm outline-primary ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6'
            />
            <input
              id='email'
              type='text'
              ref={emailRef}
              placeholder='Email'
              className='block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm outline-primary ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6'
            />
          </div>

          <div>
            <Button className='w-full'>Tìm</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Find
