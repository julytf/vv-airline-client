import { FunctionComponent, Suspense, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import useScrollToTopOnNavigate from '@/hooks/ScrollToTopOnNavigate.hook'
import AdminSidebar from '@/components/Sidebar/AdminSidebar'
import AdminHeader from '@/components/Header/AdminHeader'
import Loading from '@/components/ui/Loading'

interface AdminLayoutProps {}

const AdminLayout: FunctionComponent<AdminLayoutProps> = () => {
  useScrollToTopOnNavigate()

  return (
    <div className=' flex font-nuni'>
      <AdminSidebar />
      <div className='ml-56 flex-1'>
        <div className=' mx-auto min-h-screen w-full bg-slate-100 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl'>
          <AdminHeader />
          <div className=' min-h-full'>
            <Suspense
              fallback={
                <div className='flex h-screen items-center justify-center'>
                  <Loading />
                </div>
              }
            >
              <Outlet></Outlet>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
