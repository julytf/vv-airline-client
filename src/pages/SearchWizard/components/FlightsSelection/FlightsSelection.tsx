import { FunctionComponent, useEffect, useState } from 'react'
import { SeatClass } from '@/enums/seat.enums'
import SearchCard from '@/components/Card/SearchCard'
import WizardBottomNavBar from '@/components/SearchWizard/NavBar/WizardBottomNavBar'
import classNames from 'classnames'
import { useNavigate, useSearchParams } from 'react-router-dom'
import searchWizardService from '@/services/searchWizard.service'
import IFlight from '@/interfaces/flight/flight.interface'
import { addHours, differenceInHours, differenceInMinutes, format } from 'date-fns'
import IFlightLeg from '@/interfaces/flight/flightLeg.interface'
import IAirport from '@/interfaces/flight/airport.interface'
import vi from 'date-fns/locale/vi'
import { FlightsData, useSearchWizard } from '@/contexts/SearchWizard.context'
import { FlightType } from '@/enums/flight.enums'
import { PassengerType } from '@/enums/passenger.enums'
import { FlightLegType } from '@/enums/flightLeg.enums'
import Loading from '@/components/ui/Loading'
import FlightSelect from './FlightSelect'
import DateSelect from './DateSelect'
import { route } from '@/utils/helpers'
import NotifyBar from '@/components/ui/NotifyBar'

interface FlightsSelectionProps {}

const FlightsSelection: FunctionComponent<FlightsSelectionProps> = () => {
  const navigate = useNavigate()

  const { data, setData, actions } = useSearchWizard()
  // console.log('data', data)

  const [isLoading, setIsLoading] = useState(true)

  const [flightsData, setFlightsData] = useState<FlightsData>({
    [FlightType.OUTBOUND]: data.flightsData[FlightType.OUTBOUND] || null,
    [FlightType.INBOUND]: data.flightsData[FlightType.INBOUND] || null,
  })

  const totalPassengers =
    data.searchData.passengers[PassengerType.ADULT] + data.searchData.passengers[PassengerType.CHILD]

  const inboundDateGTEOutboundDate: boolean =
    !data.searchData.returnDate || new Date(data.searchData.departureDate) <= new Date(data.searchData.returnDate)
  console.log('inboundDateGTEOutboundDate', inboundDateGTEOutboundDate)

  const inboundTimeGTEOutboundTimeAnd6Hours: boolean =
    !flightsData[FlightType.OUTBOUND] ||
    !flightsData[FlightType.INBOUND] ||
    (inboundDateGTEOutboundDate &&
      data.searchData.returnDate != null &&
      addHours(new Date(flightsData[FlightType.OUTBOUND]?.flight.arrivalTime || ''), 6) <=
        new Date(flightsData[FlightType.INBOUND]?.flight.departureTime || ''))
  console.log('inboundTimeGTEOutboundTimeAnd6Hours', inboundTimeGTEOutboundTimeAnd6Hours)

  const isForwardAble =
    Boolean(flightsData[FlightType.OUTBOUND]) &&
    (!data.searchData.isRoundTrip || Boolean(flightsData[FlightType.INBOUND])) &&
    inboundDateGTEOutboundDate &&
    inboundTimeGTEOutboundTimeAnd6Hours

  const [outboundFlights, setOutboundFlights] = useState<IFlight[] | null>(null)
  const [inboundFlights, setInboundFlights] = useState<IFlight[] | null>(null)

  // console.log('departureFlights', departureFlights)
  // console.log('returnFlights', returnFlights)

  // Load Flights
  useEffect(() => {
    console.log('reload flights')

    setIsLoading(true)
    searchWizardService
      .getFlights({
        departureAirportIATA: data.searchData.departureAirportIATA,
        arrivalAirportIATA: data.searchData.arrivalAirportIATA,
        departureDate: new Date(data.searchData.departureDate),
        totalPassengers:
          data.searchData.passengers[PassengerType.ADULT] + data.searchData.passengers[PassengerType.CHILD],
      })
      .then((flights) => {
        flights.forEach((flight: IFlight) => {
          flight.departureTime = new Date(flight.departureTime)
          flight.arrivalTime = new Date(flight.arrivalTime)
        })
        setOutboundFlights(flights)
        // setIsLoading(false)
      })
    if (data.searchData.isRoundTrip)
      searchWizardService
        .getFlights({
          departureAirportIATA: data.searchData.arrivalAirportIATA,
          arrivalAirportIATA: data.searchData.departureAirportIATA,
          departureDate: new Date(data.searchData.returnDate!),
          totalPassengers:
            data.searchData.passengers[PassengerType.ADULT] + data.searchData.passengers[PassengerType.CHILD],
        })
        .then((flights) => {
          flights.forEach((flight: IFlight) => {
            flight.departureTime = new Date(flight.departureTime)
            flight.arrivalTime = new Date(flight.arrivalTime)
          })
          setInboundFlights(flights)
          // setIsLoading(false)
        })

    setIsLoading(false)
  }, [
    data.searchData.departureAirportIATA,
    data.searchData.arrivalAirportIATA,
    data.searchData.departureDate,
    data.searchData.returnDate,
    // TODO: check this again, will this trigger research
    data.searchData.passengers,
    data.searchData.isRoundTrip,
  ])
  // console.log('data.searchData.departureDate', data.searchData.departureDate)
  // console.log('data.searchData.returnDate', data.searchData.returnDate)

  // update departureDate in url
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set('departureDate', data.searchData.departureDate)
    if (data.searchData.isRoundTrip && data.searchData.returnDate) {
      searchParams.set('returnDate', data.searchData.returnDate)
    }
    navigate(`?${searchParams.toString()}`)
  }, [data.searchData.departureDate, data.searchData.returnDate])

  const onClickForward = () => {
    setData((prev) => {
      prev.flightsData = flightsData
      return { ...prev }
    })

    actions.nextStep()
  }

  const onDepartureDateChange = (date: string) => {
    setData((prev) => {
      prev.searchData.departureDate = date
      return { ...prev }
    })
    flightsData[FlightType.OUTBOUND] = null
  }
  const onReturnDateChange = (date: string) => {
    setData((prev) => {
      prev.searchData.returnDate = date
      return { ...prev }
    })
    flightsData[FlightType.INBOUND] = null
  }

  // update IsLoading
  useEffect(() => {
    setIsLoading(outboundFlights == null || (data.searchData.isRoundTrip && inboundFlights == null))
  }, [outboundFlights, inboundFlights])

  if (isLoading) {
    return <Loading />
  }
  return (
    <div className='mx-auto my-16 flex max-w-screen-xl flex-col items-center justify-center gap-y-6'>
      <SearchCard className='shadow-lg' />
      <div className='mt-16 flex w-full max-w-screen-xl flex-col gap-y-8'>
        <div className='flex w-full flex-col gap-y-4 rounded-md border shadow-inner'>
          <div className='flex border-b p-4 px-8'>
            <div className='pr-4 pt-2 text-4xl'>
              <i className='fa-light fa-plane'></i>
            </div>
            <div className='flex flex-col'>
              <span className='text-2xl'>
                {data.searchData.departureAirport?.city}({data.searchData.departureAirport?.IATA}) -{' '}
                {data.searchData.arrivalAirport?.city}({data.searchData.arrivalAirport?.IATA})
              </span>
              <span>
                {/* TODO: */}
                {new Date(data.searchData.departureDate)?.toLocaleDateString('vi-VN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
          <div className='flex flex-col gap-y-8 p-8'>
            <DateSelect value={new Date(data?.searchData?.departureDate).toString()} onChange={onDepartureDateChange} />
            <FlightSelect
              // departureAirport={data.searchData.departureAirport!}
              // arrivalAirport={data.searchData.arrivalAirport!}
              // date={new Date(data?.searchData?.departureDate)}
              flights={outboundFlights || []}
              selectedFlightInfo={flightsData![FlightType.OUTBOUND]}
              quantityLimit={totalPassengers}
              onChange={(info) => {
                setFlightsData((prev) => {
                  prev[FlightType.OUTBOUND] = info
                  return { ...prev }
                })
              }}
            />
          </div>
        </div>
        {data?.searchData?.isRoundTrip && (
          <>
            {!inboundDateGTEOutboundDate && (
              <NotifyBar message='Ngày về cần phải lớn hơn hoặc bằng ngày đi!' type='error' />
            )}
            {inboundDateGTEOutboundDate && !inboundTimeGTEOutboundTimeAnd6Hours && (
              <NotifyBar
                message='Thời gian cất cánh của chuyến bay về cần cách thời gian hạ cánh của chuyến bay đi 6 tiếng!'
                type='error'
              />
            )}
            <div className='flex w-full flex-col gap-y-4 rounded-md border shadow-inner'>
              <div className='flex border-b p-4 px-8'>
                <div className='pr-4 pt-2 text-4xl'>
                  <i className='fa-light fa-plane'></i>
                </div>
                <div className='flex flex-col'>
                  <span className='text-2xl'>
                    {data.searchData.arrivalAirport?.city}({data.searchData.arrivalAirport?.IATA}) -{' '}
                    {data.searchData.departureAirport?.city}({data.searchData.departureAirport?.IATA})
                  </span>
                  <span>
                    {/* TODO: */}
                    {new Date(data?.searchData?.returnDate || '')?.toLocaleDateString('vi-VN', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>
              <div className='flex flex-col gap-y-8 p-8'>
                <DateSelect
                  value={new Date(data?.searchData?.returnDate || '').toString()}
                  onChange={onReturnDateChange}
                />
                <FlightSelect
                  // departureAirport={data.searchData.arrivalAirport!}
                  // arrivalAirport={data.searchData.departureAirport!}
                  // date={new Date(data?.searchData?.returnDate || '')}
                  flights={inboundFlights || []}
                  selectedFlightInfo={flightsData![FlightType.INBOUND]}
                  quantityLimit={totalPassengers}
                  timeLimit={flightsData[FlightType.OUTBOUND]?.flight.arrivalTime || undefined}
                  onChange={(info) => {
                    setFlightsData((prev) => {
                      prev[FlightType.INBOUND] = info
                      return { ...prev }
                    })
                  }}
                />
              </div>
            </div>
          </>
        )}
        <WizardBottomNavBar
          isForwardEnabled={isForwardAble}
          onClickForward={onClickForward}
          isBackwardEnabled={false}
        />
      </div>
    </div>
  )
}

export default FlightsSelection
