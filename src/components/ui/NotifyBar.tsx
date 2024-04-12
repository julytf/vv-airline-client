import classNames from 'classnames'
import { FunctionComponent } from 'react'

interface NotifyBarProps {
  message: string
  type: 'success' | 'error' | 'warning'
  onClose?: () => void
}

const NotifyBar: FunctionComponent<NotifyBarProps> = ({ message, type, onClose }) => {
  return (
    <div
      className={classNames(' w-full border p-4', {
        'border-green-400 bg-green-100 text-green-700': type === 'success',
        'border-red-400 bg-red-100 text-red-700': type === 'error',
        'border-yellow-400 bg-yellow-100 text-yellow-700': type === 'warning',
      })}
    >
      {message}
    </div>
  )
}

export default NotifyBar
