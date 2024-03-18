import NotImplemented from '@/components/Error/NotImplemented'
import { lazy } from 'react'
// import { AuthContextProvider } from 'utils/AuthContext'
// import { GlobalContextProvider } from 'utils/GlobalContext'

import { Suspense } from 'react'
import { Navigate, Outlet, RouteObject, createBrowserRouter, redirect } from 'react-router-dom'

import Loading from '@/components/Loading/Loading'
import AdminLayout from '@/layouts/Admin.layout'
import AdminDashboardScreen from '@/pages/Admin/Dashboard.screen'
import AdminLoginScreen from '@/pages/Admin/Auth/Login.screen'
import AdminUsersIndexScreen from '@/pages/Admin/Users/Index.screen'

import AdminAirportsIndexScreen from '@/pages/Admin/Airports/Index.screen'
import AdminCreateAirportScreen from '@/pages/Admin/Airports/Create.screen'
import AdminUpdateAirportScreen from '@/pages/Admin/Airports/Update.screen'

import AdminBlogsIndexScreen from '@/pages/Admin/Blogs/Index.screen'
import AdminCreateBlogScreen from '@/pages/Admin/Blogs/Create.screen'
import AdminUpdateBlogScreen from '@/pages/Admin/Blogs/Update.screen'

import AdminAccountIndexScreen from '@/pages/Admin/Account/Index.screen'
import AdminChangePasswordScreen from '@/pages/Admin/Account/ChangePassword.screen'

import RoleGuard from '@/middlewares/roleGuard.middleware'
import { UserRole } from '@/enums/user.enums'

export const adminRoutes = [
  {
    path: '/admin',
    redirect: '/admin/dashboard',
    breadcrumbName: 'Admin',
    element: (
      <Suspense fallback={<Loading />}>
        <RoleGuard unrestrictedTo={[UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.STAFF]} redirect='/admin/login'>
          <AdminLayout />
        </RoleGuard>
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
            element: <AdminAccountIndexScreen />,
          },
          {
            path: 'change-password',
            breadcrumbName: 'Đổi mật khẩu',
            element: <AdminChangePasswordScreen />,
          },
        ],
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
        breadcrumbName: 'Sân bay',
        children: [
          {
            path: '',
            breadcrumbName: 'Danh sách',
            element: <AdminBlogsIndexScreen />,
          },
          {
            path: ':id',
            breadcrumbName: 'Cập nhật Sân Bay',
            element: <AdminUpdateBlogScreen />,
          },
          {
            path: 'create',
            breadcrumbName: 'Thêm Sân Bay',
            element: <AdminCreateBlogScreen />,
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
        children: [
          {
            path: '',
            breadcrumbName: 'Danh sách',
            element: <AdminAirportsIndexScreen />,
          },
          {
            path: ':id',
            breadcrumbName: 'Cập nhật Sân Bay',
            element: <AdminUpdateAirportScreen />,
          },
          {
            path: 'create',
            breadcrumbName: 'Thêm Sân Bay',
            element: <AdminCreateAirportScreen />,
          },
        ],
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
        <RoleGuard unrestrictedTo={[UserRole.GUEST, UserRole.USER]} redirect='/admin'>
          <Outlet />
        </RoleGuard>
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
