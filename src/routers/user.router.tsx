// import { AuthContextProvider } from 'utils/AuthContext'
// import { GlobalContextProvider } from 'utils/GlobalContext'

import { Navigate, Outlet, RouteObject, createBrowserRouter, redirect } from 'react-router-dom'

import MainLayout from '@/layouts/Main.layout'

import HomeScreen from '@/pages/Home.screen'
import LoginScreen from '@/pages/Auth/Login.screen'
import RegisterScreen from '@/pages/Auth/Register.screen'

import AccountIndexScreen from '@/pages/Account/Index.screen'
import ChangePasswordScreen from '@/pages/Account/ChangePassword.screen'

import ArticleIndexScreen from '@/pages/Articles/Index.screen'
import ArticleDetailScreen from '@/pages/Articles/Detail.screen'

import TestScreen from '@/pages/Test.screen'

import RoleGuard from '@/middlewares/roleGuard.middleware'
import { UserRole } from '@/enums/user.enums'
import SearchWizardScreen from '@/pages/SearchWizard/SearchWizard.screen'

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
