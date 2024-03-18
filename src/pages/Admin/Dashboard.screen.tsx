import { useToastNotify } from '@/contexts/ToastNotify.context'
import { FunctionComponent } from 'react'

interface DashboardProps {}

const Dashboard: FunctionComponent<DashboardProps> = () => {
  const toast = useToastNotify()

  return (
    <>
      <span>dashboard</span>
      <button onClick={() => toast.success({ title: 'test', message: 'this is test message' })} className='border p-2'>
        test success btn
      </button>
      <button onClick={() => toast.error({ title: 'test', message: 'this is test message' })} className='border p-2'>
        test error btn
      </button>
      <button onClick={() => toast.warning({ title: 'test', message: 'this is test message' })} className='border p-2'>
        test warning btn
      </button>
      <button
        onClick={() => toast.info({ title: 'test', message: 'this is test message', duration: 1 })}
        className='border p-2'
      >
        test info btn
      </button>
    </>
  )
}

export default Dashboard
