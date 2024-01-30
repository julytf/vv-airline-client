import NotImplemented from '@/components/Error/NotImplemented'
import { lazy } from 'react'
// import { AuthContextProvider } from 'utils/AuthContext'
// import { GlobalContextProvider } from 'utils/GlobalContext'

import { Suspense } from 'react'
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

import Loading from '@/components/Loading/Loading'

import MainLayout from '@/layouts/Main.layout'
import AdminLayout from '@/layouts/Admin.layout'

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

import AdminDashboardScreen from '@/pages/Admin/Dashboard.screen'
import AdminLoginScreen from '@/pages/Admin/Auth/Login.screen'
import AdminUsersIndexScreen from '@/pages/Admin/Users/Index.screen'

export const routes = [
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
        element: <LoginScreen />,
      },
      {
        path: 'register',
        breadcrumbName: 'Đăng ký',
        element: <RegisterScreen />,
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
        children: [
          {
            path: '',
            breadcrumbName: 'Thông tin',
            element: <AccountIndexScreen />,
          },
        ],
      },
    ],
  },
  {
    path: '/admin',
    redirect: '/admin/dashboard',
    breadcrumbName: 'Admin',
    element: (
      <Suspense fallback={<Loading />}>
        <AdminLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        loader() {
          return redirect('dashboard')
        },
      },
      {
        path: 'dashboard',
        breadcrumbName: 'Trang chủ',
        element: <AdminDashboardScreen />,
      },
      {
        path: 'monthly-statistics',
        breadcrumbName: 'Thống kê tháng',
        element: <NotImplemented />,
      },
      {
        path: 'yearly-statistics',
        breadcrumbName: 'Thống kê năm',
        element: <NotImplemented />,
      },
      {
        path: 'blogs',
        breadcrumbName: 'Blogs',
        children: [
          {
            path: '',
            breadcrumbName: 'Danh sách',
            element: <NotImplemented />,
          },
          {
            path: ':id',
            breadcrumbName: 'Chi tiết',
            element: <NotImplemented />,
          },
        ],
      },
      {
        path: 'users',
        breadcrumbName: 'Người dùng',
        children: [
          {
            path: '',
            breadcrumbName: 'Danh sách',
            element: <AdminUsersIndexScreen />,
          },
          {
            path: ':id',
            breadcrumbName: 'Chi tiết',
            element: <NotImplemented />,
          },
        ],
      },
      {
        path: 'aircraft-models',
        breadcrumbName: 'Mẫu máy bay',
        element: <NotImplemented />,
      },
      {
        path: 'aircrafts',
        breadcrumbName: 'Máy bay',
        element: <NotImplemented />,
      },
      {
        path: 'airports',
        breadcrumbName: 'Sân bay',
        element: <NotImplemented />,
      },
      {
        path: 'flight-routes',
        breadcrumbName: 'Tuyến bay',
        element: <NotImplemented />,
      },
      {
        path: 'flight-legs',
        breadcrumbName: 'Chặng bay',
        element: <NotImplemented />,
      },
      {
        path: 'flights',
        breadcrumbName: 'Chuyến bay',
        element: <NotImplemented />,
      },
    ],
  },
  {
    path: '/admin',
    breadcrumbName: 'Admin',
    element: (
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        path: 'login',
        breadcrumbName: 'Đăng nhập',
        element: <AdminLoginScreen />,
      },
    ],
  },
]

populatePath(routes)
// console.log(routes)

const router = createBrowserRouter(routes)

export default router

function populatePath(routes: (RouteObject & { fullPath?: string })[], parentPath = '') {
  routes.forEach((route) => {
    if (route.path?.startsWith('/')) {
      route.fullPath = route.path
    } else {
      // route.fullPath = path.join(parentPath, route.path)
    }
    if (route.children) {
      populatePath(route.children, route.fullPath)
    }
  })
}
