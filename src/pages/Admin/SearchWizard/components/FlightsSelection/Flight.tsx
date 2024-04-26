import { FlightLegType } from '@/enums/flightLeg.enums'
import { TicketClass, TicketType } from '@/enums/ticket.enums'
import classNames from 'classnames'
import FlightLeg from './FlightLeg'
import { differenceInDays, differenceInHours, differenceInMinutes, format, startOfDay } from 'date-fns'
import { FunctionComponent, useState } from 'react'
import IFlight from '@/interfaces/flight/flight.interface'

interface FlightProps {
  flight: IFlight
  disabled?: {
    [TicketClass.ECONOMY]: boolean
    [TicketClass.BUSINESS]: boolean
  }
  onChange?: (info: { flight: IFlight; ticketClass: TicketClass; ticketType: TicketType; price: number } | null) => void
}

const Flight: FunctionComponent<FlightProps> = ({ flight, disabled, onChange }) => {
  const [isFlightDetailExpanded, _setIsFlightDetailExpanded] = useState(false)
  const [isTicketDetailExpanded, _setIsTicketDetailExpanded] = useState(false)
  const [chosenClass, setChosenClass] = useState<TicketClass | null>(null)

  const setIsFlightDetailExpanded = (value: boolean) => {
    _setIsFlightDetailExpanded(value)
    _setIsTicketDetailExpanded(isTicketDetailExpanded && !value)
  }
  const setIsTicketDetailExpanded = (value: boolean) => {
    _setIsTicketDetailExpanded(value)
    _setIsFlightDetailExpanded(isFlightDetailExpanded && !value)
  }

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

  const economyBudgetPrice = !flight.hasTransit
    ? Number(flight.flightRoute.prices[TicketClass.ECONOMY][TicketType.BUDGET])
    : Number(
        flight?.flightLegs?.[FlightLegType.DEPARTURE]?.flightRoute?.prices[TicketClass.ECONOMY][TicketType.BUDGET],
      ) +
      Number(flight?.flightLegs?.[FlightLegType.TRANSIT]?.flightRoute?.prices[TicketClass.ECONOMY][TicketType.BUDGET])
  const economyStandardPrice = !flight.hasTransit
    ? Number(flight.flightRoute.prices[TicketClass.ECONOMY][TicketType.STANDARD])
    : Number(
        flight?.flightLegs?.[FlightLegType.DEPARTURE]?.flightRoute?.prices[TicketClass.ECONOMY][TicketType.STANDARD],
      ) +
      Number(flight?.flightLegs?.[FlightLegType.TRANSIT]?.flightRoute?.prices[TicketClass.ECONOMY][TicketType.STANDARD])
  const economyFlexiblePrice = !flight.hasTransit
    ? Number(flight.flightRoute.prices[TicketClass.ECONOMY][TicketType.FLEXIBLE])
    : Number(
        flight?.flightLegs?.[FlightLegType.DEPARTURE]?.flightRoute?.prices[TicketClass.ECONOMY][TicketType.FLEXIBLE],
      ) +
      Number(flight?.flightLegs?.[FlightLegType.TRANSIT]?.flightRoute?.prices[TicketClass.ECONOMY][TicketType.FLEXIBLE])

  const minEconomyPrice = Math.min(economyBudgetPrice, economyStandardPrice, economyFlexiblePrice)

  const businessStandardPrice = !flight.hasTransit
    ? Number(flight.flightRoute.prices[TicketClass.BUSINESS][TicketType.STANDARD])
    : Number(
        flight?.flightLegs?.[FlightLegType.DEPARTURE]?.flightRoute?.prices[TicketClass.BUSINESS][TicketType.STANDARD],
      ) +
      Number(
        flight?.flightLegs?.[FlightLegType.TRANSIT]?.flightRoute?.prices[TicketClass.BUSINESS][TicketType.STANDARD],
      )
  const businessFlexiblePrice = !flight.hasTransit
    ? Number(flight.flightRoute.prices[TicketClass.BUSINESS][TicketType.FLEXIBLE])
    : Number(
        flight?.flightLegs?.[FlightLegType.DEPARTURE]?.flightRoute?.prices[TicketClass.BUSINESS][TicketType.FLEXIBLE],
      ) +
      Number(
        flight?.flightLegs?.[FlightLegType.TRANSIT]?.flightRoute?.prices[TicketClass.BUSINESS][TicketType.FLEXIBLE],
      )
  const minBusinessPrice = Math.min(businessStandardPrice, businessFlexiblePrice)

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
              <button className='inline-block' onClick={() => setIsFlightDetailExpanded(!isFlightDetailExpanded)}>
                <span>Chi tiết </span>
                {isFlightDetailExpanded ? (
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
            onClick={() => {
              setIsTicketDetailExpanded(chosenClass !== TicketClass.ECONOMY || !isTicketDetailExpanded)
              setChosenClass(TicketClass.ECONOMY)
            }}
            // onClick={() => onChange?.({ flight, ticketClass: TicketClass.ECONOMY, price: economyPrice })}
            disabled={disabled?.[TicketClass.ECONOMY]}
            className={classNames(
              'col-span-3 flex items-center justify-center rounded-md border  p-2 active:scale-95',
              {
                'border-blue-400 bg-blue-100': !disabled?.[TicketClass.ECONOMY],
                'border-gray-300 bg-gray-100 text-gray-500': disabled?.[TicketClass.ECONOMY],
              },
            )}
          >
            <div className='flex flex-col justify-center'>
              <span>PHỔ THÔNG</span>
              <div className='flex justify-start gap-2'>
                từ
                <span>
                  <span className='bold text-3xl'>{minEconomyPrice.toLocaleString()}</span>
                  <span>VNĐ</span>
                </span>
              </div>
              <span>Còn {flight.remainingSeats[TicketClass.ECONOMY]} ghế</span>
              <span
                className={classNames({
                  'rotate-180': isTicketDetailExpanded && chosenClass === TicketClass.ECONOMY,
                })}
              >
                <i className='fa-solid fa-angle-down'></i>
              </span>
            </div>
          </button>
          <button
            onClick={() => {
              setIsTicketDetailExpanded(chosenClass !== TicketClass.BUSINESS || !isTicketDetailExpanded)
              setChosenClass(TicketClass.BUSINESS)
            }}
            // onClick={() => onChange?.({ flight, ticketClass: TicketClass.BUSINESS, price: businessPrice })}
            disabled={disabled?.[TicketClass.BUSINESS]}
            className={classNames(
              'col-span-3 flex items-center justify-center rounded-md border  p-2 active:scale-95',
              {
                'border-yellow-400 bg-yellow-100': !disabled?.[TicketClass.BUSINESS],
                'border-gray-300 bg-gray-100 text-gray-500': disabled?.[TicketClass.BUSINESS],
              },
            )}
          >
            <div className='flex flex-col justify-center'>
              <span>THƯƠNG GIA</span>
              <div className='flex justify-start gap-2'>
                từ
                <span>
                  <span className='bold text-3xl'>{minBusinessPrice.toLocaleString()}</span>
                  <span>VNĐ</span>
                </span>
              </div>
              <span>Còn {flight.remainingSeats[TicketClass.BUSINESS]} ghế</span>
              <span
                className={classNames({
                  'rotate-180': isTicketDetailExpanded && chosenClass === TicketClass.BUSINESS,
                })}
              >
                <i className='fa-solid fa-angle-down'></i>
              </span>
            </div>
          </button>
        </div>
      </div>
      <div
        className={classNames('flex flex-col gap-12 border-t bg-gray-50 p-16', {
          hidden: !isFlightDetailExpanded,
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

      <div
        className={classNames('flex items-center justify-center gap-12 border-t bg-gray-50 p-16', {
          hidden: !isTicketDetailExpanded || chosenClass !== TicketClass.ECONOMY,
        })}
      >
        <button
          onClick={() =>
            onChange?.({
              flight,
              ticketClass: TicketClass.ECONOMY,
              ticketType: TicketType.STANDARD,
              price: economyBudgetPrice,
            })
          }
          className='overflow-hidden bg-white '
        >
          <div className='bold rounded-t border border-blue-400 bg-blue-100 p-4 text-center'>Phổ Thông Tiết Kiệm</div>
          <div className='border-x border-b p-4  text-center'>{economyBudgetPrice.toLocaleString()} vnđ</div>
          <div className='rounded-b border-x border-b p-4'>
            <p>
              <span className='bold'>Hành lý xách tay: </span> 01 kiện 18kg.
            </p>
            <p>
              <span className='bold'>Hành lý ký gửi: </span> 01 kiện 32kg.
            </p>
          </div>
        </button>
        <button
          onClick={() =>
            onChange?.({
              flight,
              ticketClass: TicketClass.ECONOMY,
              ticketType: TicketType.BUDGET,
              price: economyStandardPrice,
            })
          }
          className='overflow-hidden bg-white '
        >
          <div className='bold rounded-t border border-blue-400 bg-blue-100 p-4 text-center'>Phổ Thông Tiêu Chuẩn</div>
          <div className='border-x border-b p-4  text-center'>{economyStandardPrice.toLocaleString()} vnđ</div>
          <div className='rounded-b border-x border-b p-4'>
            <p>
              <span className='bold'>Hành lý xách tay: </span> 01 kiện 18kg.
            </p>
            <p>
              <span className='bold'>Hành lý ký gửi: </span> 01 kiện 32kg.
            </p>
          </div>
        </button>
        <button
          onClick={() =>
            onChange?.({
              flight,
              ticketClass: TicketClass.ECONOMY,
              ticketType: TicketType.BUDGET,
              price: economyFlexiblePrice,
            })
          }
          className='overflow-hidden bg-white '
        >
          <div className='bold rounded-t border border-blue-400 bg-blue-100 p-4 text-center'>Phổ Thông Linh Hoạt</div>
          <div className='border-x border-b p-4  text-center'>{economyFlexiblePrice.toLocaleString()} vnđ</div>
          <div className='rounded-b border-x border-b p-4'>
            <p>
              <span className='bold'>Hành lý xách tay: </span> 01 kiện 18kg.
            </p>
            <p>
              <span className='bold'>Hành lý ký gửi: </span> 01 kiện 32kg.
            </p>
          </div>
        </button>
      </div>
      <div
        className={classNames('flex items-center justify-center gap-12 border-t bg-gray-50 p-16', {
          hidden: !isTicketDetailExpanded || chosenClass !== TicketClass.BUSINESS,
        })}
      >
        <button
          onClick={() =>
            onChange?.({
              flight,
              ticketClass: TicketClass.BUSINESS,
              ticketType: TicketType.STANDARD,
              price: businessStandardPrice,
            })
          }
          className='overflow-hidden bg-white '
        >
          <div className='bold rounded-t border border-yellow-400 bg-yellow-100 p-4 text-center'>
            Phổ Thông Tiêu Chuẩn
          </div>
          <div className='border-x border-b p-4  text-center'>{businessStandardPrice.toLocaleString()} vnđ</div>
          <div className='rounded-b border-x border-b p-4'>
            <p>
              <span className='bold'>Hành lý xách tay: </span> 01 kiện 18kg.
            </p>
            <p>
              <span className='bold'>Hành lý ký gửi: </span> 01 kiện 32kg.
            </p>
          </div>
        </button>
        <button
          onClick={() =>
            onChange?.({
              flight,
              ticketClass: TicketClass.BUSINESS,
              ticketType: TicketType.FLEXIBLE,
              price: businessFlexiblePrice,
            })
          }
          className='overflow-hidden bg-white '
        >
          <div className='bold rounded-t border border-yellow-400 bg-yellow-100 p-4 text-center'>
            Phổ Thông Linh Hoạt
          </div>
          <div className='border-x border-b p-4  text-center'>{businessFlexiblePrice.toLocaleString()} vnđ</div>
          <div className='rounded-b border-x border-b p-4'>
            <p>
              <span className='bold'>Hành lý xách tay: </span> 01 kiện 18kg.
            </p>
            <p>
              <span className='bold'>Hành lý ký gửi: </span> 01 kiện 32kg.
            </p>
          </div>
        </button>
      </div>
    </div>
  )
}

export default Flight
