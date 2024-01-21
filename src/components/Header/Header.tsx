import { FunctionComponent, PropsWithChildren } from 'react'
import classnames from 'classnames'
import classNames from 'classnames'
import Button from '../ui/Button'
import { NavLink } from 'react-router-dom'
import routes from '../../routes'

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  return (
    <header className='sticky top-0 z-50 bg-white p-4 px-6 shadow-md shadow-white'>
      <div className='flex items-center justify-between'>
        <NavLink to={'/'}>
          <div className='flex items-center'>
            {/* TODO: logo here */}
            <div className='text-xl font-bold'>VV Airline</div>
          </div>
        </NavLink>
        <div className='flex items-center'>
          {/* <NavLink to={''} className='pl-5'>
            <Button outline>test</Button>
          </NavLink> */}
          <NavLink to={'/login'} className='ml-5'>
            <Button text>Đăng nhập</Button>
          </NavLink>
          <NavLink to={'/register'} className='ml-5'>
            <Button>Đăng ký</Button>
          </NavLink>
        </div>
      </div>
    </header>
  )
}

export default Header
