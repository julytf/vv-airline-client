import { FunctionComponent, useEffect, useState } from 'react'
import { SeatClass } from '@/enums/seat.enums'
import Loading from '@/components/Loading/Loading'
import SearchCard from '@/components/Card/SearchCard'
import WizardBottomNavBar from '@/components/SearchWizard/NavBar/WizardBottomNavBar'
import classNames from 'classnames'
import { useSearchParams } from 'react-router-dom'
import searchWizardService from '@/services/searchWizard.service'
import IFlight from '@/interfaces/flight/flight.interface'
import { differenceInHours, differenceInMinutes, format } from 'date-fns'
import IFlightLeg from '@/interfaces/flight/flightLeg.interface'
import IAirport from '@/interfaces/flight/airport.interface'
import vi from 'date-fns/locale/vi'
import { useSearchWizard } from '@/contexts/SearchWizard.context'
import { FlightType } from '@/enums/flight.enums'
import { PassengerType } from '@/enums/passenger.enums'
import { FlightLegType } from '@/enums/flightLeg.enums'

interface FlightsSelectionProps {}

const FlightsSelection: FunctionComponent<FlightsSelectionProps> = () => {
  const { data, setData, actions } = useSearchWizard()
  console.log('data', data)

  const [loading, setLoading] = useState(true)

  const isForwardAble =
    Boolean(data.flightsData[FlightType.OUTBOUND]) &&
    (!data.searchData.isRoundTrip || Boolean(data.flightsData[FlightType.INBOUND]))

  const [departureFlights, setDepartureFlights] = useState<IFlight[] | null>(null)
  const [returnFlights, setReturnFlights] = useState<IFlight[] | null>(null)

  // Load Flights
  useEffect(() => {
    searchWizardService
      .getFlights({
        departureAirportIATA: data.searchData.departureAirportIATA,
        arrivalAirportIATA: data.searchData.arrivalAirportIATA,
        departureDate: data.searchData.departureDate,
        passengersAdults: data.searchData.passengers[PassengerType.ADULT],
        passengersChildren: data.searchData.passengers[PassengerType.CHILD],
      })
      .then((flights) => {
        flights.forEach((flight: IFlight) => {
          flight.departureTime = new Date(flight.departureTime)
          flight.arrivalTime = new Date(flight.arrivalTime)
        })
        setDepartureFlights(flights)
        // setLoading(false)
      })
    if (data.searchData.isRoundTrip)
      searchWizardService
        .getFlights({
          departureAirportIATA: data.searchData.arrivalAirportIATA,
          arrivalAirportIATA: data.searchData.departureAirportIATA,
          departureDate: data.searchData.returnDate!,
          passengersAdults: data.searchData.passengers[PassengerType.ADULT],
          passengersChildren: data.searchData.passengers[PassengerType.CHILD],
        })
        .then((flights) => {
          flights.forEach((flight: IFlight) => {
            flight.departureTime = new Date(flight.departureTime)
            flight.arrivalTime = new Date(flight.arrivalTime)
          })
          setReturnFlights(flights)
          // setLoading(false)
        })
  }, [])

  // update Loading
  useEffect(() => {
    setLoading(departureFlights == null || (data.searchData.isRoundTrip && returnFlights == null))
  }, [departureFlights, returnFlights])

  if (loading) {
    return <Loading />
  }
  return (
    <div className='mx-auto my-16 flex max-w-screen-xl flex-col items-center justify-center gap-y-6'>
      <SearchCard className='shadow-lg' />
      <div className='mt-16 flex w-full max-w-screen-xl flex-col gap-y-8'>
        <FlightSelect
          departureAirport={data.searchData.departureAirport!}
          arrivalAirport={data.searchData.arrivalAirport!}
          date={data?.searchData?.departureDate || new Date()}
          flights={departureFlights || []}
          selectedFlightInfo={data.flightsData![FlightType.OUTBOUND]}
          onChange={(info) => {
            setData((prev) => {
              prev.flightsData[FlightType.OUTBOUND] = info
              return { ...prev }
            })
          }}
        />
        {data?.searchData?.isRoundTrip && (
          <FlightSelect
            departureAirport={data.searchData.arrivalAirport!}
            arrivalAirport={data.searchData.departureAirport!}
            date={data?.searchData?.returnDate || new Date()}
            flights={returnFlights || []}
            selectedFlightInfo={data.flightsData![FlightType.INBOUND]}
            onChange={(info) => {
              setData((prev) => {
                prev.flightsData[FlightType.INBOUND] = info
                return { ...prev }
              })
            }}
          />
        )}
        <WizardBottomNavBar
          isForwardEnabled={isForwardAble}
          onClickForward={actions.nextStep}
          isBackwardEnabled={false}
          onClickBackward={actions.prevStep}
        />
      </div>
    </div>
  )
}

interface FlightSelectProps {
  departureAirport: IAirport
  arrivalAirport: IAirport
  date: Date
  flights: IFlight[]
  selectedFlightInfo?: { flight: IFlight; seatClass: SeatClass } | null
  onChange?: (info: { flight: IFlight; seatClass: SeatClass } | null) => void
}

const FlightSelect: FunctionComponent<FlightSelectProps> = ({
  departureAirport,
  arrivalAirport,
  date,
  flights,
  selectedFlightInfo,
  onChange,
}) => {
  return (
    <div className='flex w-full flex-col gap-y-4 rounded-md border shadow-inner'>
      <div className='flex border-b p-4 px-8'>
        <div className='pr-4 pt-2 text-4xl'>
          <i className='fa-light fa-plane'></i>
        </div>
        <div className='flex flex-col'>
          <span className='text-2xl'>
            {departureAirport?.city}({departureAirport?.IATA}) - {arrivalAirport?.city}({arrivalAirport?.IATA})
          </span>
          <span>
            {/* TODO: */}
            {date?.toLocaleDateString('vi-VN', {
              weekday: 'long',
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            })}
          </span>
        </div>
      </div>
      <div className='flex flex-col gap-y-8 p-8'>
        {selectedFlightInfo ? (
          <SelectedFlight selectedFlightInfo={selectedFlightInfo} onChange={onChange} />
        ) : (
          flights.map((flight, index) => <Flight key={index} flight={flight} onChange={onChange} />)
        )}
      </div>
    </div>
  )
}

