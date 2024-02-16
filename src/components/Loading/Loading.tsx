import classNames from 'classnames'
import { FC, useEffect } from 'react'

interface LoadingProps {
  small?: boolean
}

const Loading: FC<LoadingProps> = ({ small }) => {
  return (
    <div className='flex h-full items-center justify-center'>
      <div
        className={classNames(
          'border-16 animate-spin rounded-full border-2 border-solid border-gray-300 border-t-primary ',
          { 'h-32 w-32': !small, 'h-16 w-16': small },
        )}
      ></div>
    </div>
  )
}

export default Loading
