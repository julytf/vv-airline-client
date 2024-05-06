import WizardNavBar from '@/components/SearchWizard/NavBar/WizardNavBar'
import { FunctionComponent, lazy, useEffect, useState } from 'react'
import { Outlet, useSearchParams } from 'react-router-dom'

const FlightsSelection = lazy(() => import('@/pages/SearchWizard/components/FlightsSelection/FlightsSelection'))
const PassengersInformation = lazy(
  () => import('@/pages/SearchWizard/components/PassengersInformation/PassengersInformation'),
)
const SeatsSelection = lazy(() => import('@/pages/SearchWizard/components/SeatsSelection/SeatsSelection'))
const Payment = lazy(() => import('@/pages/SearchWizard/components/Payment/Payment'))
import SearchWizardContext, { WizardData } from '@/contexts/SearchWizard.context'
import searchWizardService from '@/services/searchWizard.service'
import IFlight from '@/interfaces/flight/flight.interface'
import ISeat from '@/interfaces/aircraft/seat.interface'
import WizardBottomNavBar from '@/components/SearchWizard/NavBar/WizardBottomNavBar'
import Loading from '@/components/ui/Loading'
import { FlightType } from '@/enums/flight.enums'
import { PassengerType } from '@/enums/passenger.enums'
import { FlightLegType } from '@/enums/flightLeg.enums'
import surchargesService from '@/services/surcharges.service'
import ServicesSelection from './components/ServicesSelection/ServicesSelection'
import mealPlansService from '@/services/mealPlans.service'

export type SearchWizardStep = {
  index: number
  title: string
  icon: string
  // path: string
  element: FunctionComponent
}

export const searchWizardSteps: SearchWizardStep[] = [
  {
    index: 0,
    title: 'Chọn chuyến bay',
    icon: 'fa-plane',
    // path: '/wizard/flights-selection',
    element: FlightsSelection,
  },
  {
    index: 1,
    title: 'Thông tin hành khách',
    icon: 'fa-user',
    // path: '/wizard/passengers-information',
    element: PassengersInformation,
  },
  {
    index: 2,
    title: 'Chọn ghế',
    icon: 'fa-seat-airline',
    // path: '/wizard/seats-selection',
    element: SeatsSelection,
  },
  {
    index: 3,
    title: 'Chọn dịch vụ',
    icon: 'fa-suitcase-rolling',
    // path: '/wizard/services-selection',
    element: ServicesSelection,
  },
  {
    index: 4,
    title: 'Thanh toán',
    icon: 'fa-credit-card',
    // path: '/wizard/payment',
    element: Payment,
  },
]

interface SearchWizardProps {}

