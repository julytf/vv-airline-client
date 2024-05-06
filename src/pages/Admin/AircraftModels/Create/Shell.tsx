import classNames from "classnames"
import { FunctionComponent } from "react"

interface ShellProps {
    side?: 'left' | 'right'
    wing?: 'top' | 'middle' | 'bottom'
    exit?: boolean
  }
  
  const Shell: FunctionComponent<ShellProps> = (props) => {
    return (
      <div
        className={classNames('flex', {
          '-scale-x-100': props.side === 'left',
        })}
      >
        <div
          className={classNames('h-10 border-2', {
            'border-gray-500': !props.exit,
            'border-red-600': props.exit,
          })}
        ></div>
        <div className='aspect-square w-10'>
          {props.wing ? <img src={`/src/assets/images/aircraft/wing-${props.wing}.png`} /> : null}
          {props.exit ? (
            <span className=' text-red-600'>
              <i className='fa-sharp fa-solid fa-caret-left m-2'></i>
            </span>
          ) : null}
        </div>
      </div>
    )
  }

  export default Shell