import { FlightType } from '@/enums/flight.enums'
import { FlightLegType } from '@/enums/flightLeg.enums'
import { PaymentStatus } from '@/enums/payment.enums'
import { SeatType } from '@/enums/seat.enums'
import { TicketClass } from '@/enums/ticket.enums'
import IPassenger from '@/interfaces/booking/passenger.interface'
import IReservation from '@/interfaces/booking/reservation.interface'
import IFlight from '@/interfaces/flight/flight.interface'
import { FunctionComponent } from 'react'

interface SeatsTableProps {
  passengers: IPassenger[]
  flightsInfo: {
    [FlightType.OUTBOUND]: {
      flight: IFlight
      ticketClass: TicketClass
      price: number
      reservations: {
        paymentStatus: PaymentStatus
        [FlightLegType.DEPARTURE]: {
          reservation: IReservation
          services: {
            seat: {
              seatType: SeatType
              charge: number
            }
            baggage: {
              quantity: number
              charge: number
            }
            meal: {
              name: string | null
              charge: number
            }
          }
        }
        [FlightLegType.TRANSIT]: {
          reservation: IReservation
          services: {
            seat: {
              seatType: SeatType
              charge: number
            }
            baggage: {
              quantity: number
              charge: number
            }
            meal: {
              name: string | null
              charge: number
            }
          }
        }
      }[]
    }
    [FlightType.INBOUND]?: {
      flight: IFlight
      ticketClass: TicketClass
      price: number
      reservations: {
        paymentStatus: PaymentStatus
        [FlightLegType.DEPARTURE]: {
          reservation: IReservation
          services: {
            seat: {
              seatType: SeatType
              charge: number
            }
            baggage: {
              quantity: number
              charge: number
            }
            meal: {
              name: string | null
              charge: number
            }
          }
        }
        [FlightLegType.TRANSIT]: {
          reservation: IReservation
          services: {
            seat: {
              seatType: SeatType
              charge: number
            }
            baggage: {
              quantity: number
              charge: number
            }
            meal: {
              name: string | null
              charge: number
            }
          }
        }
      }[]
    }
  }
}

const SeatsTable: FunctionComponent<SeatsTableProps> = ({ passengers, flightsInfo }) => {
  console.log('flightsInfo', flightsInfo)

  const outboundSeats = flightsInfo[FlightType.OUTBOUND].reservations
  const inboundSeats = flightsInfo?.[FlightType.INBOUND]?.reservations

  // console.log('outboundDepartureSeats', outboundDepartureSeats)
  // console.log('outboundTransitSeats', outboundTransitSeats)
  // console.log('inboundDepartureSeats', inboundDepartureSeats)
  // console.log('inboundTransitSeats', inboundTransitSeats)

  console.log(
    'Boolean(flightsInfo?.[FlightType.INBOUND]?.flight.flightLegs[FlightLegType.DEPARTURE]) &&',
    Boolean(flightsInfo?.[FlightType.INBOUND]?.flight.flightLegs[FlightLegType.DEPARTURE]),
  )
  console.log('                  inboundSeats', inboundSeats)

  return (
    <div className=''>
      <div className='p-4 text-xl font-bold'>Ghế đã đặt</div>
      <div className='overflow-x-auto rounded-lg border border-gray-200'>
        <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm'>
          <thead className='ltr:text-left rtl:text-right'>
            <tr>
              <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>Họ Tên</th>
              <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                {
                  flightsInfo[FlightType.OUTBOUND].flight.flightLegs[FlightLegType.DEPARTURE].flightRoute
                    .departureAirport.IATA
                }
                -
                {
                  flightsInfo[FlightType.OUTBOUND].flight.flightLegs[FlightLegType.DEPARTURE].flightRoute.arrivalAirport
                    .IATA
                }
              </th>

              {Boolean(flightsInfo[FlightType.OUTBOUND].flight.flightLegs[FlightLegType.TRANSIT]) && (
                <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                  {
                    flightsInfo[FlightType.OUTBOUND].flight.flightLegs[FlightLegType.TRANSIT].flightRoute
                      .departureAirport.IATA
                  }
                  -
                  {
                    flightsInfo[FlightType.OUTBOUND].flight.flightLegs[FlightLegType.TRANSIT].flightRoute.arrivalAirport
                      .IATA
                  }
                </th>
              )}
              {Boolean(flightsInfo?.[FlightType.INBOUND]?.flight.flightLegs[FlightLegType.DEPARTURE]) && (
                <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                  {
                    flightsInfo?.[FlightType.INBOUND]?.flight.flightLegs[FlightLegType.DEPARTURE].flightRoute
                      .departureAirport.IATA
                  }
                  -
                  {
                    flightsInfo?.[FlightType.INBOUND]?.flight.flightLegs[FlightLegType.DEPARTURE].flightRoute
                      .arrivalAirport.IATA
                  }
                </th>
              )}
              {Boolean(flightsInfo?.[FlightType.INBOUND]?.flight.flightLegs[FlightLegType.TRANSIT]) && (
                <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                  {
                    flightsInfo?.[FlightType.INBOUND]?.flight.flightLegs[FlightLegType.TRANSIT].flightRoute
                      .departureAirport.IATA
                  }
                  -
                  {
                    flightsInfo?.[FlightType.INBOUND]?.flight.flightLegs[FlightLegType.TRANSIT].flightRoute
                      .arrivalAirport.IATA
                  }
                </th>
              )}
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-200'>
            {passengers.map((passenger, index) => (
              <tr key={index}>
                <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                  {passenger.lastName} {passenger.firstName}
                </td>
                <td className='whitespace-nowrap px-4 py-2 text-center text-gray-700'>
                  {outboundSeats[index][FlightLegType.DEPARTURE]?.reservation.seat.code} (
                  {outboundSeats[index][FlightLegType.DEPARTURE]?.services?.seat?.charge?.toLocaleString()}vnđ)
                  <span className='text-red-500'>
                    {outboundSeats[index].paymentStatus === PaymentStatus.REFUNDED && '(Đã hoàn)'}
                  </span>
                </td>
                {Boolean(flightsInfo[FlightType.OUTBOUND].flight.flightLegs[FlightLegType.TRANSIT]) &&
                  outboundSeats && (
                    <td className='whitespace-nowrap px-4 py-2 text-center text-gray-700'>
                      {outboundSeats[index][FlightLegType.TRANSIT]?.reservation.seat.code} (
                      {outboundSeats[index][FlightLegType.TRANSIT]?.services?.seat?.charge?.toLocaleString()}vnđ)
                      <span className='text-red-500'>
                        {outboundSeats[index].paymentStatus === PaymentStatus.REFUNDED && '(Đã hoàn)'}
                      </span>
                    </td>
                  )}
                {Boolean(flightsInfo?.[FlightType.INBOUND]?.flight.flightLegs[FlightLegType.DEPARTURE]) &&
                  inboundSeats && (
                    <td className='whitespace-nowrap px-4 py-2 text-center text-gray-700'>
                      {inboundSeats[index][FlightLegType.DEPARTURE]?.reservation.seat.code} (
                      {inboundSeats[index][FlightLegType.DEPARTURE]?.services?.seat?.charge?.toLocaleString()}vnđ)
                      <span className='text-red-500'>
                        {inboundSeats[index].paymentStatus === PaymentStatus.REFUNDED && '(Đã hoàn)'}
                      </span>
                    </td>
                  )}
                {Boolean(flightsInfo?.[FlightType.INBOUND]?.flight.flightLegs[FlightLegType.TRANSIT]) &&
                  inboundSeats && (
                    <td className='whitespace-nowrap px-4 py-2 text-center text-gray-700'>
                      {inboundSeats[index][FlightLegType.TRANSIT]?.reservation.seat.code} (
                      {inboundSeats[index][FlightLegType.TRANSIT]?.services?.seat?.charge?.toLocaleString()}vnđ)
                      <span className='text-red-500'>
                        {inboundSeats[index].paymentStatus === PaymentStatus.REFUNDED && '(Đã hoàn)'}
                      </span>
                    </td>
                  )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SeatsTable
