import { FunctionComponent } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'

interface MainLayoutProps {}

const MainLayout: FunctionComponent<MainLayoutProps> = () => {
  return (
    <div className='min-h-screen font-nuni'>
      <Header></Header>
      <div className=' xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm mx-auto'>
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default MainLayout
