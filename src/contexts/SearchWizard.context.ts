import { FlightType } from './../enums/flight.enums'
import IFlight from '@/interfaces/flight/flight.interface'
import { SeatClass } from './../enums/seat.enums'
import { FC, PropsWithChildren, createContext, useContext, useState } from 'react'
import ISeat from '@/interfaces/aircraft/seat.interface'
import IAirport from '@/interfaces/flight/airport.interface'
import { UserGender } from '@/enums/user.enums'
import { PassengerType } from '@/enums/passenger.enums'
import { FlightLegType } from '@/enums/flightLeg.enums'

export interface SearchData {
  departureAirportIATA: string
  arrivalAirportIATA: string

  departureAirport: IAirport | null
  arrivalAirport: IAirport | null

  departureDate: Date
  returnDate: Date | null

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
  } | null
  [FlightType.INBOUND]: {
    flight: IFlight
    seatClass: SeatClass
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
        },
        ...{
          lastName: string
          firstName: string
          dateOfBirth: Date
          gender: UserGender
        }[],
      ]
    | null
  [PassengerType.CHILD]:
    | {
        lastName: string
        firstName: string
        dateOfBirth: Date
        gender: UserGender
      }[]
    | null
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
