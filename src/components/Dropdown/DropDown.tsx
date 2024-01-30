import useOutsideClick from '@/hooks/useOutsideClick.hook'
import classNames from 'classnames'
import { FunctionComponent, PropsWithChildren, Ref, RefObject, useRef } from 'react'

interface DropDownProps extends PropsWithChildren {
  isShow?: boolean
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  onChangeShow?: (newState: boolean) => void
  parentRef?: RefObject<HTMLElement>
}

const DropDown: FunctionComponent<DropDownProps> & { Row: FunctionComponent<RowProps> } = ({
  isShow,
  position,
  onChangeShow,
  parentRef,
  children,
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
        `z-30 absolute max-h-0 max-w-0 overflow-hidden text-nowrap rounded bg-white transition-all duration-500`,
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

interface RowProps extends PropsWithChildren {}

const Row: FunctionComponent<RowProps> = ({ children }) => {
  return <div className='border-b p-2'>{children}</div>
}

DropDown.Row = Row

export default DropDown