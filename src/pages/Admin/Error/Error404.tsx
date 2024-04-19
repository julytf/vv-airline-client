import { FunctionComponent } from 'react'
import Button from '@/components/ui/Button'
import { useNavigate } from 'react-router'

interface Error404Props {}

const Error404: FunctionComponent<Error404Props> = () => {
  const navigate = useNavigate()
  return (
    <div className='-mt-24 flex h-screen w-full flex-col items-center justify-center pt-24 gap-4'>
      <div className='bol text-6xl'>404</div>
      <div className='text-2xl'>Trang không tồn tại</div>
      <Button onClick={() => navigate('/admin')} className=''>
        Trở về trang chủ
      </Button>
    </div>
  )
}

export default Error404
