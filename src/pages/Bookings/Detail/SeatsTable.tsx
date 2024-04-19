import { FlightType } from '@/enums/flight.enums'
import { FlightLegType } from '@/enums/flightLeg.enums'
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
        [FlightLegType.DEPARTURE]: {
          reservation: IReservation
          surcharge: number
        }[]
        [FlightLegType.TRANSIT]: {
          reservation: IReservation
          surcharge: number
        }[]
      }
    }
    [FlightType.INBOUND]?: {
      flight: IFlight
      ticketClass: TicketClass
      price: number
      reservations: {
        [FlightLegType.DEPARTURE]: {
          reservation: IReservation
          surcharge: number
        }[]
        [FlightLegType.TRANSIT]: {
          reservation: IReservation
          surcharge: number
        }[]
      }
    }
  }
}

const SeatsTable: FunctionComponent<SeatsTableProps> = ({ passengers, flightsInfo }) => {
  const outboundDepartureSeats = flightsInfo[FlightType.OUTBOUND].reservations[FlightLegType.DEPARTURE]
  const outboundTransitSeats = !flightsInfo[FlightType.OUTBOUND].flight.hasTransit
    ? null
    : flightsInfo[FlightType.OUTBOUND].reservations[FlightLegType.TRANSIT]
  const inboundDepartureSeats = flightsInfo?.[FlightType.INBOUND]?.reservations[FlightLegType.DEPARTURE]
  const inboundTransitSeats = !flightsInfo?.[FlightType.INBOUND]?.flight.hasTransit
    ? null
    : flightsInfo?.[FlightType.INBOUND]?.reservations[FlightLegType.TRANSIT]

  console.log('outboundDepartureSeats', outboundDepartureSeats)
  console.log('outboundTransitSeats', outboundTransitSeats)
  console.log('inboundDepartureSeats', inboundDepartureSeats)
  console.log('inboundTransitSeats', inboundTransitSeats)

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

              {Boolean(outboundTransitSeats?.length) && (
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
              {Boolean(inboundDepartureSeats?.length) && (
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
              {Boolean(inboundTransitSeats?.length) && (
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
                  {outboundDepartureSeats[index]?.reservation.seat.code} ({outboundDepartureSeats[index]?.surcharge.toLocaleString()}vnđ)
                </td>
                {outboundTransitSeats && (
                  <td className='whitespace-nowrap px-4 py-2 text-center text-gray-700'>
                    {outboundTransitSeats[index]?.reservation.seat.code} ({outboundTransitSeats[index]?.surcharge.toLocaleString()}vnđ)
                  </td>
                )}
                {inboundDepartureSeats && (
                  <td className='whitespace-nowrap px-4 py-2 text-center text-gray-700'>
                    {inboundDepartureSeats[index]?.reservation.seat.code} ({inboundDepartureSeats[index]?.surcharge.toLocaleString()}vnđ)
                  </td>
                )}
                {inboundTransitSeats && (
                  <td className='whitespace-nowrap px-4 py-2 text-center text-gray-700'>
                    {inboundTransitSeats[index]?.reservation.seat.code} ({inboundTransitSeats[index]?.surcharge.toLocaleString()}vnđ)
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
