import { ICabinModel } from '@/interfaces/aircraft/aircraftModel.interface'
import Seat from './Seat'
import ISeat from '@/interfaces/aircraft/seat.interface'
import { Fragment, FunctionComponent } from 'react'
import { numberToAlphabet } from '@/utils/helpers'

interface CabinProps {
  cabin: ICabinModel
  selectingSeats: ISeat[]
  occupiedSeats: ISeat[]
  onSelectSeat: (seat: ISeat) => void
}

const Cabin: FunctionComponent<CabinProps> = ({ cabin, selectingSeats, occupiedSeats, onSelectSeat }) => {
  return (
    <>
      <div className='flex justify-between'>
        {new Array(cabin.noCol).fill(0).map((_, index) => (
          <Fragment key={index}>
            <div className='bold aspect-square w-10'>{numberToAlphabet(index + 1)}</div>
            {cabin.aisleCol.includes(index + 1) && <div className='bold aspect-square w-10'></div>}
          </Fragment>
        ))}
      </div>
      {cabin.map.map((row, rowIndex) => (
        <div key={rowIndex} className='flex justify-between'>
          {row.seats.map((seat, seatIndex) => {
            return (
              <Fragment key={seatIndex}>
                <Seat
                  seat={seat}
                  onClick={onSelectSeat}
                  // the seat object and this list come from a source so it same object
                  isSelected={selectingSeats.includes(seat)}
                  // this list is fresh query so it new object list, cant compare object, will be all false
                  isOccupied={occupiedSeats.findIndex((occupiedSeat) => occupiedSeat?.code === seat?.code) !== -1}
                />
                {cabin.aisleCol.includes(seatIndex + 1) && (
                  <div className='aspect-square w-10 p-1'>{row.index + 1}</div>
                )}
              </Fragment>
            )
          })}
        </div>
      ))}
    </>
  )
}

export default Cabin
