import { FunctionComponent, useRef } from 'react'
import Ticket from './Ticket'
import Button from '@/components/ui/Button'

import ReactToPrint, { useReactToPrint } from 'react-to-print'
import IFlight from '@/interfaces/flight/flight.interface'
import IFlightLeg from '@/interfaces/flight/flightLeg.interface'
import { FlightLegType } from '@/enums/flightLeg.enums'
import IBooking from '@/interfaces/booking/booking.interface'
import { FlightType } from '@/enums/flight.enums'
import IReservation from '@/interfaces/booking/reservation.interface'
import ReactModal from 'react-modal'

interface PrintModalProps {
  isOpen: boolean
  onRequestClose: () => void
  booking: IBooking
}

const PrintModal: FunctionComponent<PrintModalProps> = ({ isOpen, onRequestClose, booking }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      // ariaHideApp={false}
      style={{
        overlay: {
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
          padding: '32px',
        },
      }}
    >
      <div className='min-w-5xl z-50 flex flex-col items-center justify-center rounded-md bg-white p-8'>
        <button onClick={onRequestClose} className='absolute right-5 top-5 p-2'>
          <span className='text-2xl'>
            <i className='fa-solid fa-x'></i>
          </span>
        </button>
        <div className='text-center text-3xl font-bold'>
          <span>
            Vé máy bay{' '}
            {
              booking.flightsInfo[FlightType.OUTBOUND].flight?.flightLegs[FlightLegType.DEPARTURE].flightRoute
                .departureAirport.IATA
            }{' '}
            -{' '}
            {
              booking.flightsInfo[FlightType.OUTBOUND].flight?.flightLegs[FlightLegType.DEPARTURE].flightRoute
                .arrivalAirport.IATA
            }
          </span>
        </div>
        {booking.flightsInfo[FlightType.OUTBOUND].reservations.map((reservation) => (
          <TicketWrapper reservation={reservation[FlightLegType.DEPARTURE].reservation} />
        ))}

        {booking.flightsInfo[FlightType.OUTBOUND].flight.hasTransit && (
          <>
            <div className='text-center text-3xl font-bold'>
              <span>
                Vé máy bay{' '}
                {
                  booking.flightsInfo[FlightType.OUTBOUND].flight?.flightLegs[FlightLegType.TRANSIT].flightRoute
                    .departureAirport.IATA
                }{' '}
                -{' '}
                {
                  booking.flightsInfo[FlightType.OUTBOUND].flight?.flightLegs[FlightLegType.TRANSIT].flightRoute
                    .arrivalAirport.IATA
                }
              </span>
            </div>

            {booking.flightsInfo[FlightType.OUTBOUND].reservations.map((reservation) => (
              <TicketWrapper reservation={reservation[FlightLegType.TRANSIT].reservation} />
            ))}
          </>
        )}
        {booking.isRoundtrip && (
          <>
            <div className='text-center text-3xl font-bold'>
              <span>
                Vé máy bay{' '}
                {
                  booking.flightsInfo?.[FlightType.INBOUND]?.flight?.flightLegs[FlightLegType.DEPARTURE].flightRoute
                    .departureAirport.IATA
                }{' '}
                -{' '}
                {
                  booking.flightsInfo?.[FlightType.INBOUND]?.flight?.flightLegs[FlightLegType.DEPARTURE].flightRoute
                    .arrivalAirport.IATA
                }
              </span>
            </div>
            {booking.flightsInfo?.[FlightType.INBOUND]?.reservations.map((reservation) => (
              <TicketWrapper reservation={reservation[FlightLegType.DEPARTURE].reservation} />
            ))}

            {booking.flightsInfo?.[FlightType.INBOUND]?.flight.hasTransit && (
              <>
                <div className='text-center text-3xl font-bold'>
                  <span>
                    Vé máy bay{' '}
                    {
                      booking.flightsInfo?.[FlightType.INBOUND].flight?.flightLegs[FlightLegType.TRANSIT].flightRoute
                        .departureAirport.IATA
                    }{' '}
                    -{' '}
                    {
                      booking.flightsInfo?.[FlightType.INBOUND].flight?.flightLegs[FlightLegType.TRANSIT].flightRoute
                        .arrivalAirport.IATA
                    }
                  </span>
                </div>

                {booking.flightsInfo?.[FlightType.INBOUND].reservations.map((reservation) => (
                  <TicketWrapper reservation={reservation[FlightLegType.TRANSIT].reservation} />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </ReactModal>
  )
}

interface TicketWrapperProps {
  reservation: IReservation
}

const TicketWrapper: FunctionComponent<TicketWrapperProps> = ({ reservation }) => {
  const ticketRef = useRef<HTMLDivElement>(null)

  const handlePrint = useReactToPrint({
    content: () => ticketRef.current,
    removeAfterPrint: true,
  })
  return (
    <div className='flex items-center justify-center gap-16'>
      <div className='flex h-[300px] w-[750px] items-center justify-center'>
        <Ticket ref={ticketRef} reservation={reservation} />
      </div>
      <div className='p-32'>
        <Button onClick={handlePrint}>In Vé</Button>
      </div>
    </div>
  )
}

export default PrintModal
