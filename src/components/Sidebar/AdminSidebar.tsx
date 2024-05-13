import { FunctionComponent, PropsWithChildren } from 'react'

import Logo from '@/assets/images/logos/logo.png'
import { NavLink } from 'react-router-dom'
import { route } from '@/utils/helpers'
import { UserRole } from '@/enums/user.enums'
import { AppState } from '@/services/state/store'
import { useSelector } from 'react-redux'

interface AdminSidebarProps {}

const AdminSidebar: FunctionComponent<AdminSidebarProps> = () => {
  const { user } = useSelector((state: AppState) => state.auth)

  return (
    <nav className='no-scrollbar fixed flex w-56 flex-wrap items-center justify-between bg-white px-6 py-4 shadow-xl md:bottom-0 md:left-0 md:top-0 md:block md:flex-row md:flex-nowrap md:overflow-hidden md:overflow-y-auto'>
      <div className='mx-auto flex w-full flex-wrap items-center justify-between px-0 md:min-h-full md:flex-col md:flex-nowrap md:items-stretch'>
        <NavLink to={route('/admin')}>
          <div className='flex'>
            <div className='mr-4 w-16'>
              <img className='w-full' src={Logo} alt='' />
            </div>
            <div className='bold flex flex-col items-center justify-center'>
              <div>VV Airline</div>
              <div>Admin</div>
            </div>
          </div>
        </NavLink>

        <div
          className='absolute left-0 right-0 top-0 z-40 hidden h-auto flex-1 items-center overflow-y-auto overflow-x-hidden rounded shadow md:relative md:mt-4 md:flex md:flex-col md:items-stretch md:opacity-100 md:shadow-none'
          id='example-collapse-sidebar'
        >
          <Group name='Quản Lý Chung' userRole={user?.role} roles={[UserRole.SUPER_ADMIN, UserRole.ADMIN]}>
            {/* <Button icon={<i className='fa-solid fa-house' />} title='Trang chủ' path={route('/admin/dashboard')} /> */}
            {/* <Button
              icon={<i className='fa-solid fa-chart-simple' />}
              title='Thống kê tháng'
              path={route('/admin/monthly-statistics')}
            />
            <Button
              icon={<i className='fa-solid fa-chart-simple' />}
              title='Thống kê năm'
              path={route('/admin/yearly-statistics')}
            /> */}
            <Button
              icon={<i className='fa-solid fa-chart-simple' />}
              title='Thống kê'
              path={route('/admin/statistics')}
            />
          </Group>
          <Group name='Quản Lý Máy Bay' userRole={user?.role} roles={[UserRole.SUPER_ADMIN, UserRole.ADMIN]}>
            <Button icon={<i className='fa-solid fa-plane' />} title='Máy Bay' path={route('/admin/aircrafts')} />
            <Button
              icon={<i className='fa-solid fa-plane' />}
              title='Mẫu Máy Bay'
              path={route('/admin/aircraft-models')}
            />
            <Button
              icon={<i className='fa-solid fa-money-bill-trend-up' />}
              title='Điều chỉnh phụ phí'
              path={route('/admin/surcharge')}
            />
          </Group>
          <Group name='Quản Lý Chuyến Bay' userRole={user?.role} roles={[UserRole.SUPER_ADMIN, UserRole.ADMIN]}>
            <Button icon={<i className='fa-solid fa-house' />} title='Sân Bay' path={route('/admin/airports')} />
            <Button icon={<i className='fa-solid fa-route' />} title='Tuyến Bay' path={route('/admin/flight-routes')} />
            <Button icon={<i className='fa-solid fa-plane' />} title='Chặng Bay' path={route('/admin/flight-legs')} />
            <Button icon={<i className='fa-solid fa-plane' />} title='Chuyến Bay' path={route('/admin/flights')} />
          </Group>
          <Group
            name='Quản Lý Người Dùng'
            userRole={user?.role}
            roles={[UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.STAFF_CHECK_IN]}
          >
            <Button icon={<i className='fa-solid fa-user' />} title='Người dùng' path={route('/admin/users')} />
            <Button
              icon={<i className='fa-solid fa-plane' />}
              title='Chuyến bay đã đặt'
              path={route('/admin/bookings')}
            />
          </Group>
          <Group
            name='Quản Lý Bài Viết'
            userRole={user?.role}
            roles={[UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.STAFF_CONTENT_WRITER]}
          >
            <Button icon={<i className='fa-solid fa-newspaper' />} title='Bài Viết' path={route('/admin/articles')} />
          </Group>
          <Group
            name='Đặt vé'
            userRole={user?.role}
            roles={[UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.STAFF_SELL_AGENT]}
          >
            <Button title='Đặt vé' icon={<i className='fa-solid fa-ticket' />} path={route('/admin/booking')} />
            <Button
              icon={<i className='fa-solid fa-plane' />}
              title='Đặt bởi tôi'
              path={route('/admin/bookings/bookings-by-me')}
            />
          </Group>
        </div>
      </div>
    </nav>
  )
}
interface GroupProps extends PropsWithChildren {
  name?: string
  userRole?: UserRole
  roles?: UserRole[]
}

const Group: FunctionComponent<GroupProps> = ({ name, userRole, roles, children }) => {
  if (roles && userRole && !roles.includes(userRole)) {
    return null
  }
  return (
    <>
      {/* <!-- Divider --> */}
      <hr className='my-4 md:min-w-full' />
      {/* <!-- Heading --> */}
      <h6 className='block pb-4 pt-1 text-xs font-bold uppercase text-gray-500 no-underline md:min-w-full'>{name}</h6>
      {/* <!-- Navigation --> */}

      <ul className='flex list-none flex-col md:min-w-full md:flex-col'>{children}</ul>
    </>
  )
}

interface ButtonProps {
  title?: JSX.Element | string
  icon?: JSX.Element
  path: string
}

const Button: FunctionComponent<ButtonProps> = ({ title, icon, path }) => {
  return (
    <li className='items-center'>
      <NavLink to={path} className={({ isActive, isPending }) => (isActive ? 'text-sky-500' : '')}>
        <span className='block py-3 text-xs font-bold uppercase'>
          <span className='mr-2 text-sm opacity-75'>{icon}</span>
          {title}
        </span>
      </NavLink>
    </li>
  )
}

export default AdminSidebar
