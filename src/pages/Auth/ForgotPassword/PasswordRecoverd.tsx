import Button from '@/components/ui/Button'
import { FunctionComponent } from 'react'
import { NavLink } from 'react-router-dom'

interface PasswordRecoveredProps {}

const PasswordRecovered: FunctionComponent<PasswordRecoveredProps> = () => {
  return (
    <div className='flex min-h-full w-full flex-col justify-center px-6 py-24 lg:px-8'>
      <div className='text-center sm:mx-auto sm:w-full sm:max-w-sm'>
        <div className='text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          MẬT KHẨU ĐÃ ĐƯỢC ĐẶT LẠI
        </div>
        <p>Hãy đăng nhập vào tài khoản bằng mật khẩu mới!</p>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <div className='space-y-6'>
          <NavLink to={'/login'}>
            <Button className='w-full'>Tới trang đăng nhập</Button>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default PasswordRecovered
