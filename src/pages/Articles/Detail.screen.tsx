import Loading from '@/components/Loading/Loading'
import IArticle from '@/interfaces/article/article.interface'
import articlesService from '@/services/articles.service'
import { FunctionComponent, useEffect, useState } from 'react'
import { useParams } from 'react-router'

interface DetailProps {}

const Detail: FunctionComponent<DetailProps> = () => {
  const { id } = useParams<{ id: string }>()

  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [article, setArticle] = useState<IArticle | null>(null)
  console.log(article)

  useEffect(() => {
    articlesService.getArticle(id!).then((data) => {
      setArticle(data)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className='mx-auto max-w-4xl pb-16 pt-8'>
      <div className='flex max-h-96 items-center justify-center overflow-hidden rounded-2xl'>
        <img src={`http://local.test:3000/${article?.coverImage}`} alt='' />
      </div>
      <div className='bold pt-8 text-3xl'>{article?.title}</div>
      <div className='pb-4 text-sm text-gray-500'>23 tháng 9, 2023</div>
      <div className='pb-8 italic'>{article?.summary}</div>
      <div className='prose max-w-full' dangerouslySetInnerHTML={{ __html: article?.content || '' }}></div>
    </div>
  )
}

export default Detail
