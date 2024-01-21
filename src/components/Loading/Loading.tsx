import { FC, useEffect } from 'react'

interface LoadingProps {}

const Loading: FC<LoadingProps> = () => {
  return (
    <div className='flex p-32 w-full items-center justify-center'>
      <div className='border-16 h-32 w-32 animate-spin rounded-full border-2 border-solid border-gray-300 border-t-primary '></div>
    </div>
  )
}

export default Loading
