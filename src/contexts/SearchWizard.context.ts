import { FlightType } from './../enums/flight.enums'
import IFlight from '@/interfaces/flight/flight.interface'
import { SeatClass } from './../enums/seat.enums'
import { FC, PropsWithChildren, createContext, useContext, useState } from 'react'
import ISeat from '@/interfaces/aircraft/seat.interface'
import IAirport from '@/interfaces/flight/airport.interface'
import { UserGender } from '@/enums/user.enums'
import { PassengerType } from '@/enums/passenger.enums'
import { FlightLegType } from '@/enums/flightLeg.enums'
import ISurcharge from '@/interfaces/flight/surcharge.interface'

export interface SearchData {
  departureAirportIATA: string
  arrivalAirportIATA: string

  departureAirport: IAirport | null
  arrivalAirport: IAirport | null

  departureDate: string
  returnDate: string | null

  isRoundTrip: boolean

  passengers: {
    [PassengerType.ADULT]: number
    [PassengerType.CHILD]: number
    // infant: number
  }
}

export interface FlightsData {
  // departureFlights: IFlight[] | null
  // returnFlights: IFlight[] | null

  [FlightType.OUTBOUND]: {
    flight: IFlight
    seatClass: SeatClass
    price: number
  } | null
  [FlightType.INBOUND]: {
    flight: IFlight
    seatClass: SeatClass
    price: number
  } | null
}
export interface PassengersData {
  [PassengerType.ADULT]:
    | [
        {
          lastName: string
          firstName: string
          dateOfBirth: Date
          gender: UserGender
          phoneNumber: string
          email: string
          // type: PassengerType
        },
        ...{
          lastName: string
          firstName: string
          dateOfBirth: Date
          gender: UserGender
          // type: PassengerType
        }[],
      ]
    | []
  [PassengerType.CHILD]: {
    lastName: string
    firstName: string
    dateOfBirth: Date
    gender: UserGender
    // type: PassengerType
  }[]
}
export interface SeatsData {
  [FlightType.OUTBOUND]: {
    [FlightLegType.DEPARTURE]: {
      [PassengerType.ADULT]: ISeat[]
      [PassengerType.CHILD]: ISeat[]
    }
    [FlightLegType.TRANSIT]: {
      [PassengerType.ADULT]: ISeat[]
      [PassengerType.CHILD]: ISeat[]
    }
  }
  [FlightType.INBOUND]: {
    [FlightLegType.DEPARTURE]: {
      [PassengerType.ADULT]: ISeat[]
      [PassengerType.CHILD]: ISeat[]
    }
    [FlightLegType.TRANSIT]: {
      [PassengerType.ADULT]: ISeat[]
      [PassengerType.CHILD]: ISeat[]
    }
  }
}
export interface WizardData {
  currentStep: number
  searchData: SearchData
  flightsData: FlightsData
  passengersData: PassengersData
  seatsData: SeatsData
  additionalData: {
    surcharges: ISurcharge[] | null
  }
}
export interface ContextData {
  data: WizardData
  setData: React.Dispatch<React.SetStateAction<WizardData>>
  actions: {
    nextStep: () => void
    prevStep: () => void
    toStep: (step: number) => void
  }
}

const SearchWizardContext = createContext<ContextData | undefined>(undefined)

const useSearchWizard = (): ContextData => {
  const contextData = useContext(SearchWizardContext)

  if (!contextData) {
    throw new Error('useSearchWizard must be used within a SearchWizardProvider')
  }

  return contextData
}

export { useSearchWizard }

export default SearchWizardContext
