import DropDown from '@/components/Dropdown/DropDown'
import { SeatIcon } from '@/components/Icons'
import { SeatType } from '@/enums/seat.enums'
import { TicketClass } from '@/enums/ticket.enums'
import ISeat from '@/interfaces/aircraft/seat.interface'
import classNames from 'classnames'
import { FunctionComponent, useRef, useState } from 'react'

interface SeatProps {
  value: ISeat
  onChange?: (seat: ISeat) => void
}

const Seat: FunctionComponent<SeatProps> = ({ value, onChange }) => {
  const dropdownParentRef = useRef<HTMLButtonElement>(null)
  const [isShow, setIsShow] = useState(false)

  const seatColors = {
    [SeatType.NORMAL]: 'blue',
    [SeatType.WINDOW]: 'orange',
    [SeatType.AISLE]: 'green',
  }
  return (
    <div className='has-tooltip relative'>
      <span className='tooltip'>{value.code}</span>
      <div className='flex aspect-square w-10 items-center justify-center'>
        <button
          type='button'
          ref={dropdownParentRef}
          onClick={(e) => {
            setIsShow(!isShow)
          }}
          // disabled={isSelected || isOccupied}
          className={classNames(
            'flex aspect-square w-8 items-center justify-center rounded hover:bg-sky-100 hover:ring',
          )}
        >
          <SeatIcon
            color={
              seatColors[value.seatType || SeatType.NORMAL] as
                | 'blue'
                | 'orange'
                | 'white'
                | 'green'
                | 'yellow'
                | undefined
            }
          />
        </button>
      </div>
      <DropDown
        parentRef={dropdownParentRef}
        isShow={isShow}
        onChangeShow={(newState) => {
          setIsShow(newState)
          // console.log(newState)
        }}
        className='rounded-md border'
      >
        <div className='flex flex-col'>
          {Object.keys(SeatType).map((key, index) => (
            <button
              type='button'
              key={index}
              onClick={(e) => {
                onChange?.({ ...value, seatType: key as SeatType })
                setIsShow(false)
              }}
            >
              <DropDown.Row key={index} className={value.seatType === key ? 'bg-gray-200' : ''}>
                {key}
              </DropDown.Row>
            </button>
          ))}
        </div>
      </DropDown>
    </div>
  )
}

export default Seat
