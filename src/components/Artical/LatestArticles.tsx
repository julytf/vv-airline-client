import IArticle from '@/interfaces/article/article.interface'
import articlesService from '@/services/articles.service'
import { route } from '@/utils/helpers'
import classNames from 'classnames'
import { FunctionComponent, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Image from '../ui/Image'

interface LatestArticlesProps {
  className?: string
}

const LatestArticles: FunctionComponent<LatestArticlesProps> = (props) => {
  const [latestArticles, setLatestArticles] = useState<IArticle[]>([])

  useEffect(() => {
    articlesService.getLatestArticles().then((data) => {
      setLatestArticles(data)
    })
  }, [])

  return (
    <div className={classNames('mx-auto max-w-7xl px-6 md:px-12 xl:px-6', props.className)}>
      <div className='relative mb-12 space-y-2 text-center'>
        <h2 className='text-3xl font-bold text-gray-800 md:text-4xl dark:text-white'>Bài viết mới nhất</h2>
        <p className='text-gray-600 lg:mx-auto lg:w-6/12 dark:text-gray-300'></p>
        <NavLink to={route('/articles')} className='absolute right-0 top-0'>
          <span className='text-info bold hover:text-primary dark:text-blue-300'>
            Xem tất cả <i className='fa-regular fa-angle-right'></i>
          </span>
        </NavLink>
      </div>
      <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-12'>
        {latestArticles.map((article, index) => (
          <NavLink key={index} to={route('/articles/:id', { params: { id: article._id! } })} className='col-span-3'>
            <div className='group rounded-3xl border border-gray-100 bg-white bg-opacity-50 p-6 shadow-2xl shadow-gray-600/10 sm:p-8 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none'>
              <div className='relative overflow-hidden rounded-xl'>
                <Image
                  src={`http://local.test:3000/${article.coverImage}`}
                  loading='lazy'
                  width='1000'
                  height='667'
                  className='h-64 w-full object-cover object-top transition duration-500 group-hover:scale-105'
                />
              </div>
              <div className='relative mt-6'>
                <h3 className='h-16 text-2xl font-semibold text-gray-800 dark:text-white'>{article.title}</h3>
                <div className='relative mt-6 h-16 overflow-hidden text-sm text-gray-600 dark:text-gray-300'>
                  {article.summary}
                  <div className='absolute bottom-0 h-8 w-full bg-gradient-to-b from-transparent from-0% to-white to-100%'></div>
                </div>
                <span className='inline-block w-full pt-8 hover:text-primary'>
                  <span className='text-info bold dark:text-blue-300'>Xem thêm</span>
                </span>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default LatestArticles
