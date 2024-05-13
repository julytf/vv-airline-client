import classNames from 'classnames'
import { FunctionComponent } from 'react'

interface RadioProps {
  name: string
  displayName: string
  value: string
  checked: boolean
  onChange: () => void
}

const Radio: FunctionComponent<RadioProps> = ({ name, displayName, value, checked, onChange }) => {
  return (
    <label
      className={classNames('rounded-full border-2 px-2 py-1', {
        'border-black bg-black text-white': checked,
      })}
    >
      <span>{displayName}</span>
      <input type='radio' name='revenueBy' onChange={onChange} hidden />
    </label>
  )
}

export default Radio
