// import { AuthContextProvider } from 'utils/AuthContext'
// import { GlobalContextProvider } from 'utils/GlobalContext'

import { Navigate, Outlet, RouteObject, createBrowserRouter, redirect } from 'react-router-dom'

// const Loading = lazy(() => import('@/components/Loading/Loading'))
// const MainLayout = lazy(() => import('@/layouts/Main.layout'))
// const HomeScreen = lazy(() => import('@/pages/Home.screen'))
// const LoginScreen = lazy(() => import('@/pages/Auth/Login.screen'))
// const RegisterScreen = lazy(() => import('@/pages/Auth/Register.screen'))
// const PaymentScreen = lazy(() => import('@/pages/SearchWizard/Payment.screen'))
// const SearchWizardLayout = lazy(() => import('@/layouts/SearchWizard.layout'))
// const FlightsSelectionScreen = lazy(() => import('@/pages/SearchWizard/FlightsSelection.screen'))
// const SeatsSelectionScreen = lazy(() => import('@/pages/SearchWizard/SeatsSelection.screen'))
// const PassengersInformationScreen = lazy(() => import('@/pages/SearchWizard/PassengersInformation.screen'))
// const BlogIndexScreen = lazy(() => import('@/pages/Blog/Index.screen'))
// const BlogDetailScreen = lazy(() => import('@/pages/Blog/Detail.screen'))
// const TestScreen = lazy(() => import('@/pages/Test.screen'))
// const AdminDashboardScreen = lazy(() => import('@/pages/Admin/Dashboard.screen'))
// const AdminLoginScreen = lazy(() => import('@/pages/Admin/Auth/Login.screen'))
// const AdminLayout = lazy(() => import('@/layouts/Admin.layout'))
// const AdminUsersIndexScreen = lazy(() => import('@/pages/Admin/Users/Index.screen'))

import MainLayout from '@/layouts/Main.layout'

import HomeScreen from '@/pages/Home.screen'
import LoginScreen from '@/pages/Auth/Login.screen'
import RegisterScreen from '@/pages/Auth/Register.screen'

import AccountIndexScreen from '@/pages/Account/Index.screen'

import PaymentScreen from '@/pages/SearchWizard/Payment.screen'
import SearchWizardLayout from '@/layouts/SearchWizard.layout'
import FlightsSelectionScreen from '@/pages/SearchWizard/FlightsSelection.screen'
import SeatsSelectionScreen from '@/pages/SearchWizard/SeatsSelection.screen'
import PassengersInformationScreen from '@/pages/SearchWizard/PassengersInformation.screen'

import BlogIndexScreen from '@/pages/Blog/Index.screen'
import BlogDetailScreen from '@/pages/Blog/Detail.screen'

import TestScreen from '@/pages/Test.screen'

import RoleGuard from '@/middlewares/roleGuard.middleware'
import { UserRole } from '@/enums/user.enums'
import ChangePasswordScreen from '@/pages/Account/ChangePassword.screen'

export const userRoutes = [
  {
    path: '',
    breadcrumbName: 'Trang chủ',
    element: (
      // <AuthContextProvider>
      //   <GlobalContextProzvider>
      <MainLayout />
      //    </GlobalContextProzvider>
      // </AuthContextProvider>
    ),
    children: [
      {
        path: 'test',
        element: <TestScreen />,
      },
      {
        path: '',
        breadcrumbName: 'Trang chủ',
        element: <HomeScreen />,
      },
      {
        path: 'login',
        breadcrumbName: 'Đăng nhập',
        element: (
          <RoleGuard unrestrictedTo={[UserRole.GUEST]} redirect='/'>
            <LoginScreen />
          </RoleGuard>
        ),
      },
      {
        path: 'register',
        breadcrumbName: 'Đăng ký',
        element: (
          <RoleGuard unrestrictedTo={[UserRole.GUEST]} redirect='/'>
            <RegisterScreen />
          </RoleGuard>
        ),
      },
      // { path: 'forgot-password', element: <ForgotPassword /> },
      // { path: 'reset-password', element: <ResetPassword /> },
      // { path: 'profile', element: <Profile /> },
      // { path: 'settings', element: <Settings /> },
      // { path: '404', element: <NotFound /> },
      // { path: '500', element: <ServerError /> },
      // { path: '*', element: <Navigate to='/404' /> },
      {
        path: 'wizard',
        breadcrumbName: 'Đặt vé',
        element: <SearchWizardLayout />,
        children: [
          {
            path: 'flights-selection',
            breadcrumbName: 'Chọn chuyến bay',
            element: <FlightsSelectionScreen />,
          },
          {
            path: 'seats-selection',
            breadcrumbName: 'Chọn ghế',
            element: <SeatsSelectionScreen />,
          },
          {
            path: 'passengers-information',
            breadcrumbName: 'Thông tin hành khách',
            element: <PassengersInformationScreen />,
          },
          {
            path: 'payment',
            breadcrumbName: 'Thanh toán',
            element: <PaymentScreen />,
          },
        ],
      },
      {
        path: 'blogs',
        breadcrumbName: 'Blogs',
        children: [
          {
            path: '',
            breadcrumbName: 'Danh sách',
            element: <BlogIndexScreen />,
          },
          {
            path: ':id',
            breadcrumbName: 'Chi tiết',
            element: <BlogDetailScreen />,
          },
        ],
      },
      {
        path: 'account',
        breadcrumbName: 'Tài Khoản',
        element: (
          <RoleGuard restrictedTo={[UserRole.GUEST]} redirect='/'>
            <Outlet />
          </RoleGuard>
        ),
        children: [
          {
            path: '',
            breadcrumbName: 'Thông tin',
            element: <AccountIndexScreen />,
          },
          {
            path: 'change-password',
            breadcrumbName: 'Đổi mật khẩu',
            element: <ChangePasswordScreen />,
          },
        ],
      },
    ],
  },
]

populatePath(userRoutes)
// console.log(userRoutes)

const userRouter = createBrowserRouter(userRoutes)

export default userRouter

function populatePath(routes: (RouteObject & { fullPath?: string })[], parentPath = '') {
  routes.forEach((route) => {
    if (route.path?.startsWith('/')) {
      route.fullPath = route.path
    } else {
      // TODO: fix this
      // route.fullPath = path.join(parentPath, route.path)
    }
    if (route.children) {
      populatePath(route.children, route.fullPath)
    }
  })
}
