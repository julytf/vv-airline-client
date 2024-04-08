import classNames from 'classnames'
import { FC, useEffect } from 'react'

interface ErrorTextProps {
  message?: string
}

const ErrorText: FC<ErrorTextProps> = ({ message }) => {
  return <div className='text-red-600'>{message || 'Something went wrong!'}</div>
}

export default ErrorText
