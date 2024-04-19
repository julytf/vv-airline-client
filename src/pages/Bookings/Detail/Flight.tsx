import { FlightLegType } from '@/enums/flightLeg.enums'
import FlightLeg from './FlightLeg'
import classNames from 'classnames'
import { TicketClass, TicketType } from '@/enums/ticket.enums'
import IFlight from '@/interfaces/flight/flight.interface'
import { FunctionComponent, useState } from 'react'
import { differenceInDays, differenceInHours, differenceInMinutes, format } from 'date-fns'

interface FlightProps {
  flightInfo: { flight: IFlight; ticketClass: TicketClass; ticketType: TicketType; price: number }
}

const Flight: FunctionComponent<FlightProps> = ({ flightInfo }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const flight = flightInfo.flight
  console.log('flight', flight)

  const minuteDiff = differenceInMinutes(flight.arrivalTime, flight.departureTime) % 60
  const hourDiff = differenceInHours(flight.arrivalTime, flight.departureTime)

  const transitMinuteDiff =
    differenceInMinutes(
      flight?.flightLegs[FlightLegType.TRANSIT]?.departureTime,
      flight?.flightLegs[FlightLegType.DEPARTURE]?.arrivalTime,
    ) % 60
  const transitHourDiff = differenceInHours(
    flight?.flightLegs[FlightLegType.TRANSIT]?.departureTime,
    flight?.flightLegs[FlightLegType.DEPARTURE]?.arrivalTime,
  )

  const economyPrice = !flight.hasTransit
    ? Number(flight.flightRoute.prices[TicketClass.ECONOMY])
    : Number(flight?.flightLegs?.[FlightLegType.DEPARTURE]?.flightRoute?.prices[TicketClass.ECONOMY]) +
      Number(flight?.flightLegs?.[FlightLegType.TRANSIT]?.flightRoute?.prices[TicketClass.ECONOMY])

  const businessPrice = !flight.hasTransit
    ? Number(flight.flightRoute.prices[TicketClass.BUSINESS])
    : Number(flight?.flightLegs?.[FlightLegType.DEPARTURE]?.flightRoute?.prices[TicketClass.BUSINESS]) +
      Number(flight?.flightLegs?.[FlightLegType.TRANSIT]?.flightRoute?.prices[TicketClass.BUSINESS])

  return (
    <div className='w-full max-w-4xl rounded-md border-2 shadow-md'>
      <div className='relative grid grid-cols-12  gap-6 p-4'>
        <div className='col-span-7 border-r p-4'>
          <div className='flex justify-between'>
            <div className='flex flex-col items-center'>
              <div>
                <span className='text-2xl text-primary'>{format(flight.departureTime, 'HH:mm')}</span>{' '}
                <span className='text-'>{format(flight.departureTime, 'dd/MM/yyyy')}</span>
              </div>
              <span className='text-xl'>{flight.flightRoute.departureAirport.IATA}</span>
            </div>
            <div className='flex items-center justify-center'>
              <i className='fa-duotone fa-plane'></i>
            </div>
            <div className=' flex flex-col items-center'>
              <div>
                <span className='text-2xl text-primary'>{format(flight.arrivalTime, 'HH:mm')}</span>{' '}
                <span className='text-'>{format(flight.arrivalTime, 'dd/MM/yyyy')}</span>
              </div>
              <span className='text-xl'>{flight.flightRoute.arrivalAirport.IATA}</span>
            </div>
          </div>

          <div className='mt-1 flex justify-between gap-x-4'>
            <div className='flex flex-col gap-y-1 '>
              <div className='text-xs'>
                <span>
                  {`${hourDiff} tiếng `}
                  {Boolean(minuteDiff) && `${minuteDiff} phút`}
                </span>
                {flight.hasTransit && (
                  <span className='bold'>
                    {' '}
                    - Quá Cảnh ({flight?.flightLegs[FlightLegType.DEPARTURE]?.flightRoute?.arrivalAirport?.IATA})
                  </span>
                )}
              </div>
              <button className='inline-block' onClick={() => setIsExpanded((prev) => !prev)}>
                <span>Chi tiết </span>
                {isExpanded ? (
                  <i className='fa-solid fa-caret-up text-primary'></i>
                ) : (
                  <i className='fa-solid fa-caret-down text-primary'></i>
                )}
              </button>
            </div>
            <div className='flex flex-col items-end'>
              <span className='bold text-xs'>
                {flight?.flightLegs[FlightLegType.DEPARTURE]?.aircraft?.name} -{' '}
                {flight?.flightLegs[FlightLegType.DEPARTURE]?.aircraft?.aircraftModel?.name}
              </span>
              {flight.hasTransit && (
                <span className='bold text-xs'>
                  {flight?.flightLegs[FlightLegType.TRANSIT]?.aircraft?.name} -{' '}
                  {flight?.flightLegs[FlightLegType.TRANSIT]?.aircraft?.aircraftModel?.name}
                </span>
              )}
            </div>
          </div>
        </div>
        {/* TODO: */}
        <div className='relative col-span-5 flex flex-col items-center justify-center gap-4'>
          <span className='bold text-2xl text-yellow-400'>
            <span>
              {flightInfo.ticketClass === TicketClass.ECONOMY && 'PHỔ THÔNG'}
              {flightInfo.ticketClass === TicketClass.BUSINESS && 'THƯƠNG GIA'}
            </span>{' '}
            <span>
              {flightInfo.ticketType === TicketType.BUDGET && 'TIẾT KIỆM'}
              {flightInfo.ticketType === TicketType.STANDARD && 'TIÊU CHUẨN'}
              {flightInfo.ticketType === TicketType.FLEXIBLE && 'LINH HOẠT'}
            </span>
          </span>
          <span className=''>{flightInfo.price.toLocaleString()} vnđ</span>
        </div>
      </div>
      <div
        className={classNames('flex flex-col gap-12 border-t bg-gray-50 p-16', {
          hidden: !isExpanded,
        })}
      >
        <FlightLeg flightLeg={flight.flightLegs[FlightLegType.DEPARTURE]} />
        {flight.hasTransit && (
          <>
            <div>
              <span className='rounded-full border-2 border-primary bg-sky-50 p-4 px-6'>
                Thời gian nối chuyến: {`${transitHourDiff} tiếng `}
                {Boolean(transitMinuteDiff) && `${transitMinuteDiff} phút`}
              </span>
            </div>
            <FlightLeg flightLeg={flight.flightLegs[FlightLegType.TRANSIT]} />
          </>
        )}
      </div>
    </div>
  )
}

export default Flight
