import { SearchWizardStep } from '@/pages/SearchWizard/SearchWizard.screen'
import classNames from 'classnames'
import { FunctionComponent } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

interface WizardNavBarProps {
  searchWizardSteps: SearchWizardStep[]
}

const WizardNavBar: FunctionComponent<WizardNavBarProps> = ({ searchWizardSteps }) => {
  const location = useLocation()
  const currentIndex = searchWizardSteps.findIndex((step) => step.path === location.pathname)

  return (
    <div className='mx-6 flex justify-center'>
      {searchWizardSteps.map((step) => (
        <WizardStep
          key={step.index}
          step={step}
          currentIndex={currentIndex}
          isLast={step.index < searchWizardSteps.length - 1}
        />
      ))}
    </div>
  )
}

interface WizardStepProps {
  step: SearchWizardStep
  currentIndex: number
  isLast: boolean
}

const WizardStep: FunctionComponent<WizardStepProps> = ({ isLast, step, currentIndex }) => {
  return (
    <NavLink to={step.path}>
      {/* <div className=' flex h-20 items-center justify-center'> */}
      <div className='relative h-20 w-64'>
        <div className='absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2'>
          <div
            className={classNames('w-32', {
              border: step.index > 0,
              'border-primary': step.index <= currentIndex,
            })}
          ></div>
          <div
            className={classNames('w-32', {
              'border ': isLast,
              'border-primary': step.index < currentIndex,
            })}
          ></div>
        </div>
        <div
          className={classNames(
            'absolute left-1/2 top-1/2 flex aspect-square w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 bg-white p-3',
            {
              'border-primary': step.index <= currentIndex,
              'w-20 border-4 shadow-md': step.index === currentIndex,
            },
          )}
        >
          <i
            className={classNames('fa-light', step.icon, {
              'text-primary': step.index <= currentIndex,
              'text-xl': step.index === currentIndex,
            })}
          ></i>
        </div>
      </div>
      <div className='text-center'>{step.title}</div>
    </NavLink>
  )
}

export default WizardNavBar
