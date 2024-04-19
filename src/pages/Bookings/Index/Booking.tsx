import { FlightType } from '@/enums/flight.enums'
import { PassengerType } from '@/enums/passenger.enums'
import IBooking from '@/interfaces/booking/booking.interface'
import { format } from 'date-fns'
import { FunctionComponent } from 'react'

interface BookingProps {
  booking: IBooking
}

const Booking: FunctionComponent<BookingProps> = ({ booking }) => {
  const outboundFlight = booking.flightsInfo[FlightType.OUTBOUND].flight
  const inboundFlight = booking?.flightsInfo?.[FlightType.INBOUND]?.flight

  return (
    <div className='mx-auto grid grid-cols-12 rounded border-2 shadow-md hover:shadow-lg'>
      <div className='col-span-9 flex flex-col justify-between gap-y-4 border-r p-8'>
        <div className=' flex justify-between'>
          <div className='flex flex-col items-center justify-center'>
            <span className='bold text-2xl'>{outboundFlight.flightRoute.departureAirport.IATA}</span>
            <span className=''>{format(outboundFlight.departureTime, 'hh:mm dd/MM/yyyy')}</span>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <i className='fa-duotone fa-plane'></i>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <span className='bold text-2xl'>{outboundFlight.flightRoute.arrivalAirport.IATA}</span>
            <span className=''>{format(outboundFlight.arrivalTime, 'hh:mm dd/MM/yyyy')}</span>
          </div>
        </div>
        {inboundFlight && (
          <div className=' flex justify-between'>
            <div className='flex flex-col items-center justify-center'>
              <span className='bold text-2xl'>{inboundFlight.flightRoute.departureAirport.IATA}</span>
              <span className=''>{format(inboundFlight.departureTime, 'hh:mm dd/MM/yyyy')}</span>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <i className='fa-duotone fa-plane'></i>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <span className='bold text-2xl'>{inboundFlight.flightRoute.arrivalAirport.IATA}</span>
              <span className=''>{format(inboundFlight.arrivalTime, 'hh:mm dd/MM/yyyy')}</span>
            </div>
          </div>
        )}
      </div>
      <div className='col-span-3 p-8'>
        <div>{booking.passengersQuantity[PassengerType.ADULT]} Người lớn</div>
        <div>{booking.passengersQuantity[PassengerType.CHILD]} Trẻ em</div>
      </div>
    </div>
  )
}

export default Booking