interface FlightProps {
  flight: IFlight
  onChange?: (info: { flight: IFlight; seatClass: SeatClass } | null) => void
}

const Flight: FunctionComponent<FlightProps> = ({ flight, onChange }) => {
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

  const economyPrice = !flight.hasTransit
    ? Number(flight.flightRoute.prices[SeatClass.ECONOMY])
    : Number(flight?.flightLegs?.[FlightLegType.DEPARTURE]?.flightRoute?.prices[SeatClass.ECONOMY]) +
      Number(flight?.flightLegs?.[FlightLegType.TRANSIT]?.flightRoute?.prices[SeatClass.ECONOMY])

  const businessPrice = !flight.hasTransit
    ? Number(flight.flightRoute.prices[SeatClass.BUSINESS])
    : Number(flight?.flightLegs?.[FlightLegType.DEPARTURE]?.flightRoute?.prices[SeatClass.BUSINESS]) +
      Number(flight?.flightLegs?.[FlightLegType.TRANSIT]?.flightRoute?.prices[SeatClass.BUSINESS])

  console.log('economyPrice', economyPrice)
  console.log('businessPrice', businessPrice)

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
              <span className='text-2xl text-primary'>{format(flight.arrivalTime, 'HH:mm')}</span>
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
            onClick={() => onChange?.({ flight, seatClass: SeatClass.ECONOMY })}
            className={classNames(
              'col-span-3 flex items-center justify-center rounded-md border border-blue-400 bg-blue-100 active:scale-95',
              {},
            )}
          >
            <div className='flex flex-col justify-center'>
              <span>PHỔ THÔNG</span>
              <div className='flex justify-start'>
                <span className='bold text-3xl'>{economyPrice.toLocaleString()}</span>
                <span>VNĐ</span>
              </div>
            </div>
          </button>
          <button
            onClick={() => onChange?.({ flight, seatClass: SeatClass.BUSINESS })}
            className={classNames(
              'col-span-3 flex items-center justify-center rounded-md border border-yellow-400 bg-yellow-100 active:scale-95',
              {},
            )}
          >
            <div className='flex flex-col justify-center'>
              <span>THƯƠNG GIA</span>
              <div className='flex justify-start'>
                <span className='bold text-3xl'>{businessPrice.toLocaleString()}</span>
                <span>VNĐ</span>
              </div>
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
              <div className='flex flex-col justify-center'>
                <span>PHỔ THÔNG</span>
                <div className='flex justify-start'>
                  <span className='bold text-3xl'>{economyPrice.toLocaleString()}</span>
                  <span>VNĐ</span>
                </div>
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
              <div className='flex flex-col justify-center'>
                <span>THƯƠNG GIA</span>
                <div className='flex justify-start'>
                  <span className='bold text-3xl'>{businessPrice.toLocaleString()}</span>
                  <span>VNĐ</span>
                </div>
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

interface FlightLegProps {
  flightLeg: IFlightLeg
}

const FlightLeg: FunctionComponent<FlightLegProps> = ({ flightLeg }) => {
  const minuteDiff = differenceInMinutes(flightLeg.arrivalTime, flightLeg.departureTime) % 60
  const hourDiff = differenceInHours(flightLeg.arrivalTime, flightLeg.departureTime)

  return (
    <div>
      <div className='flex gap-x-6'>
        <div className='flex flex-col items-center'>
          <div>
            <div className='flex aspect-square w-12 items-center justify-center rounded-full border border-primary text-primary'>
              <i className='fa-light fa-plane-departure'></i>
            </div>
          </div>
          <div className='h-full w-0 border border-primary'></div>
        </div>
        <div className='pb-8'>
          <div className='flex flex-col '>
            <span className='text-2xl text-primary'>
              {format(flightLeg.departureTime, 'dd/MM/yyyy, HH:mm')} {flightLeg?.flightRoute?.departureAirport?.city}
            </span>
            <span className='text-lg'>
              {flightLeg?.flightRoute?.departureAirport?.IATA},{' '}
              {flightLeg?.flightRoute?.departureAirport?.country?.name}
            </span>
          </div>
          <div className='mt-4 flex flex-col gap-y-2 text-sm'>
            <div>
              <span className='bold'>Máy bay: </span>
              <span>{flightLeg.aircraft.name}</span>
            </div>
            <div>
              <span className='bold'>Thời gian bay: </span>
              <span>
                {`${hourDiff} tiếng `}
                {Boolean(minuteDiff) && `${minuteDiff} phút`}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='flex gap-x-6'>
        <div className='flex flex-col items-center'>
          <div>
            <div className='flex aspect-square w-12 items-center justify-center rounded-full border border-primary text-primary'>
              <i className='fa-light fa-plane-arrival'></i>
            </div>
          </div>
        </div>
        <div>
          <div className='flex flex-col '>
            <span className='text-2xl text-primary'>
              {format(flightLeg.arrivalTime, 'dd/MM/yyyy, HH:mm')} {flightLeg?.flightRoute?.arrivalAirport?.city}
            </span>
            <span className='text-lg'>
              {flightLeg?.flightRoute?.arrivalAirport?.IATA}, {flightLeg?.flightRoute?.arrivalAirport?.country?.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlightsSelection
