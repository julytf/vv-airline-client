import { FunctionComponent, Suspense, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '@/components/Footer/Footer'
import useScrollToTopOnNavigate from '@/hooks/ScrollToTopOnNavigate.hook'
import Loading from '@/components/ui/Loading'
import FacebookChatPlugin from '@/components/Plugin/FacebookChatPlugin'

interface MainLayoutProps {}

const MainLayout: FunctionComponent<MainLayoutProps> = () => {
  useScrollToTopOnNavigate()

  return (
    <div className='flex flex-col font-nuni '>
      <div className='relative'>
        <Header></Header>
        <div className='mx-auto -mt-24 flex min-h-screen w-full items-center justify-center pt-24 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl'>
          <Suspense fallback={<Loading />}>
            <Outlet></Outlet>
          </Suspense>
        </div>
      </div>
      <Footer />
      {/* <FacebookChatPlugin /> */}
    </div>
  )
}

export default MainLayout
