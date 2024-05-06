import useOutsideClick from '@/hooks/useOutsideClick.hook'
import classNames from 'classnames'
import { FunctionComponent, PropsWithChildren, Ref, RefObject, useRef } from 'react'

interface DropDownProps extends PropsWithChildren {
  isShow?: boolean
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  onChangeShow?: (newState: boolean) => void
  parentRef?: RefObject<HTMLElement>
  className?: string
}

const DropDown: FunctionComponent<DropDownProps> & { Row: FunctionComponent<RowProps> } = ({
  isShow,
  position,
  onChangeShow,
  parentRef,
  children,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useOutsideClick(parentRef || ref, () => {
    // console.log('outside')
    // console.log('isShow', isShow)
    onChangeShow?.(false)
  })
  // console.log('isShow', isShow)

  return (
    <div
      className={classNames(
        className,
        `no-scrollbar absolute z-30 max-h-0 max-w-0 overflow-y-scroll text-nowrap rounded bg-white transition-all duration-500`,
        {
          'max-h-96 max-w-96': isShow,
          'left-0': position === 'top-right' || position === 'bottom-right',
          'right-0': position === 'top-left' || position === 'bottom-left',
        },
      )}
      ref={ref}
    >
      <div className='rounded-md border'>{children}</div>
    </div>
  )
}

interface RowProps extends PropsWithChildren {
  className?: string
}

const Row: FunctionComponent<RowProps> = ({ className, children }) => {
  return <div className={classNames(className, 'flex items-start border-b p-2 px-4')}>{children}</div>
}

DropDown.Row = Row

export default DropDown
