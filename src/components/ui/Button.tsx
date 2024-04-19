import classNames from 'classnames'
import { FunctionComponent, MouseEventHandler, PropsWithChildren } from 'react'

interface ButtonProps extends PropsWithChildren {
  outline?: boolean
  text?: boolean
  className?: string
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const Button: FunctionComponent<ButtonProps> = ({ outline, text, className, disabled, children, onClick }) => {
  // console.log('disabled', disabled)
  return (
    <button
      className={classNames(
        'text-bold flex items-center justify-center rounded-md p-2 px-4 text-sm active:scale-95',
        className,
        {
          'hover:bg-black-100': text,
          'outline outline-2 outline-primary': outline,
          'hover:bg-gray-200': outline || text,
          'bg-primary text-white hover:bg-primary-darker': !outline && !text,
          'cursor-not-allowed opacity-50': disabled,
        },
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