const SearchWizard: FunctionComponent<SearchWizardProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [isLoading, setIsLoading] = useState(false)

  const [data, setData] = useState<WizardData>({
    currentStep: 0,
    searchData: {
      departureAirport: null,
      arrivalAirport: null,

      departureAirportIATA: searchParams.get('departureAirportIATA') || '',
      arrivalAirportIATA: searchParams.get('arrivalAirportIATA') || '',

      departureDate: searchParams.get('departureDate') || '',
      returnDate: searchParams.get('returnDate') || '',

      isRoundTrip: Boolean(searchParams.get('returnDate') || '') || false,

      passengersQuantity: {
        [PassengerType.ADULT]: Number(searchParams.get('passengersQuantity.ADULT')) || 1,
        [PassengerType.CHILD]: Number(searchParams.get('passengersQuantity.CHILD')) || 0,
      },
    },
    flightsData: {
      // departureFlights: null,
      // returnFlights: null,

      [FlightType.OUTBOUND]: null,
      [FlightType.INBOUND]: null,
    },
    passengersData: {
      contactInfo: {
        email: '',
        phoneNumber: '',
      },
      [PassengerType.ADULT]: [],
      [PassengerType.CHILD]: [],
    },
    seatsData: {
      [FlightType.OUTBOUND]: {
        [FlightLegType.DEPARTURE]: {
          [PassengerType.ADULT]: [],
          [PassengerType.CHILD]: [],
        },
        [FlightLegType.TRANSIT]: {
          [PassengerType.ADULT]: [],
          [PassengerType.CHILD]: [],
        },
      },
      [FlightType.INBOUND]: {
        [FlightLegType.DEPARTURE]: {
          [PassengerType.ADULT]: [],
          [PassengerType.CHILD]: [],
        },
        [FlightLegType.TRANSIT]: {
          [PassengerType.ADULT]: [],
          [PassengerType.CHILD]: [],
        },
      },
    },
    additionalData: {
      surcharges: [],
      mealPlans: [],
    },
  })
  console.log('data', data)

  const CurrentForm = searchWizardSteps[data.currentStep].element

  const nextStep = () => {
    setData((prev) => ({ ...prev, currentStep: Math.min(searchWizardSteps.length - 1, prev.currentStep + 1) }))
  }

  const prevStep = () => {
    setData((prev) => ({ ...prev, currentStep: Math.max(0, prev.currentStep - 1) }))
  }

  const toStep = (step: number) => {
    setData((prev) => ({ ...prev, currentStep: Math.max(0, Math.min(searchWizardSteps.length - 1, step)) }))
  }

  const actions = {
    nextStep,
    prevStep,
    toStep,
  }

  // Load Surcharges and Meal Plans
  useEffect(() => {
    surchargesService.getSurcharges().then((surcharges) => {
      setData((prev) => {
        prev.additionalData.surcharges = surcharges
        return { ...prev }
      })
    })
    mealPlansService.getMealPlans().then((mealPlans) => {
      setData((prev) => {
        prev.additionalData.mealPlans = mealPlans
        return { ...prev }
      })
    })
  }, [])

  // Load Airports
  useEffect(() => {
    searchWizardService.getAirport(data?.searchData?.departureAirportIATA || '').then((airport) => {
      setData((prev) => ({
        ...prev,
        searchData: {
          ...prev.searchData,
          departureAirport: airport,
        },
      }))
    })
    searchWizardService.getAirport(data?.searchData?.arrivalAirportIATA || '').then((airport) => {
      setData((prev) => ({
        ...prev,
        searchData: {
          ...prev.searchData,
          arrivalAirport: airport,
        },
      }))
    })
  }, [data?.searchData?.departureAirportIATA, data?.searchData?.arrivalAirportIATA])

  // update Loading
  useEffect(() => {
    setIsLoading(
      !data.searchData.arrivalAirport || !data.searchData.departureAirport || data.additionalData.surcharges === null,
    )
  }, [data.searchData.arrivalAirport, data.searchData.departureAirport, data.additionalData.surcharges])

  useEffect(() => {
    setData((prev) => {
      prev.searchData = {
        ...prev.searchData,

        departureAirportIATA: searchParams.get('departureAirportIATA') || '',
        arrivalAirportIATA: searchParams.get('arrivalAirportIATA') || '',

        departureDate: searchParams.get('departureDate') || '',
        returnDate: searchParams.get('returnDate') || '',

        isRoundTrip: Boolean(searchParams.get('returnDate') || '') || false,

        passengersQuantity: {
          [PassengerType.ADULT]: Number(searchParams.get('passengersQuantity.ADULT')) || 0,
          [PassengerType.CHILD]: Number(searchParams.get('passengersQuantity.CHILD')) || 0,
        },
      }
      return { ...prev }
    })
  }, [
    searchParams.get('departureAirportIATA'),
    searchParams.get('arrivalAirportIATA'),
    searchParams.get('departureDate'),
    searchParams.get('returnDate'),
    searchParams.get('returnDate'),
    searchParams.get('passengersQuantity.ADULT'),
    searchParams.get('passengersQuantity.CHILD'),
  ])

  if (isLoading) {
    return <Loading />
  }
  return (
    <SearchWizardContext.Provider
      value={{
        data,
        setData,
        actions,
      }}
    >
      <div className='mt-8'>
        <WizardNavBar searchWizardSteps={searchWizardSteps} currentStep={data.currentStep} />
        <div className='mt-8 w-full'>
          <CurrentForm />
          <div className='pb-16 pr-6'>
            {/* <WizardBottomNavBar
              isForwardEnabled={isForwardAble}
              onClickForward={nextStep}
              isBackwardEnabled={isBackwardAble}
              onClickBackward={prevStep}
            /> */}
          </div>
        </div>
      </div>
    </SearchWizardContext.Provider>
  )
}

export default SearchWizard
