import IAircraftModel, { IAircraftSeatMap } from '@/interfaces/aircraft/aircraftModel.interface'
import ISeat from '@/interfaces/aircraft/seat.interface'
import { Fragment, FunctionComponent } from 'react'
import Shell from './Shell'
import Cabin from './Cabin'
import { TicketClass } from '@/enums/ticket.enums'

interface SeatMapProps {
  aircraftModel: IAircraftModel
  selectingSeats: ISeat[]
  occupiedSeats: ISeat[]
  ticketClass: TicketClass
  onSelectSeat: (seat: ISeat) => void
}

const SeatMap: FunctionComponent<SeatMapProps> = ({
  aircraftModel,
  selectingSeats,
  occupiedSeats,
  ticketClass,
  onSelectSeat,
}) => {
  const seatMap = aircraftModel.seatMap as IAircraftSeatMap
  return (
    <div className='flex'>
      <div>
        <Shell side='left' />
        <Shell side='left' />
        {seatMap.map((cabin, index) => (
          <Fragment key={index}>
            <Shell side='left' />
            {cabin.map.map((row, rowIndex) => {
              if (cabin.class !== ticketClass) return null
              return <Shell key={rowIndex} side='left' exit={row.hasExit} />
            })}
          </Fragment>
        ))}
      </div>
      <div>
        <div className='flex  flex-col px-2 text-center'>
          <div className='flex h-20 items-center justify-center text-lg'>{aircraftModel.name}</div>
          {seatMap.map((cabin, index) => {
            if (cabin.class !== ticketClass) return null
            return (
              <Cabin
                key={index}
                cabin={cabin}
                onSelectSeat={onSelectSeat}
                selectingSeats={selectingSeats}
                occupiedSeats={occupiedSeats}
              />
            )
          })}
        </div>
        <div className='z-50 h-8 bg-white'></div>
      </div>
      <div>
        <Shell side='right' />
        <Shell side='right' />
        {seatMap.map((cabin, index) => (
          <Fragment key={index}>
            <Shell side='right' />
            {cabin.map.map((row, rowIndex) => {
              if (cabin.class !== ticketClass) return null
              return <Shell key={rowIndex} side='right' exit={row.hasExit} />
            })}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default SeatMap
