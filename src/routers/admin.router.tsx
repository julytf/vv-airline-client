import { lazy } from 'react'
import { UserRole } from '@/enums/user.enums'
// import { AuthContextProvider } from 'utils/AuthContext'
// import { GlobalContextProvider } from 'utils/GlobalContext'

import { Suspense } from 'react'
import { Navigate, Outlet, RouteObject, createBrowserRouter, redirect } from 'react-router-dom'
import NotImplemented from '@/pages/Admin/Error/NotImplemented'
import Error404 from '@/pages/Admin/Error/Error404'

// import Loading from '@/components/ui/Loading'
// import AdminLayout from '@/layouts/Admin.layout'
// import AdminDashboardScreen from '@/pages/Admin/Dashboard.screen'
// import AdminLoginScreen from '@/pages/Admin/Auth/Login.screen'
// import AdminUsersIndexScreen from '@/pages/Admin/Users/Index.screen'

// import AdminAirportsIndexScreen from '@/pages/Admin/Airports/Index.screen'
// import AdminCreateAirportScreen from '@/pages/Admin/Airports/Create.screen'
// import AdminUpdateAirportScreen from '@/pages/Admin/Airports/Update.screen'

// import AdminFlightRoutesIndexScreen from '@/pages/Admin/FlightRoutes/Index.screen'
// // import AdminCreateFlightRouteScreen from '@/pages/Admin/FlightRoutes/Create.screen'
// // import AdminUpdateFlightRouteScreen from '@/pages/Admin/FlightRoutes/Update.screen'

// import AdminFlightLegsIndexScreen from '@/pages/Admin/FlightLegs/Index.screen'
// // import AdminCreateFlightLegScreen from '@/pages/Admin/FlightLegs/Create.screen'
// // import AdminUpdateFlightLegScreen from '@/pages/Admin/FlightLegs/Update.screen'

// import AdminFlightsIndexScreen from '@/pages/Admin/Flights/Index.screen'
// // import AdminCreateFlightScreen from '@/pages/Admin/Flights/Create.screen'
// // import AdminUpdateFlightScreen from '@/pages/Admin/Flights/Update.screen'

// import AdminAircraftsIndexScreen from '@/pages/Admin/Aircrafts/Index.screen'
// // import AdminCreateAircraftscreen from '@/pages/Admin/Aircrafts/Create.screen'
// // import AdminUpdateAircraftscreen from '@/pages/Admin/Aircrafts/Update.screen'

// import AdminAircraftModelsIndexScreen from '@/pages/Admin/AircraftModels/Index.screen'
// // import AdminCreateAircraftModelscreen from '@/pages/Admin/AircraftModels/Create.screen'
// // import AdminUpdateAircraftModelscreen from '@/pages/Admin/AircraftModels/Update.screen'

// import AdminArticlesIndexScreen from '@/pages/Admin/Articles/Index.screen'
// import AdminCreateArticleScreen from '@/pages/Admin/Articles/Create.screen'
// import AdminUpdateArticleScreen from '@/pages/Admin/Articles/Update.screen'

// import AdminAccountIndexScreen from '@/pages/Admin/Account/Index.screen'
// import AdminChangePasswordScreen from '@/pages/Admin/Account/ChangePassword.screen'

// import RoleGuard from '@/middlewares/roleGuard.middleware'

const Loading = lazy(() => import('@/components/ui/Loading'))
const AdminLayout = lazy(() => import('@/layouts/Admin.layout'))
const AdminDashboardScreen = lazy(() => import('@/pages/Admin/Dashboard.screen'))
const AdminLoginScreen = lazy(() => import('@/pages/Admin/Auth/Login.screen'))

const AdminUsersIndexScreen = lazy(() => import('@/pages/Admin/Users/Index.screen'))
const AdminUpdateUsersScreen = lazy(() => import('@/pages/Admin/Users/Update.screen'))
const AdminCreateUsersScreen = lazy(() => import('@/pages/Admin/Users/Create.screen'))

const AdminAirportsIndexScreen = lazy(() => import('@/pages/Admin/Airports/Index.screen'))
const AdminCreateAirportScreen = lazy(() => import('@/pages/Admin/Airports/Create.screen'))
const AdminUpdateAirportScreen = lazy(() => import('@/pages/Admin/Airports/Update.screen'))

const AdminFlightRoutesIndexScreen = lazy(() => import('@/pages/Admin/FlightRoutes/Index.screen'))
const AdminCreateFlightRouteScreen = lazy(() => import('@/pages/Admin/FlightRoutes/Create.screen'))
const AdminUpdateFlightRouteScreen = lazy(() => import('@/pages/Admin/FlightRoutes/Update.screen'))

const AdminFlightLegsIndexScreen = lazy(() => import('@/pages/Admin/FlightLegs/Index.screen'))
const AdminCreateFlightLegScreen = lazy(() => import('@/pages/Admin/FlightLegs/Create.screen'))
const AdminUpdateFlightLegScreen = lazy(() => import('@/pages/Admin/FlightLegs/Update.screen'))

const AdminFlightsIndexScreen = lazy(() => import('@/pages/Admin/Flights/Index.screen'))
const AdminCreateFlightScreen = lazy(() => import('@/pages/Admin/Flights/Create.screen'))
const AdminUpdateFlightScreen = lazy(() => import('@/pages/Admin/Flights/Update.screen'))

const AdminAircraftsIndexScreen = lazy(() => import('@/pages/Admin/Aircrafts/Index.screen'))
const AdminCreateAircraftscreen = lazy(() => import('@/pages/Admin/Aircrafts/Create.screen'))
const AdminUpdateAircraftscreen = lazy(() => import('@/pages/Admin/Aircrafts/Update.screen'))

const AdminAircraftModelsIndexScreen = lazy(() => import('@/pages/Admin/AircraftModels/Index.screen'))
const AdminCreateAircraftModelscreen = lazy(() => import('@/pages/Admin/AircraftModels/Create/Create.screen'))
const AdminUpdateAircraftModelscreen = lazy(() => import('@/pages/Admin/AircraftModels/Update/Update.screen'))

const AdminBookingsIndexScreen = lazy(() => import('@/pages/Admin/Bookings/Index.screen'))
// const AdminCreateBookingscreen = lazy(() => import( '@/pages/Admin/Bookings/Create.screen'))
// const AdminUpdateBookingscreen = lazy(() => import( '@/pages/Admin/Bookings/Update.screen'))
const AdminDetailBookingscreen = lazy(() => import('@/pages/Admin/Bookings/Detail/Detail.screen'))
const AdminRefundBookingscreen = lazy(() => import('@/pages/Admin/Bookings/Refund/Refund.screen'))

const AdminArticlesIndexScreen = lazy(() => import('@/pages/Admin/Articles/Index.screen'))
const AdminCreateArticleScreen = lazy(() => import('@/pages/Admin/Articles/Create.screen'))
const AdminUpdateArticleScreen = lazy(() => import('@/pages/Admin/Articles/Update.screen'))

const AdminAccountIndexScreen = lazy(() => import('@/pages/Admin/Account/Index.screen'))
const AdminChangePasswordScreen = lazy(() => import('@/pages/Admin/Account/ChangePassword.screen'))

const AdminSearchWizardScreen = lazy(() => import('@/pages/Admin/SearchWizard/SearchWizard.screen'))

const AdminSurchargeIndexScreen = lazy(() => import('@/pages/Admin/Surcharges/Index.screen'))

const RoleGuard = lazy(() => import('@/middlewares/roleGuard.middleware'))

