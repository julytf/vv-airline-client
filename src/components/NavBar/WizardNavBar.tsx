import classNames from 'classnames'
import { FunctionComponent } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

type Step = {
  index: number
  title: string
  icon: string
  path: string
}

const steps: Step[] = [
  {
    index: 0,
    title: 'Chọn chuyến bay',
    icon: 'fa-plane',
    path: '/wizard/flights-selection',
  },
  {
    index: 1,
    title: 'Chọn ghế',
    icon: 'fa-seat-airline',
    path: '/wizard/seats-selection',
  },
  {
    index: 2,
    title: 'Thông tin hành khách',
    icon: 'fa-user',
    path: '/wizard/passengers-information',
  },
  {
    index: 3,
    title: 'Thanh toán',
    icon: 'fa-credit-card',
    path: '/wizard/payment',
  },
]

interface WizardNavBarProps {}

const WizardNavBar: FunctionComponent<WizardNavBarProps> = () => {
  const location = useLocation()
  const currentIndex = steps.findIndex((step) => step.path === location.pathname)

  return (
    <div className='mx-6 flex justify-center'>
      {steps.map((step) => (
        <WizardStep key={step.index} step={step} currentIndex={currentIndex} />
      ))}
    </div>
  )
}

interface WizardStepProps {
  step: Step
  currentIndex: number
}

const WizardStep: FunctionComponent<WizardStepProps> = (props) => {
  return (
    <NavLink to={props.step.path}>
      {/* <div className=' flex h-20 items-center justify-center'> */}
      <div className='relative h-20 w-64'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex'>
          <div
            className={classNames('w-32', {
              border: props.step.index > 0,
              'border-primary': props.step.index <= props.currentIndex,
            })}
          ></div>
          <div
            className={classNames('w-32', {
              'border ': props.step.index < steps.length - 1,
              'border-primary': props.step.index < props.currentIndex,
            })}
          ></div>
        </div>
        <div
          className={classNames(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex aspect-square w-16 items-center justify-center rounded-full border-2 p-3 bg-white',
            {
              'border-primary': props.step.index <= props.currentIndex,
              'w-20 border-4 shadow-md': props.step.index === props.currentIndex,
            },
          )}
        >
          <i
            className={classNames('fa-light', props.step.icon, {
              'text-primary': props.step.index <= props.currentIndex,
              'text-xl': props.step.index === props.currentIndex,
            })}
          ></i>
        </div>
      </div>
      <div className='text-center'>{props.step.title}</div>
    </NavLink>
  )
}

export default WizardNavBar
