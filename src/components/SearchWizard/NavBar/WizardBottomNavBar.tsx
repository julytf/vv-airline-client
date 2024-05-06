import { FunctionComponent } from 'react'
import Button from '../../ui/Button'
import { NavLink } from 'react-router-dom'

interface WizardBottomNavBarProps {
  onClickForward?: () => void
  isForwardEnabled?: boolean
  onClickBackward?: () => void
  isBackwardEnabled?: boolean
}

const WizardBottomNavBar: FunctionComponent<WizardBottomNavBarProps> = ({
  isForwardEnabled = false,
  onClickForward,
  isBackwardEnabled = false,
  onClickBackward,
}) => {
  // console.log('forwardURL', forwardURL)
  // console.log('isForwardEnabled', isForwardEnabled)
  // console.log('backwardURL', backwardURL)
  // console.log('isBackwardEnabled', isBackwardEnabled)

  return (
    <div className='flex justify-end gap-x-8'>
      <Button onClick={() => onClickBackward?.()} text disabled={!isBackwardEnabled}>
        Lùi lại
      </Button>
      <Button onClick={() => onClickForward?.()} disabled={!isForwardEnabled}>
        Tiếp tục
      </Button>
    </div>
  )
}

export default WizardBottomNavBar
