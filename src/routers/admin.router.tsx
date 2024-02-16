import NotImplemented from '@/components/Error/NotImplemented'
import { lazy } from 'react'
// import { AuthContextProvider } from 'utils/AuthContext'
// import { GlobalContextProvider } from 'utils/GlobalContext'

import { Suspense } from 'react'
import { Navigate, Outlet, RouteObject, createBrowserRouter, redirect } from 'react-router-dom'

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
import RoleGuard from '@/middlewares/roleGuard.middleware'
import { UserRole } from '@/enums/user.enums'

export const adminRoutes = [
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

populatePath(adminRoutes)
// console.log(adminRoutes)

const adminRouter = createBrowserRouter(adminRoutes)

export default adminRouter

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