export const adminRoutes = [
  {
    path: '/admin',
    redirect: '/admin/dashboard',
    breadcrumbName: 'Admin',
    element: (
      <Suspense
        fallback={
          <div className='flex h-screen items-center justify-center'>
            <Loading />
          </div>
        }
      >
        <RoleGuard
          unrestrictedTo={[
            UserRole.SUPER_ADMIN,
            UserRole.ADMIN,
            UserRole.STAFF,
            UserRole.STAFF_CHECK_IN,
            UserRole.STAFF_CONTENT_WRITER,
            UserRole.STAFF_SELL_AGENT,
          ]}
          redirect='/admin/login'
        >
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
        path: 'articles',
        breadcrumbName: 'Bài viết',
        children: [
          {
            path: '',
            breadcrumbName: 'Danh sách',
            element: <AdminArticlesIndexScreen />,
          },
          {
            path: ':id',
            breadcrumbName: 'Cập nhật Bài viết',
            element: <AdminUpdateArticleScreen />,
          },
          {
            path: 'create',
            breadcrumbName: 'Thêm Bài viết',
            element: <AdminCreateArticleScreen />,
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
            breadcrumbName: 'Cập nhật Người dùng',
            element: <AdminUpdateUsersScreen />,
          },
          {
            path: 'create',
            breadcrumbName: 'Thêm Người dùng',
            element: <AdminCreateUsersScreen />,
          },
        ],
      },
      {
        path: 'bookings',
        breadcrumbName: 'Đặt vé',
        children: [
          {
            path: '',
            breadcrumbName: 'Danh sách',
            element: <AdminBookingsIndexScreen />,
          },
          {
            path: ':id',
            breadcrumbName: 'Chi tiết',
            element: <AdminDetailBookingscreen />,
          },
          {
            path: ':id/refund',
            breadcrumbName: 'Hoàn vé',
            element: <AdminRefundBookingscreen />,
          },
        ],
      },
      {
        path: 'aircraft-models',
        breadcrumbName: 'Mẫu Máy bay',
        children: [
          {
            path: '',
            breadcrumbName: 'Danh sách',
            element: <AdminAircraftModelsIndexScreen />,
            // element: <NotImplemented />,
          },
          {
            path: ':id',
            breadcrumbName: 'Cập nhật Mẫu Máy bay',
            element: <AdminUpdateAircraftModelscreen />,
            // element: <NotImplemented />,
          },
          {
            path: 'create',
            breadcrumbName: 'Thêm Mẫu Máy bay',
            element: <AdminCreateAircraftModelscreen />,
            // element: <NotImplemented />,
          },
        ],
      },
      {
        path: 'aircrafts',
        breadcrumbName: 'Máy bay',
        children: [
          {
            path: '',
            breadcrumbName: 'Danh sách',
            element: <AdminAircraftsIndexScreen />,
            // element: <NotImplemented />,
          },
          {
            path: ':id',
            breadcrumbName: 'Cập nhật Máy bay',
            element: <AdminUpdateAircraftscreen />,
            // element: <NotImplemented />,
          },
          {
            path: 'create',
            breadcrumbName: 'Thêm Máy bay',
            element: <AdminCreateAircraftscreen />,
            // element: <NotImplemented />,
          },
        ],
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
        children: [
          {
            path: '',
            breadcrumbName: 'Danh sách',
            element: <AdminFlightRoutesIndexScreen />,
          },
          {
            path: ':id',
            breadcrumbName: 'Cập nhật Tuyến bay',
            element: <AdminUpdateFlightRouteScreen />,
            // element: <NotImplemented />,
          },
          {
            path: 'create',
            breadcrumbName: 'Thêm Tuyến bay',
            element: <AdminCreateFlightRouteScreen />,
            // element: <NotImplemented />,
          },
        ],
      },
      {
        path: 'flight-legs',
        breadcrumbName: 'Chặng bay',
        children: [
          {
            path: '',
            breadcrumbName: 'Danh sách',
            element: <AdminFlightLegsIndexScreen />,
          },
          {
            path: ':id',
            breadcrumbName: 'Cập nhật Chặng bay',
            element: <AdminUpdateFlightLegScreen />,
            // element: <NotImplemented />,
          },
          {
            path: 'create',
            breadcrumbName: 'Thêm Chặng bay',
            element: <AdminCreateFlightLegScreen />,
            // element: <NotImplemented />,
          },
        ],
      },
      {
        path: 'flights',
        breadcrumbName: 'Chuyến bay',
        children: [
          {
            path: '',
            breadcrumbName: 'Danh sách',
            element: <AdminFlightsIndexScreen />,
            // element: <NotImplemented />,
          },
          {
            path: ':id',
            breadcrumbName: 'Cập nhật Chuyến bay',
            element: <AdminUpdateFlightScreen />,
            // element: <NotImplemented />,
          },
          {
            path: 'create',
            breadcrumbName: 'Thêm Chuyến bay',
            element: <AdminCreateFlightScreen />,
            // element: <NotImplemented />,
          },
        ],
      },
      {
        path: 'booking',
        breadcrumbName: 'Đặt vé',
        children: [
          {
            path: '',
            breadcrumbName: 'Đặt vé',
            element: <AdminSearchWizardScreen />,
          },
          {
            path: 'booking-by-me',
            breadcrumbName: 'Đặt bởi tôi',
            // element: <AdminCreateFlightScreen />,
            element: <NotImplemented />,
          },
        ],
      },
      {
        path: 'surcharge',
        breadcrumbName: 'Phụ phí',
        children: [
          {
            path: '',
            breadcrumbName: 'Điều chỉnh phụ phí',
            element: <AdminSurchargeIndexScreen />,
          },
        ],
      },
      {
        path: '*',
        breadcrumbName: '404',
        element: <Error404 />,
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
