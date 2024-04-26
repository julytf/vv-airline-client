import { TicketClass, TicketType } from '@/enums/ticket.enums'
import IAirport from '@/interfaces/flight/airport.interface'
import IFlight from '@/interfaces/flight/flight.interface'
import { FunctionComponent } from 'react'
import Flight from './Flight'
import SelectedFlight from './SeletectedFlight'

interface FlightSelectProps {
  // departureAirport: IAirport
  // arrivalAirport: IAirport
  // date: Date
  flights: IFlight[]
  selectedFlightInfo?: { flight: IFlight; ticketClass: TicketClass; ticketType: TicketType; price: number } | null
  timeLimit?: Date
  quantityLimit?: number
  onChange?: (info: { flight: IFlight; ticketClass: TicketClass; ticketType: TicketType; price: number } | null) => void
}

const FlightSelect: FunctionComponent<FlightSelectProps> = ({
  // departureAirport,
  // arrivalAirport,
  // date,
  flights,
  selectedFlightInfo,
  timeLimit,
  quantityLimit,
  onChange,
}) => {
  return (
    // <div className='flex w-full flex-col gap-y-4 rounded-md border shadow-inner'>
    //   <div className='flex border-b p-4 px-8'>
    //     <div className='pr-4 pt-2 text-4xl'>
    //       <i className='fa-light fa-plane'></i>
    //     </div>
    //     <div className='flex flex-col'>
    //       <span className='text-2xl'>
    //         {departureAirport?.city}({departureAirport?.IATA}) - {arrivalAirport?.city}({arrivalAirport?.IATA})
    //       </span>
    //       <span>
    //         {/* TODO: */}
    //         {date?.toLocaleDateString('vi-VN', {
    //           weekday: 'long',
    //           year: 'numeric',
    //           month: 'numeric',
    //           day: 'numeric',
    //         })}
    //       </span>
    //     </div>
    //   </div>
    //   <div className='flex flex-col gap-y-8 p-8'>
    // {
    flights.length === 0 ? (
      <div className='p-16 text-center text-xl'>Không có Chuyến Bay nào!</div>
    ) : selectedFlightInfo ? (
      <SelectedFlight selectedFlightInfo={selectedFlightInfo} onChange={onChange} />
    ) : (
      flights.map((flight, index) => {
        const disabled =
          timeLimit && timeLimit > flight.departureTime
            ? {
                [TicketClass.ECONOMY]: true,
                [TicketClass.BUSINESS]: true,
              }
            : {
                [TicketClass.ECONOMY]: flight.remainingSeats[TicketClass.ECONOMY] < (quantityLimit || 0),
                [TicketClass.BUSINESS]: flight.remainingSeats[TicketClass.BUSINESS] < (quantityLimit || 0),
              }

        return <Flight key={index} flight={flight} disabled={disabled} onChange={onChange} />
      })
    )
    // }
    //   </div>
    // </div>
  )
}

export default FlightSelect
