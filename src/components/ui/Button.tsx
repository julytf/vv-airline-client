import classNames from 'classnames'
import { FunctionComponent, PropsWithChildren } from 'react'

interface ButtonProps extends PropsWithChildren {
  outline?: boolean
  text?: boolean
  className?: string
  disabled?: boolean
}

const Button: FunctionComponent<ButtonProps> = ({ outline, text, className, disabled, children }) => {
  // console.log('disabled', disabled)
  return (
    <button
      className={classNames('text-bold rounded-md p-2 px-4 text-sm active:scale-95', className, {
        'hover:bg-black-100': text,
        'outline outline-2 outline-primary': outline,
        'hover:bg-gray-200': outline || text,
        'bg-primary text-white hover:bg-primary-darker': !outline && !text,
        'cursor-not-allowed opacity-50': disabled,
      })}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
