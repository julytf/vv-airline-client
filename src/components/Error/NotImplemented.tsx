import { FunctionComponent } from 'react'

interface NotImplementedProps {}

const NotImplemented: FunctionComponent<NotImplementedProps> = () => {
  return <div className='text-2xl text-red-600'>Not Implemented!</div>
}

export default NotImplemented
