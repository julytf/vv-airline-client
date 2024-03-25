import { FunctionComponent, useRef, useState } from 'react'
import { Link, NavLink, matchRoutes, useLocation } from 'react-router-dom'
import DropDown from '../Dropdown/DropDown'
import { userRoutes } from '@/routers/user.router'
import { adminRoutes } from '@/routers/admin.router'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '@/services/state/store'
import * as auth from '@/services/state/auth/authSlice'

interface AdminHeaderProps {}

const AdminHeader: FunctionComponent<AdminHeaderProps> = () => {
  const location = useLocation()
  const routes = [...userRoutes, ...adminRoutes]

  const matchedRoutes = matchRoutes(routes, location.pathname) || []
  // console.log(matchedRoutes)

  return (
    <nav className='bg-white left-0 top-0 z-30 flex w-full items-center border-b bg-transparent p-4 md:flex-row md:flex-nowrap md:justify-start'>
      <div className='mx-auto flex w-full flex-wrap items-center justify-between px-4 md:flex-nowrap '>
        <div>
          {matchedRoutes.map((matchRoute, i) => {
            const { path, breadcrumbName } = matchRoute.route
            const isLast = i === matchedRoutes.length - 1

            return (
              <span key={i} className='ml-2'>
                {isLast ? (
                  <span key={i} className='breadcrumb-item active'>
                    {breadcrumbName}
                  </span>
                ) : (
                  <span key={i} className='breadcrumb-item'>
                    <Link to={path}>{breadcrumbName} </Link>
                  </span>
                )}
                {!isLast && <span className='ml-2'>/</span>}
              </span>
            )
          })}
        </div>
        {/* <form className='mr-3 hidden flex-row flex-wrap items-center md:flex lg:ml-auto'>
          <div className='relative flex w-full flex-wrap items-stretch'>
            <span className='text-gray-300 absolute z-10 h-full w-8 items-center justify-center rounded bg-transparent py-3 pl-3 text-center text-base font-normal leading-snug'>
              <i className='fas fa-search' />
            </span>
            <input
              type='text'
              placeholder='Search here...'
              className='placeholder-gray-300 text-gray-600 relative w-full rounded border-0 bg-white px-3 py-3 pl-10 text-sm shadow outline-none focus:outline-none focus:ring'
            />
          </div>
        </form> */}
        <div className='flex items-center'>
          <AccountButton />
        </div>
      </div>
    </nav>
  )
}

interface AccountButtonProps {}

const AccountButton: FunctionComponent<AccountButtonProps> = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: AppState) => state.auth)
  const [isShow, setIsShow] = useState(false)

  const buttonRef = useRef<HTMLButtonElement>(null)

  const onClick = () => {
    setIsShow(!isShow)
  }

  const handleLogout = () => {
    dispatch(auth.logout())
  }

  return (
    <div className='relative'>
      <button ref={buttonRef} onClick={onClick} className='relative'>
        <span className='inline-flex h-11 w-11 items-center justify-center rounded-full  text-sm text-white'>
          <span className='flex aspect-square w-32 items-center justify-center rounded-full border-2 border-gray-500 text-xl text-gray-500'>
            <i className='fa-solid fa-user-tie'></i>
          </span>
        </span>
      </button>
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
          <span className='bold'>
            <i className='fa-regular fa-user'></i>
            <span className='ml-2'>
              {user?.lastName} {user?.firstName}
            </span>
          </span>
        </DropDown.Row>
        <DropDown.Row>
          <NavLink to={'/admin/account'}>
            <i className='fa-light fa-file-user'></i>
            <span className='ml-2'>Tài khoản</span>
          </NavLink>
        </DropDown.Row>
        <DropDown.Row>
          <button onClick={handleLogout}>
            <i className='fa-light fa-arrow-right-from-bracket'></i>
            <span className='ml-2'>Đăng xuất</span>
          </button>
        </DropDown.Row>
      </DropDown>
    </div>
  )
}

export default AdminHeader
