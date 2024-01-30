import { FunctionComponent, PropsWithChildren, useRef, useState } from 'react'
import classnames from 'classnames'
import classNames from 'classnames'
import Button from '../ui/Button'
import { NavLink } from 'react-router-dom'
import routes from '../../routers'
import DropDown from '../Dropdown/DropDown'
import Logo from '@/assets/images/logos/logo.png'

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  return (
    <header className='sticky top-0 z-50 bg-white p-2 px-6 shadow-md shadow-white'>
      <div className='flex items-center justify-between'>
        <NavLink to={'/'}>
          <div className='flex items-center'>
            <div className='mr-4 w-16'>
              <img className='w-full' src={Logo} alt='' />
            </div>
            <div className='text-xl font-bold'>VV Airline</div>
          </div>
        </NavLink>
        <NotLoggedInNavBarButton />
        <LoggedInNavBarButton />
      </div>
    </header>
  )
}

interface NotLoggedInNavBarButtonProps {}

const NotLoggedInNavBarButton: FunctionComponent<NotLoggedInNavBarButtonProps> = () => {
  return (
    <div className='flex items-center gap-x-4'>
      <NavLink to={'/login'}>
        <Button text>Đăng nhập</Button>
      </NavLink>
      <NavLink to={'/register'}>
        <Button>Đăng ký</Button>
      </NavLink>
    </div>
  )
}

interface LoggedInNavBarButtonProps {}

const LoggedInNavBarButton: FunctionComponent<LoggedInNavBarButtonProps> = () => {
  const [isShow, setIsShow] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const onClick = () => {
    setIsShow(!isShow)
  }

  return (
    <div className='flex items-center gap-x-4'>
      <NavLink to={'/flights'}>
        <Button text>Lịch Sử Đặt Vé</Button>
      </NavLink>
      <button onClick={onClick} ref={buttonRef} className='relative'>
        <div className=' flex aspect-square w-10 items-center justify-center rounded-full border border-gray-500 text-gray-500'>
          <i className='fa-solid fa-user'></i>
        </div>
        <DropDown
          parentRef={buttonRef}
          isShow={isShow}
          position='bottom-left'
          onChangeShow={(newState) => {
            setIsShow(newState)
            // console.log(newState)
          }}
        >
          <DropDown.Row>
            <NavLink to={'/account'}>
              <i className='fa-light fa-user'></i>
              <span className='ml-2'>Tài khoản</span>
            </NavLink>
          </DropDown.Row>
          <DropDown.Row>
            <NavLink to={'/logout'}>
              <i className='fa-light fa-arrow-right-from-bracket'></i>
              <span className='ml-2'>Đăng xuất</span>
            </NavLink>
          </DropDown.Row>
        </DropDown>
      </button>
    </div>
  )
}

export default Header
