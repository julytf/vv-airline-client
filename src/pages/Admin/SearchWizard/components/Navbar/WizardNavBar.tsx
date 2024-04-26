import classNames from 'classnames'
import { FunctionComponent } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { SearchWizardStep } from '../../SearchWizard.screen'
import { useSearchWizard } from '@/contexts/SearchWizard.context'

interface WizardNavBarProps {
  searchWizardSteps: SearchWizardStep[]
  currentStep: number
}

const WizardNavBar: FunctionComponent<WizardNavBarProps> = ({ searchWizardSteps, currentStep }) => {
  return (
    <div className='mx-6 flex justify-center'>
      {searchWizardSteps.map((step) => (
        <WizardStep
          key={step.index}
          step={step}
          currentStep={currentStep}
          isLast={step.index < searchWizardSteps.length - 1}
        />
      ))}
    </div>
  )
}

interface WizardStepProps {
  step: SearchWizardStep
  currentStep: number
  isLast: boolean
}

const WizardStep: FunctionComponent<WizardStepProps> = ({ isLast, step, currentStep }) => {
  const { actions } = useSearchWizard()

  return (
    <div onClick={() => actions.toStep(step.index)}>
      <div className='relative h-20 w-48'>
        <div className='absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2'>
          <div
            className={classNames('w-24', {
              border: step.index > 0,
              'border-primary': step.index <= currentStep,
            })}
          ></div>
          <div
            className={classNames('w-24', {
              'border ': isLast,
              'border-primary': step.index < currentStep,
            })}
          ></div>
        </div>
        <div
          className={classNames(
            'absolute left-1/2 top-1/2 flex aspect-square w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 bg-white p-3',
            {
              'border-primary': step.index <= currentStep,
              'w-20 border-4 shadow-md': step.index === currentStep,
            },
          )}
        >
          <i
            className={classNames('fa-light', step.icon, {
              'text-primary': step.index <= currentStep,
              'text-xl': step.index === currentStep,
            })}
          ></i>
        </div>
      </div>
      <div className='text-center'>{step.title}</div>
    </div>
  )
}

export default WizardNavBar
