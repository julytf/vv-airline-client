import { SeatIcon } from '@/components/Icons'
import { SeatType } from '@/enums/seat.enums'
import ISeat from '@/interfaces/aircraft/seat.interface'
import classNames from 'classnames'
import { FunctionComponent } from 'react'

interface SeatProps {
  seat: ISeat
  isSelected?: boolean
  isOccupied?: boolean
  onClick: (seat: ISeat) => void
}

const Seat: FunctionComponent<SeatProps> = ({ seat, isSelected = false, isOccupied = false, onClick }) => {
  const seatColors = {
    [SeatType.NORMAL]: 'blue',
    [SeatType.WINDOW]: 'orange',
    [SeatType.AISLE]: 'blue',
  }
  return (
    <div className='has-tooltip relative'>
      <span className='tooltip'>{seat.code}</span>
      <div className='flex aspect-square w-10 items-center justify-center'>
        <button
          onClick={() => onClick(seat)}
          disabled={isSelected || isOccupied}
          className={classNames(
            'flex aspect-square w-8 items-center justify-center rounded hover:bg-sky-100 hover:ring',
            {
              'ring-2 ring-primary': isSelected,
            },
          )}
        >
          {isOccupied ? (
            <SeatIcon />
          ) : (
            <SeatIcon
              color={
                seatColors[seat.seatType || SeatType.NORMAL] as
                  | 'blue'
                  | 'orange'
                  | 'white'
                  | 'green'
                  | 'yellow'
                  | undefined
              }
            />
          )}
        </button>
      </div>
    </div>
  )
}

export default Seat
