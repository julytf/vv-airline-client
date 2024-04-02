import { FlightLegType } from '@/enums/flightLeg.enums'
import FlightLeg from './FlightLeg'
import classNames from 'classnames'
import { SeatClass } from '@/enums/seat.enums'
import IFlight from '@/interfaces/flight/flight.interface'
import { FunctionComponent, useState } from 'react'
import { differenceInHours, differenceInMinutes, format } from 'date-fns'

interface SelectedFlightProps {
  selectedFlightInfo: { flight: IFlight; seatClass: SeatClass }
  onChange?: (info: { flight: IFlight; seatClass: SeatClass } | null) => void
}

const SelectedFlight: FunctionComponent<SelectedFlightProps> = ({ selectedFlightInfo, onChange }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const flight = selectedFlightInfo.flight

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
    ? Number(flight.flightRoute.prices[SeatClass.ECONOMY])
    : Number(flight?.flightLegs?.[FlightLegType.DEPARTURE]?.flightRoute?.prices[SeatClass.ECONOMY]) +
      Number(flight?.flightLegs?.[FlightLegType.TRANSIT]?.flightRoute?.prices[SeatClass.ECONOMY])

  const businessPrice = !flight.hasTransit
    ? Number(flight.flightRoute.prices[SeatClass.BUSINESS])
    : Number(flight?.flightLegs?.[FlightLegType.DEPARTURE]?.flightRoute?.prices[SeatClass.BUSINESS]) +
      Number(flight?.flightLegs?.[FlightLegType.TRANSIT]?.flightRoute?.prices[SeatClass.BUSINESS])

  return (
    <div className={classNames('w-full', {})}>
      <div className='relative grid grid-cols-12  gap-6 p-4'>
        <div className='col-span-4'>
          <div className='flex justify-between'>
            <div className='flex flex-col items-center'>
              <span className='text-2xl text-primary'>{format(flight.departureTime, 'HH:mm')}</span>
              <span className='text-xl'>{flight.flightRoute.departureAirport.IATA}</span>
            </div>
            <div className='flex items-center justify-center'>
              <i className='fa-duotone fa-plane'></i>
            </div>
            <div className=' flex flex-col items-center'>
              <span className='text-2xl text-primary'>{format(flight.arrivalTime, 'HH:mm')}</span>
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
        <div className='relative col-span-8 flex justify-center gap-4'>
          {selectedFlightInfo.seatClass === SeatClass.ECONOMY && (
            <div
              className={classNames(
                'col-span-3 flex w-1/2 items-center justify-center rounded-md border border-blue-400 bg-blue-100',
                {},
              )}
            >
              <div className='flex flex-col items-center justify-center'>
                <span>PHỔ THÔNG</span>
                <div className='flex justify-center'>
                  <span className='bold text-3xl'>{economyPrice.toLocaleString()}</span>
                  <span>VNĐ</span>
                </div>
                <span>Còn {flight.remainingSeats[SeatClass.ECONOMY]} ghế</span>
              </div>
            </div>
          )}
          {selectedFlightInfo.seatClass === SeatClass.BUSINESS && (
            <div
              className={classNames(
                'col-span-3  flex w-1/2 items-center justify-center rounded-md border border-yellow-400 bg-yellow-100 ',
                {},
              )}
            >
              <div className='flex flex-col items-center justify-center'>
                <span>THƯƠNG GIA</span>
                <div className='flex justify-center'>
                  <span className='bold text-3xl'>{businessPrice.toLocaleString()}</span>
                  <span>VNĐ</span>
                </div>
                <span>Còn {flight.remainingSeats[SeatClass.BUSINESS]} ghế</span>
              </div>
            </div>
          )}
          <button onClick={() => onChange?.(null)} className='absolute right-0 p-10 text-gray-400 active:scale-95'>
            Hủy
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

export default SelectedFlight
