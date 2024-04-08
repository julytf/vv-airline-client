import IFlightLeg from '@/interfaces/flight/flightLeg.interface'
import { differenceInHours, differenceInMinutes, format } from 'date-fns'
import { FunctionComponent } from 'react'

interface FlightLegProps {
  flightLeg: IFlightLeg
}

const FlightLeg: FunctionComponent<FlightLegProps> = ({ flightLeg }) => {
  const minuteDiff = differenceInMinutes(flightLeg.arrivalTime, flightLeg.departureTime) % 60
  const hourDiff = differenceInHours(flightLeg.arrivalTime, flightLeg.departureTime)

  return (
    <div>
      <div className='flex gap-x-6'>
        <div className='flex flex-col items-center'>
          <div>
            <div className='flex aspect-square w-12 items-center justify-center rounded-full border border-primary text-primary'>
              <i className='fa-light fa-plane-departure'></i>
            </div>
          </div>
          <div className='h-full w-0 border border-primary'></div>
        </div>
        <div className='pb-8'>
          <div className='flex flex-col '>
            <span className='text-2xl text-primary'>
              {format(flightLeg.departureTime, 'dd/MM/yyyy, HH:mm')} {flightLeg?.flightRoute?.departureAirport?.city}
            </span>
            <span className='text-lg'>
              {flightLeg?.flightRoute?.departureAirport?.IATA},{' '}
              {flightLeg?.flightRoute?.departureAirport?.country?.name}
            </span>
          </div>
          <div className='mt-4 flex flex-col gap-y-2 text-sm'>
            <div>
              <span className='bold'>Máy bay: </span>
              <span>{flightLeg.aircraft.name}</span>
            </div>
            <div>
              <span className='bold'>Thời gian bay: </span>
              <span>
                {`${hourDiff} tiếng `}
                {Boolean(minuteDiff) && `${minuteDiff} phút`}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='flex gap-x-6'>
        <div className='flex flex-col items-center'>
          <div>
            <div className='flex aspect-square w-12 items-center justify-center rounded-full border border-primary text-primary'>
              <i className='fa-light fa-plane-arrival'></i>
            </div>
          </div>
        </div>
        <div>
          <div className='flex flex-col '>
            <span className='text-2xl text-primary'>
              {format(flightLeg.arrivalTime, 'dd/MM/yyyy, HH:mm')} {flightLeg?.flightRoute?.arrivalAirport?.city}
            </span>
            <span className='text-lg'>
              {flightLeg?.flightRoute?.arrivalAirport?.IATA}, {flightLeg?.flightRoute?.arrivalAirport?.country?.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlightLeg
