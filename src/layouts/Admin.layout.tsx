import { FunctionComponent, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import useScrollToTopOnNavigate from '@/hooks/ScrollToTopOnNavigate.hook'
import AdminSidebar from '@/components/Sidebar/AdminSidebar'
import AdminHeader from '@/components/Header/AdminHeader'

interface AdminLayoutProps {}

const AdminLayout: FunctionComponent<AdminLayoutProps> = () => {
  useScrollToTopOnNavigate()

  return (
    <div className=' font-nuni flex'>
        <AdminSidebar />
      <div className='flex-1 ml-56'>
        <div className='mx-auto min-h-screen w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl'>
          <AdminHeader />
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
