import { FunctionComponent, PropsWithChildren, useRef, useState } from 'react'
import classnames from 'classnames'
import classNames from 'classnames'
import Button from '../ui/Button'
import { NavLink } from 'react-router-dom'
import routes from '../../routers/user.router'
import DropDown from '../Dropdown/DropDown'
import Logo from '@/assets/images/logos/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '@/services/state/store'
import Loading from '../ui/Loading'
import authService from '@/services/auth.service'
import * as auth from '@/services/state/auth/authSlice'

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  // const isInitialized = false
  const { isInitialized, isAuthenticated } = useSelector((state: AppState) => state.auth)

  return (
    <header className='sticky top-0 z-50 h-24 bg-white/90 p-2 px-6'>
      <div className='flex items-center justify-between'>
        <NavLink to={'/'}>
          <div className='flex items-center'>
            <div className='mr-4 w-16'>
              <img className='w-full' src={Logo} alt='' />
            </div>
            <div className='text-xl font-bold'>VV Airline</div>
          </div>
        </NavLink>
        <div className=' flex items-center justify-center'>
          <NavLink className='pr-4' to={'/articles'}>
            <Button text>Bài Viết</Button>
          </NavLink>
          {!isInitialized && <Loading small />}
          {isInitialized && (isAuthenticated ? <LoggedInNavBarButton /> : <NotLoggedInNavBarButton />)}
        </div>
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
  const { user } = useSelector((state: AppState) => state.auth)
  const dispatch = useDispatch<AppDispatch>()

  const [isShow, setIsShow] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const onClick = () => {
    setIsShow(!isShow)
  }

  const logout = () => {
    dispatch(auth.logout())
  }

  return (
    <div className='flex items-center gap-x-4'>
      <NavLink to={'/bookings'}>
        <Button text>Lịch Sử Đặt Vé</Button>
      </NavLink>
      <div className='relative'>
        <button onClick={onClick} ref={buttonRef} className='relative'>
          <div className=' flex aspect-square w-10 items-center justify-center rounded-full border border-gray-500 text-gray-500'>
            <i className='fa-solid fa-user'></i>
          </div>
        </button>
        <DropDown
          parentRef={buttonRef}
          isShow={isShow}
          position='bottom-left'
          onChangeShow={(newState) => {
            setIsShow(newState)
            // console.log(newState)
          }}
          className='mt-2'
        >
          <DropDown.Row>
            <span className='bold'>
              <i className='fa-regular fa-user'></i>
              <span className='ml-2'>
                {user?.lastName} {user?.firstName}
              </span>
            </span>
          </DropDown.Row>
          <DropDown.Row>
            <NavLink to={'/account'}>
              <i className='fa-light fa-file-user'></i>
              <span className='ml-2'>Tài khoản</span>
            </NavLink>
          </DropDown.Row>
          <DropDown.Row>
            <button onClick={logout}>
              <i className='fa-light fa-arrow-right-from-bracket'></i>
              <span className='ml-2'>Đăng xuất</span>
            </button>
          </DropDown.Row>
        </DropDown>
      </div>
    </div>
  )
}

export default Header
