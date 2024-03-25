import Pagination from '@/components/Pagination/Pagination'
import TablePagination from '@/components/Pagination/TablePagination'
import Image from '@/components/ui/Image'
import IArticle from '@/interfaces/article/article.interface'
import articlesService from '@/services/articles.service'
import { route } from '@/utils/helpers'
import classNames from 'classnames'
import { FunctionComponent, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { NavLink } from 'react-router-dom'

interface IndexProps {
  className?: string
}

const Index: FunctionComponent<IndexProps> = (props) => {
  const [page, setPage] = useState(() => Number(new URLSearchParams(location.search).get('page')) || 1)

  const { data, isFetching, isLoading, error, isError } = useQuery({
    queryKey: ['articles', { page }],
    queryFn: () => articlesService.getArticlesPaginate({ page, perPage: 12 }),
  })

  const { docs: articles = [], lastPage } = (data as { docs: IArticle[]; lastPage: number }) || {}

  return (
    <div className={classNames('mx-auto max-w-7xl px-6 py-8 md:px-12 xl:px-6', props.className)}>
      <div className='relative mb-12 space-y-2 text-center'>
        <h2 className='text-3xl font-bold text-gray-800 md:text-4xl dark:text-white'>Bài viết mới nhất</h2>
        <p className='text-gray-600 lg:mx-auto lg:w-6/12 dark:text-gray-300'></p>
      </div>
      <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-12'>
        {articles.map((article) => (
          <NavLink to={route('/articles/:id', { params: { id: article._id! } })} className='col-span-3'>
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
                <h3 className='h-16 text-2xl font-semibold text-gray-800 dark:text-white text-center'>{article.title}</h3>
                <p className='relative mt-6 h-16 text-sm overflow-hidden text-gray-600 dark:text-gray-300'>
                  {article.summary}
                  <div className='absolute bottom-0 h-8 w-full bg-gradient-to-b from-transparent from-0% to-white to-100%'></div>
                </p>
                <span className='inline-block w-full pt-8 hover:text-primary text-center'>
                  <span className='text-info bold dark:text-blue-300'>Xem thêm</span>
                </span>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
      <div className='flex justify-end py-8'>
        <Pagination page={page} lastPage={lastPage} onPageChange={setPage} />
      </div>
    </div>
  )
}

export default Index
