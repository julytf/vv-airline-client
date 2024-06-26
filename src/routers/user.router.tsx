// import { AuthContextProvider } from 'utils/AuthContext'
// import { GlobalContextProvider } from 'utils/GlobalContext'

import { Navigate, Outlet, RouteObject, createBrowserRouter, redirect } from 'react-router-dom'
import { UserRole } from '@/enums/user.enums'
import { lazy, Suspense } from 'react'
import ForgotPasswordScreen from '@/pages/Auth/ForgotPassword/ForgotPassword.screen'
import Error404 from '@/pages/Error/Error404'
import Loading from '@/components/ui/Loading'

// import MainLayout from '@/layouts/Main.layout'

// import HomeScreen from '@/pages/Home.screen'
// import LoginScreen from '@/pages/Auth/Login.screen'
// import RegisterScreen from '@/pages/Auth/Register.screen'

// import AccountIndexScreen from '@/pages/Account/Index.screen'
// import ChangePasswordScreen from '@/pages/Account/ChangePassword.screen'

// import ArticleIndexScreen from '@/pages/Articles/Index.screen'
// import ArticleDetailScreen from '@/pages/Articles/Detail.screen'

// import TestScreen from '@/pages/Test.screen'

// import RoleGuard from '@/middlewares/roleGuard.middleware'
// import SearchWizardScreen from '@/pages/SearchWizard/SearchWizard.screen'

// import BookingsIndexScreen from '@/pages/Bookings/Index/Index.screen'
// import BookingsDetailScreen from '@/pages/Bookings/Detail/Detail.screen'

const MainLayout = lazy(() => import('@/layouts/Main.layout'))

const HomeScreen = lazy(() => import('@/pages/Home.screen'))
const LoginScreen = lazy(() => import('@/pages/Auth/Login.screen'))
const RegisterScreen = lazy(() => import('@/pages/Auth/Register.screen'))

const AccountIndexScreen = lazy(() => import('@/pages/Account/Index.screen'))
const ChangePasswordScreen = lazy(() => import('@/pages/Account/ChangePassword.screen'))

const ArticleIndexScreen = lazy(() => import('@/pages/Articles/Index.screen'))
const ArticleDetailScreen = lazy(() => import('@/pages/Articles/Detail.screen'))

const TestScreen = lazy(() => import('@/pages/Test.screen'))

const RoleGuard = lazy(() => import('@/middlewares/roleGuard.middleware'))
const SearchWizardScreen = lazy(() => import('@/pages/SearchWizard/SearchWizard.screen'))

const BookingsIndexScreen = lazy(() => import('@/pages/Bookings/Index/Index.screen'))
const BookingsDetailScreen = lazy(() => import('@/pages/Bookings/Detail/Detail.screen'))
const BookingsFindScreen = lazy(() => import('@/pages/Bookings/Find/Find.screen'))
const BookingsRefundScreen = lazy(() => import('@/pages/Bookings/Refund/Refund.screen'))

const TicketClassPolicyScreen = lazy(() => import('@/pages/Policy/TicketClassPolicy.screen'))

export const userRoutes = [
  {
    path: '',
    breadcrumbName: 'Trang chủ',
    element: (
      <Suspense
        fallback={
          <div className='flex h-screen items-center justify-center'>
            <Loading />
          </div>
        }
      >
        <MainLayout />
      </Suspense>
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
      { path: 'forgot-password', element: <ForgotPasswordScreen /> },
      // { path: 'reset-password', element: <ResetPassword /> },
      // { path: 'profile', element: <Profile /> },
      // { path: 'settings', element: <Settings /> },
      // { path: '404', element: <NotFound /> },
      // { path: '500', element: <ServerError /> },
      // { path: '*', element: <Navigate to='/404' /> },
      {
        path: 'wizard',
        breadcrumbName: 'Đặt vé',
        element: <SearchWizardScreen />,
        // children: [
        //   {
        //     path: 'flights-selection',
        //     breadcrumbName: 'Chọn chuyến bay',
        //     element: <FlightsSelectionScreen />,
        //   },
        //   {
        //     path: 'seats-selection',
        //     breadcrumbName: 'Chọn ghế',
        //     element: <SeatsSelectionScreen />,
        //   },
        //   {
        //     path: 'passengers-information',
        //     breadcrumbName: 'Thông tin hành khách',
        //     element: <PassengersInformationScreen />,
        //   },
        //   {
        //     path: 'payment',
        //     breadcrumbName: 'Thanh toán',
        //     element: <PaymentScreen />,
        //   },
        // ],
      },
      {
        path: 'bookings',
        breadcrumbName: 'Đặt Vé',
        children: [
          {
            path: '',
            breadcrumbName: 'Danh sách',
            element: <BookingsIndexScreen />,
          },
          {
            path: ':id/refund',
            breadcrumbName: 'Hoàn vé',
            element: <BookingsRefundScreen />,
          },
          {
            path: 'find',
            breadcrumbName: 'Chi tiết',
            element: <BookingsFindScreen />,
          },
          {
            path: ':id',
            breadcrumbName: 'Chi tiết',
            element: <BookingsDetailScreen />,
          },
        ],
      },
      {
        path: 'articles',
        breadcrumbName: 'Bài Viết',
        children: [
          {
            path: '',
            breadcrumbName: 'Danh sách',
            element: <ArticleIndexScreen />,
          },
          {
            path: ':id',
            breadcrumbName: 'Chi tiết',
            element: <ArticleDetailScreen />,
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
      {
        path: 'policy',
        breadcrumbName: 'Chính sách',
        children: [
          {
            path: 'ticket-class-policy',
            breadcrumbName: 'Chính sách hạng vé máy bay',
            element: <TicketClassPolicyScreen />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    breadcrumbName: '404',
    element: <Error404 />,
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
