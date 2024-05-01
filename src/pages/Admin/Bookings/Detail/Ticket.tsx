import { forwardRef, FunctionComponent } from 'react'
import businessTicketBackground from '@/assets/images/ticket/ticket-business.png'
import economyTicketBackground from '@/assets/images/ticket/ticket-economy.png'
import templateTicketBackground from '@/assets/images/ticket/ticket-template.png'
import IFlightLeg from '@/interfaces/flight/flightLeg.interface'
import { format } from 'date-fns'
import './Ticket.scss'
import IReservation from '@/interfaces/booking/reservation.interface'
import ISeat from '@/interfaces/aircraft/seat.interface'
import IPassenger from '@/interfaces/booking/passenger.interface'
import Barcode from 'react-barcode'
// import { BarcodeGeneratorComponent } from '@syncfusion/ej2-react-barcode-generator'

interface TicketProps {
  reservation: IReservation
}

const Ticket = forwardRef<HTMLDivElement, TicketProps>(({ reservation }, ref) => {
  const seat = reservation.seat as ISeat
  const flightLeg = reservation.flightLeg as IFlightLeg
  const passenger = reservation.passenger as IPassenger

  const ticketBackground = seat.ticketClass === 'BUSINESS' ? businessTicketBackground : economyTicketBackground

  return (
    <div ref={ref} className='ticket not-scale-on-print relative h-[180px] w-[495px] scale-150'>
      <img src={ticketBackground} className='h-full w-full' />
      <div className='absolute left-0 top-0 h-full w-full'>
        <div className=' absolute left-[40px] top-[60px]'>
          <div className='text-2xl font-bold'>{flightLeg.flightRoute.departureAirport.IATA}</div>
          <div className='text-xs leading-3   '>{format(flightLeg.departureTime, 'dd MMMM yyyy')}</div>
          <div className='text-xs leading-3   '>{format(flightLeg.departureTime, 'HH:SS')}</div>
        </div>
        <div className=' absolute left-[172px] top-[60px]'>
          <div className='text-2xl font-bold'>{flightLeg.flightRoute.arrivalAirport.IATA}</div>
          <div className='text-xs leading-3   '>{format(flightLeg.arrivalTime, 'dd MMMM yyyy')}</div>
          <div className='text-xs leading-3   '>{format(flightLeg.arrivalTime, 'HH:SS')}</div>
        </div>
        <div className='absolute left-[40px] top-[130px]'>
          <div className='text-xs'>Chuyến bay</div>
          <div className='font-bold'>{flightLeg.flightNumber}</div>
        </div>
        <div className='absolute left-[200px] top-[130px]'>
          <div className='text-xs'>Ghế</div>
          <div className='font-bold'>{seat.code}</div>
        </div>
        <div className='absolute left-[300px] flex h-full items-center justify-center '>
          <div className='absolute flex w-[180px] -rotate-90 flex-col items-center justify-center text-center'>
            <div className='font-bold text-xs'>
              {passenger.lastName} {passenger.firstName}
            </div>
            <div className='w-[120px]'>
              <Barcode value={reservation._id ?? ''} background='#00000000' />
            </div>
          </div>
        </div>

        <div className='absolute left-[360px] top-[0px]'>
          <div className=' absolute left-[18px] top-[25px] w-12'>
            <div className='text-xs font-bold'>{flightLeg.flightRoute.departureAirport.IATA}</div>
            <div className='text-[0.4rem] leading-3'>{format(flightLeg.departureTime, 'dd MMMM yyyy')}</div>
            <div className='text-xs leading-3'>{format(flightLeg.departureTime, 'HH:SS')}</div>
          </div>
          <div className=' absolute left-[82px] top-[25px] w-12'>
            <div className='text-xs font-bold'>{flightLeg.flightRoute.arrivalAirport.IATA}</div>
            <div className='text-[0.4rem] leading-3'>{format(flightLeg.departureTime, 'dd MMMM yyyy')}</div>
            <div className='text-xs leading-3'>{format(flightLeg.arrivalTime, 'HH:SS')}</div>
          </div>
          <div className='absolute left-[20px] top-[130px] w-16'>
            <div className='text-[0.4rem]'>Chuyến bay</div>
            <div className='font-bold text-[0.7rem]'>{flightLeg.flightNumber}</div>
          </div>
          <div className='absolute left-[80px] top-[130px]'>
            <div className='text-[0.4rem]'>Ghế</div>
            <div className='font-bold'>{seat.code}</div>
          </div>
          <div className='absolute left-[]'>
            <div className='absolute flex w-[130px] top-[90px] flex-col items-center justify-center text-center'>
              <div className='font-bold text-xs'>
                {passenger.lastName} {passenger.firstName}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default Ticket
