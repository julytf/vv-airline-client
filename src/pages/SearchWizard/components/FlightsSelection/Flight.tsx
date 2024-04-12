import { FlightLegType } from '@/enums/flightLeg.enums'
import { SeatClass } from '@/enums/seat.enums'
import classNames from 'classnames'
import FlightLeg from './FlightLeg'
import { differenceInDays, differenceInHours, differenceInMinutes, format, startOfDay } from 'date-fns'
import { FunctionComponent, useState } from 'react'
import IFlight from '@/interfaces/flight/flight.interface'

interface FlightProps {
  flight: IFlight
  disabled?: {
    [SeatClass.ECONOMY]: boolean
    [SeatClass.BUSINESS]: boolean
  }
  onChange?: (info: { flight: IFlight; seatClass: SeatClass; price: number } | null) => void
}

const Flight: FunctionComponent<FlightProps> = ({ flight, disabled, onChange }) => {
  const [isExpanded, setIsExpanded] = useState(false)

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

  const dayDiff = differenceInDays(startOfDay(flight.arrivalTime), startOfDay(flight.departureTime))

  const economyPrice = !flight.hasTransit
    ? Number(flight.flightRoute.prices[SeatClass.ECONOMY])
    : Number(flight?.flightLegs?.[FlightLegType.DEPARTURE]?.flightRoute?.prices[SeatClass.ECONOMY]) +
      Number(flight?.flightLegs?.[FlightLegType.TRANSIT]?.flightRoute?.prices[SeatClass.ECONOMY])

  const businessPrice = !flight.hasTransit
    ? Number(flight.flightRoute.prices[SeatClass.BUSINESS])
    : Number(flight?.flightLegs?.[FlightLegType.DEPARTURE]?.flightRoute?.prices[SeatClass.BUSINESS]) +
      Number(flight?.flightLegs?.[FlightLegType.TRANSIT]?.flightRoute?.prices[SeatClass.BUSINESS])

  // console.log('economyPrice', economyPrice)
  // console.log('businessPrice', businessPrice)

  return (
    <div className={classNames('w-full rounded-md border-2 shadow-md ', {})}>
      <div className='grid grid-cols-6 gap-6  p-4'>
        <div className='col-span-2'>
          <div className='flex justify-between'>
            <div className='flex flex-col items-center'>
              <span className='text-2xl text-primary'>{format(flight.departureTime, 'HH:mm')}</span>
              <span className='text-xl'>{flight.flightRoute.departureAirport.IATA}</span>
            </div>
            <div className='flex items-center justify-center'>
              <i className='fa-duotone fa-plane'></i>
            </div>
            <div className=' flex flex-col items-center'>
              <div>
                <span className='text-2xl text-primary'>{format(flight.arrivalTime, 'HH:mm')}</span>{' '}
                {dayDiff !== 0 && <span className=''>(+{dayDiff} ngày)</span>}
              </div>
              <span className='text-xl'>{flight.flightRoute.arrivalAirport.IATA}</span>
            </div>
          </div>

          <div className='mt-1 flex justify-between gap-x-4'>
            <div className='flex flex-1 flex-col gap-y-1'>
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
        <div className='col-span-4 grid grid-cols-6 gap-4'>
          <button
            onClick={() => onChange?.({ flight, seatClass: SeatClass.ECONOMY, price: economyPrice })}
            disabled={disabled?.[SeatClass.ECONOMY]}
            className={classNames('col-span-3 flex items-center justify-center rounded-md border  active:scale-95', {
              'border-blue-400 bg-blue-100': !disabled?.[SeatClass.ECONOMY],
              'border-gray-300 bg-gray-100 text-gray-500': disabled?.[SeatClass.ECONOMY],
            })}
          >
            <div className='flex flex-col justify-center'>
              <span>PHỔ THÔNG</span>
              <div className='flex justify-start'>
                <span className='bold text-3xl'>{economyPrice.toLocaleString()}</span>
                <span>VNĐ</span>
              </div>
              <span>Còn {flight.remainingSeats[SeatClass.ECONOMY]} ghế</span>
            </div>
          </button>
          <button
            onClick={() => onChange?.({ flight, seatClass: SeatClass.BUSINESS, price: businessPrice })}
            disabled={disabled?.[SeatClass.BUSINESS]}
            className={classNames('col-span-3 flex items-center justify-center rounded-md border  active:scale-95', {
              'border-yellow-400 bg-yellow-100': !disabled?.[SeatClass.BUSINESS],
              'border-gray-300 bg-gray-100 text-gray-500': disabled?.[SeatClass.BUSINESS],
            })}
          >
            <div className='flex flex-col justify-center'>
              <span>THƯƠNG GIA</span>
              <div className='flex justify-start'>
                <span className='bold text-3xl'>{businessPrice.toLocaleString()}</span>
                <span>VNĐ</span>
              </div>
              <span>Còn {flight.remainingSeats[SeatClass.BUSINESS]} ghế</span>
            </div>
          </button>
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
