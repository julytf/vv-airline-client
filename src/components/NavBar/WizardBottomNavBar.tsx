import { FunctionComponent } from 'react'
import Button from '../ui/Button'
import { NavLink } from 'react-router-dom'

interface WizardBottomNavBarProps {
  forwardURL?: string
  isForwardEnabled?: boolean
  backwardURL?: string
  isBackwardEnabled?: boolean
}

const WizardBottomNavBar: FunctionComponent<WizardBottomNavBarProps> = ({
  forwardURL = '',
  isForwardEnabled = false,
  backwardURL = '',
  isBackwardEnabled = false,
}) => {
  // console.log('forwardURL', forwardURL)
  // console.log('isForwardEnabled', isForwardEnabled)
  // console.log('backwardURL', backwardURL)
  // console.log('isBackwardEnabled', isBackwardEnabled)

  return (
    <div className='flex justify-end gap-x-8'>
      <NavLink to={backwardURL}>
        <Button text disabled={!backwardURL || !isBackwardEnabled}>
          Back
        </Button>
      </NavLink>
      <NavLink to={forwardURL}>
        <Button disabled={!forwardURL || !isForwardEnabled}>Next</Button>
      </NavLink>
    </div>
  )
}

export default WizardBottomNavBar
