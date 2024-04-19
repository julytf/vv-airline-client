import { FunctionComponent } from 'react'
import error404Banner from '@/assets/images/error404.jpg'
import Button from '@/components/ui/Button'
import { useNavigate } from 'react-router'

interface Error404Props {}

const Error404: FunctionComponent<Error404Props> = () => {
  const navigate = useNavigate()
  return (
    <div
      className='h-screen w-screen bg-cover'
      style={{
        backgroundImage: `url(${error404Banner})`,
      }}
    >
      <Button onClick={() => navigate('/')} className='absolute bottom-16 right-1/2 m-4 translate-x-1/2'>
        Trở về trang chủ
      </Button>
    </div>
  )
}

export default Error404
