import { route } from '@/utils/helpers'
import classNames from 'classnames'
import { FunctionComponent } from 'react'
import { NavLink } from 'react-router-dom'

interface UserProfileSidebarProps {
  className?: string
}

const UserProfileSidebar: FunctionComponent<UserProfileSidebarProps> = ({ className }) => {
  return (
    <div className={className}>
      <NavLink to={route('/account')} end>
        {({ isActive }) => (
          <div
            className={classNames('border-l-4 p-2 px-4', {
              'border-primary bg-gray-100': isActive,
              'border-transparent': !isActive,
            })}
          >
            Tài Khoản
          </div>
        )}
      </NavLink>
      <NavLink to={route('/account/change-password')} end>
        {({ isActive }) => (
          <div
            className={classNames('border-l-4 p-2 px-4', {
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

export default UserProfileSidebar
