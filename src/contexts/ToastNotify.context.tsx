import { FlightType } from '../enums/flight.enums'
import IFlight from '@/interfaces/flight/flight.interface'
import { SeatClass } from '../enums/seat.enums'
import { FC, FunctionComponent, PropsWithChildren, createContext, useContext, useEffect, useRef, useState } from 'react'
import ISeat from '@/interfaces/aircraft/seat.interface'
import IAirport from '@/interfaces/flight/airport.interface'
import { UserGender } from '@/enums/user.enums'
import { PassengerType } from '@/enums/passenger.enums'
import { FlightLegType } from '@/enums/flightLeg.enums'
import classNames from 'classnames'

type ToastParams = {
  type?: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  path?: string
  duration?: number
}

export type ContextValue = {
  success: (params: ToastParams) => void
  error: (params: ToastParams) => void
  warning: (params: ToastParams) => void
  info: (params: ToastParams) => void
}

const ToastNotifyContext = createContext<ContextValue | undefined>(undefined)

export const ToastNotifyProvider: FC<PropsWithChildren> = ({ children }) => {
  const [toasts, setToasts] = useState<{ id: number; element: JSX.Element }[]>([])

  const countRef = useRef(0)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const [toast, setToast] = useState<ContextValue>({
    success: (params: ToastParams) => {
      createToast({
        type: 'success',
        ...params,
      })
    },
    error: (params: ToastParams) => {
      createToast({
        type: 'error',
        ...params,
      })
    },
    warning: (params: ToastParams) => {
      createToast({
        type: 'warning',
        ...params,
      })
    },
    info: (params: ToastParams) => {
      createToast({
        type: 'info',
        ...params,
      })
    },
  })

  const createToast = (params: ToastParams) => {
    const id = countRef.current++
    const toast = <Toast key={id} {...params} onCloseClick={() => removeToast(id)} />

    setToasts((prev) => [...prev, { id, element: toast }])

    setTimeout(
      () => {
        removeToast(id)
      },
      (params.duration || 5) * 1000,
    )
  }

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ToastNotifyContext.Provider value={toast}>
      {children}
      <div ref={wrapperRef} className='fixed bottom-10 right-10 z-50 flex flex-col gap-1'>
        {toasts.map((t) => t.element)}
      </div>
    </ToastNotifyContext.Provider>
  )
}

export const useToastNotify = (): ContextValue => {
  const contextData = useContext(ToastNotifyContext)

  if (!contextData) {
    throw new Error('useToastNotify must be used within a ToastNotifyProvider')
  }

  return contextData
}

interface ToastProps {
  type?: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  path?: string
  onCloseClick?: () => void
}

const Toast: FunctionComponent<ToastProps> = ({ type = 'info', title, message, path, onCloseClick }) => {
  const [animationStart, setAnimationStart] = useState(false)

  useEffect(() => {
    setAnimationStart(true)
  }, [])

  return (
    <div
      className={classNames('flex overflow-hidden rounded transition-transform duration-500 ease-in-out', {
        'translate-x-full': !animationStart,
        'translate-x-0': animationStart,
      })}
    >
      <div
        className={classNames(' w-2', {
          'bg-green-400': type === 'success',
          'bg-red-500': type === 'error',
          'bg-yellow-300': type === 'warning',
          'bg-blue-400': type === 'info',
        })}
      ></div>

      <div className='flex w-64 justify-between rounded-r border border-l-0 bg-white shadow-md'>
        <div className=' px-4 py-2'>
          <div className='bold text-lg'>{title}</div>
          <div>{message}</div>
        </div>
        <div className=''>
          <button onClick={onCloseClick} className='flex aspect-square w-8 items-center justify-center'>
            <i className='fa-regular fa-x'></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ToastNotifyContext
