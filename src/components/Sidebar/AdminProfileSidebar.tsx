import { route } from '@/utils/helpers'
import classNames from 'classnames'
import { FunctionComponent } from 'react'
import { NavLink } from 'react-router-dom'

interface AdminProfileSidebarProps {
  className?: string
}

const AdminProfileSidebar: FunctionComponent<AdminProfileSidebarProps> = ({ className }) => {
  return (
    <div className={classNames('flex flex-col gap-2', className)}>
      <NavLink to={route('/admin/account')} end>
        {({ isActive }) => (
          <div
            className={classNames('rounded border-l-4 bg-white p-2 px-4', {
              'border-primary bg-gray-100': isActive,
              'border-transparent': !isActive,
            })}
          >
            Tài Khoản
          </div>
        )}
      </NavLink>
      <NavLink to={route('/admin/account/change-password')} end>
        {({ isActive }) => (
          <div
            className={classNames('rounded border-l-4 bg-white p-2 px-4', {
              'border-primary bg-gray-100': isActive,
              'border-transparent': !isActive,
            })}
          >
            Mật Khẩu
          </div>
        )}
      </NavLink>
    </div>
  )
}

export default AdminProfileSidebar
