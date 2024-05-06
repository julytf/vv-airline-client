import SmartTable, { TableData } from '@/components/Table/SmartTable'
import Button from '@/components/ui/Button'
import Image from '@/components/ui/Image'
import articlesService from '@/services/articles.service'
import { route, truncate } from '@/utils/helpers'
import { FunctionComponent, useState } from 'react'
import { NavLink } from 'react-router-dom'

interface ArticlesIndexProps {}

const ArticlesIndex: FunctionComponent<ArticlesIndexProps> = () => {
  // const articlesData = [
  //   { id: 1, name: 'Nguyễn Văn A', email: 'nva', gender: true },
  //   { id: 2, name: 'Nguyễn Thij B', email: 'ntb', gender: false },
  // ]

  return (
    <div className='flex flex-wrap p-3 px-6'>
      <div className='w-full max-w-full flex-none'>
        <div className='flex justify-end py-3'>
          <NavLink to={route('/admin/articles/create')}>
            <Button>Thêm Bài Viết</Button>
          </NavLink>
        </div>
        <SmartTable
          title='Bài Viết'
          subTitle='Danh Sách Bài Viết'
          // data={articlesData}
          FetchDataFnc={articlesService.getArticlesPaginate.bind(articlesService)}
          queryKey='articles'
          renderOptions={[
            {
              field: 'title',
              displayName: 'Tiêu đề',
              renderFnc: (value: unknown) => {
                return <div className='text-wrap'>{truncate(String(value), 60) || '-'}</div>
              },
            },
            {
              field: 'coverImage',
              displayName: 'Ảnh bìa',
              renderFnc: (value: unknown) => {
                return (
                  <>
                    <Image className='max-h-32 max-w-32' src={`http://local.test:3000/${value}`} alt='Ảnh bìa' />
                  </>
                )
              },
            },
            {
              field: 'summary',
              displayName: 'Tóm tắt',
              renderFnc: (value: unknown) => {
                return <div className='text-wrap'>{truncate(String(value), 60) || '-'}</div>
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
              field: 'isFeatured',
              displayName: 'Nổi bật',
              renderFnc: (value: unknown, data: TableData) => {
                return <IsFeaturedButton key={data?._id as string} id={String(data?._id)} value={value == true} />
              },
            },
            {
              field: '',
              displayName: 'Sửa đổi',
              renderFnc: (value: unknown, data?: TableData) => {
                return (
                  <div className='flex gap-x-4'>
                    <NavLink to={route('/admin/articles/:id', { params: { id: String(data?._id) } })}>
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

interface IsFeaturedButtonProps {
  id: string
  value: boolean
}

const IsFeaturedButton: FunctionComponent<IsFeaturedButtonProps> = ({ id, value }) => {
  const [isFeatured, setIsFeatured] = useState(value == true)

  const onUpdateFeatured = async (id: string, isFeatured: boolean) => {
    console.log(isFeatured)

    setIsFeatured(isFeatured)
    try {
      await articlesService.updateArticle({ _id: id, isFeatured })
    } catch (ex) {
      setIsFeatured(!isFeatured)
    }
  }

  return (
    <label>
      <input
        type='checkbox'
        checked={isFeatured}
        onChange={(e) => onUpdateFeatured(id, e.target.checked)}
        className='hidden'
      />
      <div className='flex aspect-square w-8 cursor-pointer items-center justify-center rounded-md border'>
        <span className='text-yellow-300'>
          {isFeatured ? <i className='fa-solid fa-star'></i> : <i className='fa-light fa-star'></i>}
        </span>
      </div>
    </label>
  )
}

export default ArticlesIndex
