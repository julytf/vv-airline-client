import { FunctionComponent, useEffect, useState } from 'react'
import { SeatClass } from '@/enums/seat.enums'
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
import { FlightsData, useSearchWizard } from '@/contexts/SearchWizard.context'
import { FlightType } from '@/enums/flight.enums'
import { PassengerType } from '@/enums/passenger.enums'
import { FlightLegType } from '@/enums/flightLeg.enums'
import Loading from '@/components/ui/Loading'
import FlightSelect from './FlightSelect'

interface FlightsSelectionProps {}

const FlightsSelection: FunctionComponent<FlightsSelectionProps> = () => {
  const { data, setData, actions } = useSearchWizard()
  // console.log('data', data)

  const [isLoading, setIsLoading] = useState(true)

  const [flightsData, setFlightsData] = useState<FlightsData>({
    [FlightType.OUTBOUND]: data.flightsData[FlightType.OUTBOUND] || null,
    [FlightType.INBOUND]: data.flightsData[FlightType.INBOUND] || null,
  })

  const isForwardAble =
    Boolean(flightsData[FlightType.OUTBOUND]) &&
    (!data.searchData.isRoundTrip || Boolean(flightsData[FlightType.INBOUND]))

  const [departureFlights, setDepartureFlights] = useState<IFlight[] | null>(null)
  const [returnFlights, setReturnFlights] = useState<IFlight[] | null>(null)

  console.log('departureFlights', departureFlights)
  console.log('returnFlights', returnFlights)

  // Load Flights
  useEffect(() => {
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
        setDepartureFlights(flights)
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
          setReturnFlights(flights)
          // setIsLoading(false)
        })

    setIsLoading(false)
  }, [
    data.searchData.departureAirportIATA,
    data.searchData.arrivalAirportIATA,
    data.searchData.departureDate,
    data.searchData.returnDate,
    data.searchData.passengers[PassengerType.ADULT],
    data.searchData.passengers[PassengerType.CHILD],
  ])

  const onClickForward = () => {
    setData((prev) => {
      prev.flightsData = flightsData
      return { ...prev }
    })

    actions.nextStep()
  }

  // update IsLoading
  useEffect(() => {
    setIsLoading(departureFlights == null || (data.searchData.isRoundTrip && returnFlights == null))
  }, [departureFlights, returnFlights])

  if (isLoading) {
    return <Loading />
  }
  return (
    <div className='mx-auto my-16 flex max-w-screen-xl flex-col items-center justify-center gap-y-6'>
      <SearchCard className='shadow-lg' />
      <div className='mt-16 flex w-full max-w-screen-xl flex-col gap-y-8'>
        <FlightSelect
          departureAirport={data.searchData.departureAirport!}
          arrivalAirport={data.searchData.arrivalAirport!}
          date={new Date(data?.searchData?.departureDate)}
          flights={departureFlights || []}
          selectedFlightInfo={flightsData![FlightType.OUTBOUND]}
          onChange={(info) => {
            setFlightsData((prev) => {
              prev[FlightType.OUTBOUND] = info
              return { ...prev }
            })
          }}
        />
        {data?.searchData?.isRoundTrip && (
          <FlightSelect
            departureAirport={data.searchData.arrivalAirport!}
            arrivalAirport={data.searchData.departureAirport!}
            date={new Date(data?.searchData?.returnDate || '')}
            flights={returnFlights || []}
            selectedFlightInfo={flightsData![FlightType.INBOUND]}
            onChange={(info) => {
              setFlightsData((prev) => {
                prev[FlightType.INBOUND] = info
                return { ...prev }
              })
            }}
          />
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
