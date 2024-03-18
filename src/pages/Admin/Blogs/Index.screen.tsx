import SmartTable, { TableData } from '@/components/Table/SmartTable'
import Button from '@/components/ui/Button'
import blogsService from '@/services/blogs.service'
import { route, truncate } from '@/utils/helpers'
import { FunctionComponent } from 'react'
import { NavLink } from 'react-router-dom'

interface BlogsIndexProps {}

const BlogsIndex: FunctionComponent<BlogsIndexProps> = () => {
  // const blogsData = [
  //   { id: 1, name: 'Nguyễn Văn A', email: 'nva', gender: true },
  //   { id: 2, name: 'Nguyễn Thij B', email: 'ntb', gender: false },
  // ]
  return (
    <div className='flex flex-wrap p-3 px-6'>
      <div className='w-full max-w-full flex-none'>
        <div className='flex justify-end py-3'>
          <NavLink to={route('/admin/blogs/create')}>
            <Button>Thêm Blog</Button>
          </NavLink>
        </div>
        <SmartTable
          title='Blog'
          subTitle='Danh Sách Blog'
          // data={blogsData}
          FetchDataFnc={blogsService.getBlogsPaginate.bind(blogsService)}
          renderOptions={[
            {
              field: 'title',
              displayName: 'Tiêu đề',
              renderFnc: (value: unknown) => {
                return <div className='text-wrap'>{truncate(value as string, 60)}</div>
              },
            },
            {
              field: 'coverImage',
              displayName: 'Ảnh bìa',
              renderFnc: (value: unknown) => {
                return (
                  <>
                    <img className='max-h-32 max-w-32' src={value as string} alt='Ảnh bìa' />
                  </>
                )
              },
            },
            {
              field: 'summary',
              displayName: 'Tóm tắt',
              renderFnc: (value: unknown) => {
                return <div className='text-wrap'>{truncate(value as string, 60)}</div>
              },
            },
            {
              field: 'content',
              displayName: 'Nội dung',
              renderFnc: (value: unknown) => {
                return <div className='text-wrap'>{truncate(value as string, 60)}</div>
              },
            },
            {
              field: '',
              displayName: 'Sửa đổi',
              renderFnc: (value: unknown, data?: TableData) => {
                return (
                  <div className='flex gap-x-4'>
                    <NavLink to={route('/admin/blogs/:id', { params: { id: String(data?._id) } })}>
                      <i className='fa-regular fa-pen-to-square'></i>
                    </NavLink>
                  </div>
                )
              },
            },
          ]}
        />
      </div>
    </div>
  )
}

export default BlogsIndex
