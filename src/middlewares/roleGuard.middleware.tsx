import Loading from '@/components/ui/Loading'
import { UserRole } from '@/enums/user.enums'
import { AppState } from '@/services/state/store'
import { FunctionComponent, PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

interface RoleGuardProps extends PropsWithChildren {
  restrictedTo?: UserRole[]
  unrestrictedTo?: UserRole[]
  redirect?: string
}

const RoleGuard: FunctionComponent<RoleGuardProps> = ({ unrestrictedTo, restrictedTo, children, redirect = '' }) => {
  if (!unrestrictedTo && !restrictedTo) {
    throw new Error('You must provide either restrictedTo or unrestrictedTo')
  }

  const { isInitialized, isAuthenticated, user } = useSelector((state: AppState) => state.auth)

  if (!isInitialized) {
    return <Loading />
  }

  const userRole: UserRole = isAuthenticated ? user?.role || UserRole.USER : UserRole.GUEST
  console.log('user', user)
  console.log('userRole', userRole)

  if (restrictedTo && restrictedTo.includes(userRole)) {
    return <Navigate to={redirect} />
  }

  if (unrestrictedTo && !unrestrictedTo.includes(userRole)) {
    return <Navigate to={redirect} />
  }

  return children
}

export default RoleGuard
