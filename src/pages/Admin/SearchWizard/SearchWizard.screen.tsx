import { FunctionComponent, lazy, useEffect, useState } from 'react'
import { Outlet, useSearchParams } from 'react-router-dom'

const Search = lazy(() => import('./components/Search/Search'))
const FlightsSelection = lazy(() => import('./components/FlightsSelection/FlightsSelection'))
const PassengersInformation = lazy(() => import('./components/PassengersInformation/PassengersInformation'))
const SeatsSelection = lazy(() => import('./components/SeatsSelection/SeatsSelection'))
const Payment = lazy(() => import('./components/Payment/Payment'))

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
import WizardNavBar from './components/Navbar/WizardNavBar'
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
    title: 'Tìm chuyến bay',
    icon: 'fa-magnifying-glass',
    // path: 'admin/booking/wizard/search',
    element: Search,
  },
  {
    index: 1,
    title: 'Chọn chuyến bay',
    icon: 'fa-plane',
    // path: 'admin/booking/wizard/flights-selection',
    element: FlightsSelection,
  },
  {
    index: 2,
    title: 'Thông tin hành khách',
    icon: 'fa-user',
    // path: 'admin/booking/wizard/passengers-information',
    element: PassengersInformation,
  },
  {
    index: 3,
    title: 'Chọn ghế',
    icon: 'fa-seat-airline',
    // path: 'admin/booking/wizard/seats-selection',
    element: SeatsSelection,
  },
  {
    index: 4,
    title: 'Chọn dịch vụ',
    icon: 'fa-suitcase-rolling',
    // path: '/wizard/services-selection',
    element: ServicesSelection,
  },
  {
    index: 5,
    title: 'Thanh toán',
    icon: 'fa-credit-card',
    // path: 'admin/booking/wizard/payment',
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
  // console.log('data', data)

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
    console.log('data.searchData.arrivalAirportIATA', data.searchData.arrivalAirportIATA)
    console.log('data.searchData.departureAirportIATA', data.searchData.departureAirportIATA)
    if (!data.searchData.arrivalAirportIATA || !data.searchData.departureAirportIATA) return

    searchWizardService.getAirport(data?.searchData?.departureAirportIATA).then((airport) => {
      setData((prev) => ({
        ...prev,
        searchData: {
          ...prev.searchData,
          departureAirport: airport,
        },
      }))
    })
    searchWizardService.getAirport(data?.searchData?.arrivalAirportIATA).then((airport) => {
      setData((prev) => ({
        ...prev,
        searchData: {
          ...prev.searchData,
          arrivalAirport: airport,
        },
      }))
    })
  }, [data?.searchData?.departureAirportIATA, data?.searchData?.arrivalAirportIATA])

  if (isLoading) {
    return <Loading />
  }
  return (
    <div className='p-6'>
      <div className='flex w-full flex-col items-center justify-center rounded-md border bg-white shadow-md'>
        <SearchWizardContext.Provider
          value={{
            data,
            setData,
            actions,
          }}
        >
          <div className='mt-8 max-w-5xl'>
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
      </div>
    </div>
  )
}

export default SearchWizard
