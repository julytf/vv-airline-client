import { FC, FunctionComponent, useEffect } from 'react'
import SearchCard from '../components/Card/SearchCard'
import FeaturedArticles from '../components/Artical/FeaturedArticles'
import LatestArticles from '@/components/Artical/LatestArticles'

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  return (
    <div className='flex-col items-center justify-center gap-x-12 gap-y-12 py-24 text-center'>
      <div className=' -mt-48 flex h-screen flex-col items-center justify-center pt-24'>
        <div className='text-8xl font-extrabold'>ĐẶT VÉ MÁY BAY</div>
        <div className='mt-2 text-8xl font-extrabold text-primary'>TRỰC TUYẾN</div>
        <div className='mt-6 text-2xl'>Hãng hàng không VV Airline xin chào quý khách!</div>
        <SearchCard className='mt-6 shadow-xl'></SearchCard>
      </div>
      <FeaturedArticles className='mt-36' />
      <LatestArticles className='mt-36' />
      {/* <div className='placeHolder h-screen'></div> */}
    </div>
  )
}

export default Home
