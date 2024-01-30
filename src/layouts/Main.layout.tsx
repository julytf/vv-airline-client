import { FunctionComponent, Suspense, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '@/components/Footer/Footer'
import useScrollToTopOnNavigate from '@/hooks/ScrollToTopOnNavigate.hook'
import Loading from '@/components/Loading/Loading'
import FacebookChatPlugin from '@/components/Plugin/FacebookChatPlugin'

interface MainLayoutProps {}

const MainLayout: FunctionComponent<MainLayoutProps> = () => {
  useScrollToTopOnNavigate()

  return (
    <div className='flex flex-col font-nuni '>
      <div className='flex min-h-screen flex-col'>
        <Header></Header>
        <div className='mx-auto w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl'>
          <Suspense fallback={<Loading />}>
            <Outlet></Outlet>
          </Suspense>
        </div>
      </div>
      <Footer />
      <FacebookChatPlugin />
    </div>
  )
}

export default MainLayout
