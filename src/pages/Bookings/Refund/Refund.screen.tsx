import { SpinningCircle } from '@/components/Icons'
import Button from '@/components/ui/Button'
import Loading from '@/components/ui/Loading'
import { FlightType } from '@/enums/flight.enums'
import { PaymentStatus } from '@/enums/payment.enums'
import { TicketClass, TicketType } from '@/enums/ticket.enums'
import IBooking from '@/interfaces/booking/booking.interface'
import bookingsService from '@/services/bookings.service'
import paymentService from '@/services/payment.service'
import { joiResolver } from '@hookform/resolvers/joi'
import { format } from 'date-fns'
import Joi from 'joi'
import { FunctionComponent, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useLocation } from 'react-router'

interface IFormData {
  [FlightType.OUTBOUND]: boolean[]
  [FlightType.INBOUND]: boolean[]
}

const formSchema = Joi.object({
  [FlightType.OUTBOUND]: Joi.array().items(Joi.boolean().optional()).optional(),
  [FlightType.INBOUND]: Joi.array().items(Joi.boolean().optional()).optional(),
})

interface RefundProps {}

const Refund: FunctionComponent<RefundProps> = () => {
  const { pnr, email } = useLocation().state ?? {}
  //   console.log(pnr, email)

  if (!pnr || !email) {
    throw new Error('PNR and email are required')
  }

  const [booking, setBooking] = useState<IBooking | null>(null)
  console.log('booking', booking)

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isTransactionInProgress, setIsTransactionInProgress] = useState<boolean>(false)

  const outboundTicketClass = booking?.flightsInfo[FlightType.OUTBOUND].ticketClass
  const outboundTicketType = booking?.flightsInfo[FlightType.OUTBOUND].ticketType
  const inboundTicketClass = booking?.flightsInfo[FlightType.INBOUND]?.ticketClass
  const inboundTicketType = booking?.flightsInfo[FlightType.INBOUND]?.ticketType

  useEffect(() => {
    setIsLoading(true)
    bookingsService
      .getByPnr(pnr, email)
      .then((data) => {
        setBooking(data)
        setIsLoading(false)
      })
      .catch(() => {})
  }, [])
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
  } = useForm<IFormData>({
    mode: 'onChange',
    defaultValues: {
      [FlightType.OUTBOUND]: new Array(10).fill(false),
      [FlightType.INBOUND]: new Array(10).fill(false),
    },
    resolver: joiResolver(formSchema),
  })
  //   console.log(isValid, errors)
  //   const watchAllFields = watch()
  //   console.log('watchAllFields', watchAllFields)

  const onSubmit = (data: IFormData) => {
    setIsTransactionInProgress(true)
    // console.log('here')
    console.log(data)
    if (!booking?._id) {
      throw new Error('Booking ID is required')
    }
    paymentService
      .refund(booking._id, {
        pnr,
        email,
        ...data,
      })
      .then((booking) => setBooking(booking))
      .finally(() => setIsTransactionInProgress(false))
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <form className='my-12 flex w-full max-w-screen-lg flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
      <div className='bold text-center text-5xl'>Hoàn vé</div>
      <div className='rounded-md border p-4 '>
        <div className=''>
          Chuyến bay: {booking?.flightsInfo[FlightType.OUTBOUND].flight?.flightRoute.departureAirport?.name} (
          {booking?.flightsInfo[FlightType.OUTBOUND].flight?.flightRoute.departureAirport?.IATA}) -{' '}
          {booking?.flightsInfo[FlightType.OUTBOUND].flight?.flightRoute.arrivalAirport?.name} ({' '}
          {booking?.flightsInfo[FlightType.OUTBOUND].flight?.flightRoute.arrivalAirport?.IATA}) /
          {booking?.flightsInfo[FlightType.OUTBOUND].flight?._id}
        </div>
        <div className='text-lg'>
          {booking?.passengers.map((passenger, index) => {
            const isRefunded =
              booking.flightsInfo[FlightType.OUTBOUND].reservations[index].paymentStatus === PaymentStatus.REFUNDED

            const isRefundable =
              !isRefunded &&
              ((outboundTicketClass === TicketClass.ECONOMY && outboundTicketType === TicketType.FLEXIBLE) ||
                (outboundTicketClass === TicketClass.BUSINESS && outboundTicketType === TicketType.STANDARD) ||
                (outboundTicketClass === TicketClass.BUSINESS && outboundTicketType === TicketType.FLEXIBLE))
            return (
              <Controller
                key={index}
                name={`${FlightType.OUTBOUND}.${index}`}
                control={control}
                render={({ field, fieldState: { error }, formState }) => (
                  <label className='flex gap-4'>
                    <span className=' w-2'>
                      <input
                        hidden={!isRefundable}
                        type='checkbox'
                        checked={field.value === true}
                        onChange={(e) => {
                          //   console.log(field.value)
                          //   console.log(e.target.checked)
                          field.onChange(e.target.checked)
                        }}
                      />
                    </span>
                    <div className='flex w-full gap-4'>
                      <span>
                        {passenger.lastName} {passenger.firstName} - {format(passenger.dateOfBirth!, 'dd/MM/yyyy')}
                      </span>
                      <span className={isRefundable ? 'text-green-500' : 'text-red-500'}>
                        {isRefunded ? 'Vé đã hoàn' : isRefundable ? 'Có thể hoàn vé' : 'Không thể hoàn vé'}
                      </span>
                    </div>
                  </label>
                )}
              />
            )
          })}
        </div>
      </div>
      {booking?.flightsInfo[FlightType.INBOUND] != null && (
        <div className='rounded-md border p-4 '>
          <div className=''>
            Chuyến bay: {booking?.flightsInfo[FlightType.INBOUND].flight?.flightRoute.departureAirport?.name} (
            {booking?.flightsInfo[FlightType.INBOUND].flight?.flightRoute.departureAirport?.IATA}) -{' '}
            {booking?.flightsInfo[FlightType.INBOUND].flight?.flightRoute.arrivalAirport?.name} ({' '}
            {booking?.flightsInfo[FlightType.INBOUND].flight?.flightRoute.arrivalAirport?.IATA}) /
            {booking?.flightsInfo[FlightType.INBOUND].flight?._id}
          </div>
          <div className='text-lg'>
            {booking?.passengers.map((passenger, index) => {
              const isRefunded =
                booking.flightsInfo[FlightType.INBOUND]?.reservations[index].paymentStatus === PaymentStatus.REFUNDED

              const isRefundable =
                !isRefunded &&
                ((inboundTicketClass === TicketClass.ECONOMY && inboundTicketType === TicketType.FLEXIBLE) ||
                  (inboundTicketClass === TicketClass.BUSINESS && inboundTicketType === TicketType.STANDARD) ||
                  (inboundTicketClass === TicketClass.BUSINESS && inboundTicketType === TicketType.FLEXIBLE))
              return (
                <Controller
                  key={index}
                  name={`${FlightType.INBOUND}.${index}`}
                  control={control}
                  render={({ field, fieldState: { error }, formState }) => (
                    <label className='flex gap-4'>
                      <span className=' w-2'>
                        <input
                          hidden={!isRefundable}
                          type='checkbox'
                          checked={field.value === true}
                          onChange={(e) => {
                            //   console.log(field.value)
                            //   console.log(e.target.checked)
                            field.onChange(e.target.checked)
                          }}
                        />
                      </span>
                      <div className='flex w-full gap-4'>
                        <span>
                          {passenger.lastName} {passenger.firstName} - {format(passenger.dateOfBirth!, 'dd/MM/yyyy')}
                        </span>
                        <span className={isRefundable ? 'text-green-500' : 'text-red-500'}>
                          {isRefunded ? 'Vé đã hoàn' : isRefundable ? 'Có thể hoàn vé' : 'Không thể hoàn vé'}
                        </span>
                      </div>
                    </label>
                  )}
                />
              )
            })}
          </div>
        </div>
      )}
      <div className='flex w-full items-center justify-center'>
        {/* <button type='submit' className='rounded-md border-2 border-sky-400 bg-sky-100 p-4 active:scale-95'>
          Hoàn Vé
        </button> */}
        <Button disabled={isTransactionInProgress} outline>
          {isTransactionInProgress ? <SpinningCircle /> : 'Hoàn Vé'}
        </Button>
      </div>
    </form>
  )
}

export default Refund
