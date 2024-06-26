import { SeatsData, useSearchWizard } from '@/contexts/SearchWizard.context'
import { FlightType } from '@/enums/flight.enums'
import { FlightLegType } from '@/enums/flightLeg.enums'
import { PassengerType } from '@/enums/passenger.enums'
import { TicketClass } from '@/enums/ticket.enums'
import ISeat from '@/interfaces/aircraft/seat.interface'
import IFlight from '@/interfaces/flight/flight.interface'
import IFlightLeg from '@/interfaces/flight/flightLeg.interface'
import IMealPlan from '@/interfaces/flight/mealPlan.interface'
import mealPlansService from '@/services/mealPlans.service'
import classNames from 'classnames'
import { differenceInHours, differenceInMinutes, format } from 'date-fns'
import { FunctionComponent, PropsWithChildren, ReactNode, useEffect, useState } from 'react'
import Loading from '../ui/Loading'

interface PaymentSummaryCardProps {
  className?: string
  seatsData?: SeatsData
}

const PaymentSummaryCard: FunctionComponent<PaymentSummaryCardProps> = ({ className, seatsData }) => {
  const { data } = useSearchWizard()
  const [mealPlans, setMealPlans] = useState<IMealPlan[]>([])

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    mealPlansService.getMealPlans().then((data) => {
      setMealPlans(data)
      setIsLoading(false)
    })
  }, [])

  const totalPassengers =
    data.searchData.passengersQuantity[PassengerType.ADULT] + data.searchData.passengersQuantity[PassengerType.CHILD]

  const outboundFlight = data.flightsData[FlightType.OUTBOUND]!.flight
  const outboundTicketClass = data.flightsData[FlightType.OUTBOUND]!.ticketClass
  const outboundPrice = data.flightsData[FlightType.OUTBOUND]!.price
  const inboundFlight = data.flightsData[FlightType.INBOUND]?.flight
  const inboundTicketClass = data.flightsData[FlightType.INBOUND]?.ticketClass
  const inboundPrice = data.flightsData[FlightType.INBOUND]?.price

  const allSelectedSeats = [
    ...(seatsData?.[FlightType.OUTBOUND]?.[FlightLegType.DEPARTURE]?.[PassengerType.ADULT] || []),
    ...(seatsData?.[FlightType.OUTBOUND]?.[FlightLegType.DEPARTURE]?.[PassengerType.CHILD] || []),
    ...(seatsData?.[FlightType.OUTBOUND]?.[FlightLegType.TRANSIT]?.[PassengerType.ADULT] || []),
    ...(seatsData?.[FlightType.OUTBOUND]?.[FlightLegType.TRANSIT]?.[PassengerType.CHILD] || []),
    ...(seatsData?.[FlightType.INBOUND]?.[FlightLegType.DEPARTURE]?.[PassengerType.ADULT] || []),
    ...(seatsData?.[FlightType.INBOUND]?.[FlightLegType.DEPARTURE]?.[PassengerType.CHILD] || []),
    ...(seatsData?.[FlightType.INBOUND]?.[FlightLegType.TRANSIT]?.[PassengerType.ADULT] || []),
    ...(seatsData?.[FlightType.INBOUND]?.[FlightLegType.TRANSIT]?.[PassengerType.CHILD] || []),
  ]
  console.log('reload payment summary card')

  let totalSeatsCharge = 0

  allSelectedSeats.forEach((seat) => {
    // console.log(seat)
    if (!seat) return
    const seatCharge =
      data.additionalData.surcharges?.find((surcharge) => surcharge.name === `SeatType.${seat.seat.seatType}`)?.value ||
      0

    totalSeatsCharge += seatCharge
  })

  let totalServicesCharge = 0

  allSelectedSeats.forEach((seat) => {
    if (!seat) return
    totalServicesCharge += (seat?.services?.baggage?.charge || 0) + (seat?.services?.meal?.charge || 0)
  })

  const totalPrice = (outboundPrice + (inboundPrice || 0)) * totalPassengers + totalSeatsCharge + totalServicesCharge

  console.log('outboundPrice', outboundPrice)
  console.log('inboundPrice', inboundPrice)
  console.log('totalPassengers', totalPassengers)
  console.log('totalSeatsCharge', totalSeatsCharge)
  console.log('totalServicesCharge', totalServicesCharge)
  // du lieu seat chi nam trong step seats Selection, card ko xem dc @ _ @

  if (isLoading) return <Loading />

  return (
    <div className={classNames('w-96 bg-white', className)}>
      <div className=' overflow-hidden rounded-md shadow-md'>
        <div className='bg-primary p-6 px-8'>
          <span className='text-xl'>Chi Tiết Đặt Vé</span>
        </div>
        <div className=' '>
          <Flight
            flight={outboundFlight}
            ticketClass={outboundTicketClass}
            price={outboundPrice}
            totalPassengers={totalPassengers}
          />
          <div className='mx-4 border-t'></div>
          {inboundFlight && (
            <>
              <Flight
                flight={inboundFlight}
                ticketClass={inboundTicketClass!}
                price={inboundPrice!}
                totalPassengers={totalPassengers}
              />
              <div className='mx-4 border-t'></div>
            </>
          )}
          {seatsData && (
            <>
              <Row
                title={
                  <div className='flex w-full justify-between'>
                    <div>
                      <span className='pr-4'>
                        <i className='fa-duotone fa-person-seat-reclined'></i>
                      </span>
                      <span>Chỗ ngồi</span>
                    </div>
                    <div className='flex items-start'>
                      <span>{totalSeatsCharge.toLocaleString() || 0}</span>
                      <span className='text-xs'>VNĐ</span>
                    </div>
                  </div>
                }
              >
                <div className='flex flex-col gap-y-4 px-4 pt-4 text-sm'>
                  <FlightSeatDetail
                    flight={outboundFlight}
                    seatsData={seatsData[FlightType.OUTBOUND][FlightLegType.DEPARTURE]}
                    passengers={data.searchData.passengersQuantity}
                  />

                  {outboundFlight.hasTransit && (
                    <FlightSeatDetail
                      flight={outboundFlight}
                      seatsData={seatsData[FlightType.INBOUND][FlightLegType.TRANSIT]}
                      passengers={data.searchData.passengersQuantity}
                    />
                  )}

                  {inboundFlight && (
                    <FlightSeatDetail
                      flight={inboundFlight}
                      seatsData={seatsData[FlightType.INBOUND][FlightLegType.DEPARTURE]}
                      passengers={data.searchData.passengersQuantity}
                    />
                  )}

                  {inboundFlight?.hasTransit && (
                    <FlightSeatDetail
                      flight={inboundFlight}
                      seatsData={seatsData[FlightType.INBOUND][FlightLegType.TRANSIT]}
                      passengers={data.searchData.passengersQuantity}
                    />
                  )}

                  {/* <div>
                    <div className='bold'>
                      <span>HN</span>
                      <span className='px-4'>
                        <i className='fa-solid fa-arrow-right'></i>
                      </span>
                      <span>Paris</span>
                    </div>
                    <div className='pl-4 pt-2 text-sm'>
                      <div className='flex justify-between'>
                        <div>
                          <span className='bold mr-4'>A1</span>
                          <span>---</span>
                        </div>
                      </div>
                      <div className='flex justify-between'>
                        <div>
                          <span className='bold mr-4'>A2</span>
                          <span> 12C </span>
                        </div>
                        <div className='flex items-start'>
                          <span>340.000</span>
                          <span className='text-xs'>VNĐ</span>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </Row>
              <div className='mx-4 border-t'></div>
            </>
          )}
          {seatsData && (
            <Row
              title={
                <div className='flex w-full justify-between'>
                  <div>
                    <span className='pr-4'>
                      <i className='fa-duotone fa-briefcase'></i>
                    </span>
                    <span>Dịch vụ bổ trợ</span>
                  </div>
                  <div className='flex items-start'>
                    <span>{totalServicesCharge.toLocaleString() || 0}</span>
                    <span className='text-xs'>VNĐ</span>
                  </div>
                </div>
              }
            >
              <div className='flex flex-col gap-y-4 px-4 pt-4 text-sm'>
                <ServiceDetail
                  flight={outboundFlight}
                  seatsData={seatsData[FlightType.OUTBOUND][FlightLegType.DEPARTURE]}
                  passengers={data.searchData.passengersQuantity}
                  mealPlans={mealPlans}
                />

                {outboundFlight.hasTransit && (
                  <ServiceDetail
                    flight={outboundFlight}
                    seatsData={seatsData[FlightType.INBOUND][FlightLegType.TRANSIT]}
                    passengers={data.searchData.passengersQuantity}
                    mealPlans={mealPlans}
                  />
                )}

                {inboundFlight && (
                  <ServiceDetail
                    flight={inboundFlight}
                    seatsData={seatsData[FlightType.INBOUND][FlightLegType.DEPARTURE]}
                    passengers={data.searchData.passengersQuantity}
                    mealPlans={mealPlans}
                  />
                )}

                {inboundFlight?.hasTransit && (
                  <ServiceDetail
                    flight={inboundFlight}
                    seatsData={seatsData[FlightType.INBOUND][FlightLegType.TRANSIT]}
                    passengers={data.searchData.passengersQuantity}
                    mealPlans={mealPlans}
                  />
                )}
              </div>
            </Row>
          )}
          <div className='mx-4 border-t'></div>
        </div>
        <div className='flex justify-between p-8'>
          <span className='text-lg'>Tổng tiền:</span>
          <div className='flex items-start'>
            <span className='text-2xl'>{totalPrice.toLocaleString() || 0}</span>
            <span className='text-xs'>VNĐ</span>
          </div>
        </div>
      </div>
    </div>
  )
}

interface RowProps extends PropsWithChildren {
  title?: ReactNode
}

const Row: FunctionComponent<RowProps> = ({ children, title }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  return (
    <div className=''>
      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        className={classNames('flex w-full justify-between p-4', {
          'bg-gray-100': isExpanded,
        })}
      >
        {title}
        <div className='pl-4'>
          {isExpanded ? <i className='fa-regular fa-angle-up'></i> : <i className='fa-regular fa-angle-down'></i>}
        </div>
      </button>
      {isExpanded && <div className='p-4 pt-0'>{children}</div>}
    </div>
  )
}

interface FlightProps {
  flight: IFlight
  ticketClass: TicketClass
  price: number
  totalPassengers: number
}

const Flight: FunctionComponent<FlightProps> = ({ flight, ticketClass, price, totalPassengers }) => {
  const departureFlightLeg = flight.flightLegs[FlightLegType.DEPARTURE]
  const transitFlightLeg = flight.flightLegs[FlightLegType.TRANSIT]

  // const totalPrice =
  //   flight.flightLegs[FlightLegType.DEPARTURE].flightRoute.prices[ticketClass] +
  //   (flight.flightLegs[FlightLegType.TRANSIT]?.flightRoute.prices[ticketClass] || 0)

  return (
    <Row
      title={
        <div className='flex w-full justify-between'>
          <div className='pr-4'>
            <span className='pr-4'>
              <i className='fa-duotone fa-plane'></i>
            </span>
            <span>{flight.flightRoute.departureAirport.IATA}</span>
            <span className='px-4'>
              <i className='fa-solid fa-arrow-right'></i>
            </span>
            <span>{flight.flightRoute.arrivalAirport.IATA}</span>
          </div>
          <div className='flex items-start'>
            <span>
              {totalPassengers} x {price.toLocaleString() || 0}
            </span>
            <span className='text-xs'>VNĐ</span>
          </div>
        </div>
      }
    >
      <div className='flex flex-col gap-y-4 px-4 pt-4 text-sm'>
        <FlightLeg flightLeg={departureFlightLeg} />
        {transitFlightLeg && <FlightLeg flightLeg={transitFlightLeg} />}
      </div>
    </Row>
  )
}

interface FlightLegProps {
  flightLeg: IFlightLeg
}

const FlightLeg: FunctionComponent<FlightLegProps> = ({ flightLeg }) => {
  const transitMinuteDiff = differenceInMinutes(flightLeg.arrivalTime, flightLeg.departureTime) % 60
  const transitHourDiff = differenceInHours(flightLeg.arrivalTime, flightLeg.departureTime)

  return (
    <div>
      <div className='flex justify-between'>
        <div className='bold'>
          <span>{flightLeg.flightRoute.departureAirport.IATA}</span>
          <span className='px-4'>
            <i className='fa-solid fa-arrow-right'></i>
          </span>
          <span>{flightLeg.flightRoute.arrivalAirport.IATA}</span>
        </div>
        <div className='flex items-start'>
          {/* <span>1.000.000</span>
          <span className='text-xs'>VNĐ</span> */}
        </div>
      </div>
      <div className='pl-4 pt-2 text-sm'>
        <div>
          {/* Khởi Hành: <span className='bold'> 16:30, 25 tháng 6 2024</span> */}
          Khởi Hành:{' '}
          <span className='bold'>
            {`${format(flightLeg.departureTime, 'hh:mm d')} tháng ${format(flightLeg.departureTime, 'M yyyy')}`}
          </span>
        </div>
        <div>
          Thời gian:{' '}
          <span className='bold'>
            {`${transitHourDiff} tiếng `}
            {Boolean(transitMinuteDiff) && `${transitMinuteDiff} phút`}
          </span>
        </div>
        {/* <div>
          <span className='bold'>(HCM)</span>
        </div> */}
        <div className='pl-4'>
          <div>
            {flightLeg.aircraft.aircraftModel?.name} - {flightLeg.aircraft.name}
          </div>
          {/* <div>VN 144 - Boing 787</div> */}
        </div>
      </div>
    </div>
  )
}

interface FlightSeatDetailProps {
  flight: IFlight
  seatsData: {
    [PassengerType.ADULT]: {
      seat: ISeat
      services: {
        baggage: {
          quantity: number
          charge: number
        }
        meal: {
          name: string
          charge: number
        }
      }
    }[]
    [PassengerType.CHILD]: {
      seat: ISeat
      services: {
        baggage: {
          quantity: number
          charge: number
        }
        meal: {
          name: string
          charge: number
        }
      }
    }[]
  }
  passengers: {
    [PassengerType.ADULT]: number
    [PassengerType.CHILD]: number
  }
}

const FlightSeatDetail: FunctionComponent<FlightSeatDetailProps> = ({ flight, seatsData, passengers }) => {
  const { data } = useSearchWizard()
  const surcharges = data.additionalData.surcharges

  return (
    <div>
      <div className='bold'>
        <span>{flight.flightLegs[FlightLegType.DEPARTURE].flightRoute.departureAirport.IATA}</span>
        <span className='px-4'>
          <i className='fa-solid fa-arrow-right'></i>
        </span>
        <span>{flight.flightLegs[FlightLegType.DEPARTURE].flightRoute.arrivalAirport.IATA}</span>
      </div>
      <div className='pl-4 pt-2 text-sm'>
        {/* <div className='flex justify-between'>
        <div>
          <span className='bold mr-4'>A1</span>
          <span>---</span>
        </div>
      </div> */}
        {new Array(passengers[PassengerType.ADULT]).fill(null).map((_, index) => (
          <div className='flex justify-between'>
            <div>
              <span className='bold mr-4'>A{index + 1}</span>
              <span>{seatsData?.[PassengerType.ADULT]?.[index]?.seat.code || '---'}</span>
            </div>
            <div className='flex items-start'>
              <span>
                {surcharges
                  ?.find(
                    (surcharge) =>
                      surcharge.name === `SeatType.${seatsData?.[PassengerType.ADULT]?.[index]?.seat.seatType}`,
                  )
                  ?.value?.toLocaleString() || 0}
              </span>
              <span className='text-xs'>VNĐ</span>
            </div>
          </div>
        ))}
        {new Array(passengers[PassengerType.CHILD]).fill(null).map((_, index) => (
          <div className='flex justify-between'>
            <div>
              <span className='bold mr-4'>C{index + 1}</span>
              <span>{seatsData?.[PassengerType.CHILD]?.[index]?.seat.code || '---'}</span>
            </div>
            <div className='flex items-start'>
              <span>
                {surcharges
                  ?.find(
                    (surcharge) =>
                      surcharge.name === `SeatType.${seatsData?.[PassengerType.CHILD]?.[index]?.seat.seatType}`,
                  )
                  ?.value?.toLocaleString() || 0}
              </span>
              <span className='text-xs'>VNĐ</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface ServiceDetailProps {
  flight: IFlight
  seatsData: {
    [PassengerType.ADULT]: {
      seat: ISeat
      services: {
        baggage: {
          quantity: number
          charge: number
        }
        meal: {
          name: string
          charge: number
        }
      }
    }[]
    [PassengerType.CHILD]: {
      seat: ISeat
      services: {
        baggage: {
          quantity: number
          charge: number
        }
        meal: {
          name: string
          charge: number
        }
      }
    }[]
  }
  passengers: {
    [PassengerType.ADULT]: number
    [PassengerType.CHILD]: number
  }
  mealPlans: IMealPlan[]
}

const ServiceDetail: FunctionComponent<ServiceDetailProps> = ({ flight, seatsData, passengers, mealPlans }) => {
  const { data } = useSearchWizard()
  const surcharges = data.additionalData.surcharges

  return (
    <div>
      <div className='bold'>
        <span>{flight.flightLegs[FlightLegType.DEPARTURE].flightRoute.departureAirport.IATA}</span>
        <span className='px-4'>
          <i className='fa-solid fa-arrow-right'></i>
        </span>
        <span>{flight.flightLegs[FlightLegType.DEPARTURE].flightRoute.arrivalAirport.IATA}</span>
      </div>
      <div className='pl-4 pt-2 text-sm'>
        {/* <div className='flex justify-between'>
        <div>
          <span className='bold mr-4'>A1</span>
          <span>---</span>
        </div>
      </div> */}
        {new Array(passengers[PassengerType.ADULT]).fill(null).map((_, index) => (
          <div key={index} className='flex justify-between'>
            <div className='flex gap-2'>
              <span className='bold mr-4'>A{index + 1}</span>
              <span>
                <div>
                  <span>Thêm hành lý: </span>
                  <span>{seatsData?.[PassengerType.ADULT]?.[index]?.services?.baggage.quantity}</span>
                </div>
                <div>
                  <span>Suất ăn: </span>
                  <span>
                    {
                      mealPlans.find((m) => m.name === seatsData?.[PassengerType.ADULT]?.[index]?.services?.meal?.name)
                        ?.title
                    }
                  </span>
                </div>
              </span>
            </div>
            <div className=''>
              <div className='flex justify-end'>
                <span>{seatsData?.[PassengerType.ADULT]?.[index]?.services?.baggage?.charge.toLocaleString() || 0}</span>
                <span className='text-xs'>VNĐ</span>
              </div>
              <div className='flex justify-end'>
                <span>{seatsData?.[PassengerType.ADULT]?.[index]?.services?.meal?.charge.toLocaleString() || 0}</span>
                <span className='text-xs'>VNĐ</span>
              </div>
            </div>
          </div>
        ))}
        {new Array(passengers[PassengerType.CHILD]).fill(null).map((_, index) => (
          <div key={index} className='flex justify-between'>
            <div className='flex gap-2'>
              <span className='bold mr-4'>A{index + 1}</span>
              <span>
                <div>
                  <span>Thêm hành lý: </span>
                  <span>{seatsData?.[PassengerType.CHILD]?.[index]?.services?.baggage.quantity}</span>
                </div>
                <div>
                  <span>Suất ăn: </span>
                  <span>
                    {
                      mealPlans.find((m) => m.name === seatsData?.[PassengerType.CHILD]?.[index]?.services?.meal?.name)
                        ?.title
                    }
                  </span>
                </div>
              </span>
            </div>
            <div className=''>
              <div className='flex justify-end'>
                <span>{seatsData?.[PassengerType.CHILD]?.[index]?.services?.baggage?.charge.toLocaleString() || 0}</span>
                <span className='text-xs'>VNĐ</span>
              </div>
              <div className='flex justify-end'>
                <span>{seatsData?.[PassengerType.CHILD]?.[index]?.services?.meal?.charge.toLocaleString() || 0}</span>
                <span className='text-xs'>VNĐ</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PaymentSummaryCard
