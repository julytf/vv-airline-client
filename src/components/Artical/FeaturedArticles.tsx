import classNames from 'classnames'
import { FunctionComponent } from 'react'

interface FeaturedArticlesProps {
  className?: string
}

const FeaturedArticles: FunctionComponent<FeaturedArticlesProps> = (props) => {
  return (
    <div className={classNames('mx-auto max-w-7xl px-6 md:px-12 xl:px-6', props.className)}>
      <div className='mb-12 space-y-2 text-center'>
        <h2 className='text-3xl font-bold text-gray-800 md:text-4xl dark:text-white'>Địa điểm du lịch phổ biến</h2>
        <p className='text-gray-600 lg:mx-auto lg:w-6/12 dark:text-gray-300'>
          Các địa điểm du lịch phổ biến nhất được nhiều khách hàng lựa chọn, hứa hẹn sẽ mang đến cho bạn những trải
          nghiệm tuyệt vời.
        </p>
      </div>
      <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
        <div className='group rounded-3xl border border-gray-100 bg-white bg-opacity-50 p-6 shadow-2xl shadow-gray-600/10 sm:p-8 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none'>
          <div className='relative overflow-hidden rounded-xl'>
            <img
              src='https://www.gotokyo.org/en/plan/tokyo-outline/images/main.jpg'
              alt='art cover'
              loading='lazy'
              width='1000'
              height='667'
              className='h-64 w-full object-cover object-top transition duration-500 group-hover:scale-105'
            />
          </div>
          <div className='relative mt-6'>
            <h3 className='text-2xl font-semibold text-gray-800 dark:text-white'>
              Tokyo
            </h3>
            <p className='mb-8 mt-6 text-gray-600 dark:text-gray-300'>
              Voluptates harum aliquam totam, doloribus eum impedit atque! Temporibus...
            </p>
            <a className='inline-block' href='#'>
              <span className='text-info dark:text-blue-300'>Read more</span>
            </a>
          </div>
        </div>
        <div className='group rounded-3xl border border-gray-100 bg-white bg-opacity-50 p-6 shadow-2xl shadow-gray-600/10 sm:p-8 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none'>
          <div className='relative overflow-hidden rounded-xl'>
            <img
              src='https://media.techcity.cloud/vietnam.vn/2023/05/hinh-anh-da-lat-mo-suong-sang-som_085718200-9.jpg'
              alt='art cover'
              loading='lazy'
              width='1000'
              height='667'
              className='h-64 w-full object-cover object-top transition duration-500 group-hover:scale-105'
            />
          </div>
          <div className='relative mt-6'>
            <h3 className='text-2xl font-semibold text-gray-800 dark:text-white'>
              Đà Lạt
            </h3>
            <p className='mb-8 mt-6 text-gray-600 dark:text-gray-300'>
              Voluptates harum aliquam totam, doloribus eum impedit atque! Temporibus...
            </p>
            <a className='inline-block' href='#'>
              <span className='text-info dark:text-blue-300'>Read more</span>
            </a>
          </div>
        </div>
        <div className='group rounded-3xl border border-gray-100 bg-white bg-opacity-50 p-6 shadow-2xl shadow-gray-600/10 sm:p-8 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none'>
          <div className='relative overflow-hidden rounded-xl'>
            <img
              src='
              https://statics.vntrip.vn/data-v2/data-guide/img_content/1470302452_anh-5.jpg'
              alt='art cover'
              loading='lazy'
              width='1000'
              height='667'
              className='h-64 w-full object-cover object-top transition duration-500 group-hover:scale-105'
            />
          </div>
          <div className='relative mt-6'>
            <h3 className='text-2xl font-semibold text-gray-800 dark:text-white'>
              Phú Quốc
            </h3>
            <p className='mb-8 mt-6 text-gray-600 dark:text-gray-300'>
              Voluptates harum aliquam totam, doloribus eum impedit atque! Temporibus...
            </p>
            <a className='inline-block' href='#'>
              <span className='text-info dark:text-blue-300'>Read more</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedArticles
