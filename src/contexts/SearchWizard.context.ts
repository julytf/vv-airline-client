import { FlightType } from './../enums/flight.enums'
import IFlight from '@/interfaces/flight/flight.interface'
import { FC, PropsWithChildren, createContext, useContext, useState } from 'react'
import ISeat from '@/interfaces/aircraft/seat.interface'
import IAirport from '@/interfaces/flight/airport.interface'
import { UserGender } from '@/enums/user.enums'
import { PassengerType } from '@/enums/passenger.enums'
import { FlightLegType } from '@/enums/flightLeg.enums'
import ISurcharge from '@/interfaces/flight/surcharge.interface'
import { TicketClass, TicketType } from '@/enums/ticket.enums'
import IMealPlan from '@/interfaces/flight/mealPlan.interface'

export interface SearchData {
  departureAirportIATA: string
  arrivalAirportIATA: string

  departureAirport: IAirport | null
  arrivalAirport: IAirport | null

  departureDate: string
  returnDate: string | null

  isRoundTrip: boolean

  passengersQuantity: {
    [PassengerType.ADULT]: number
    [PassengerType.CHILD]: number
  }
}

export interface FlightsData {
  // departureFlights: IFlight[] | null
  // returnFlights: IFlight[] | null

  [FlightType.OUTBOUND]: {
    flight: IFlight
    ticketClass: TicketClass
    ticketType: TicketType
    price: number
  } | null
  [FlightType.INBOUND]: {
    flight: IFlight
    ticketClass: TicketClass
    ticketType: TicketType
    price: number
  } | null
}
export interface PassengersData {
  contactInfo: {
    email: string
    phoneNumber: string
  }
  [PassengerType.ADULT]: {
    lastName: string
    firstName: string
    dateOfBirth: string
    gender: UserGender
    // type: PassengerType
  }[]
  [PassengerType.CHILD]: {
    lastName: string
    firstName: string
    dateOfBirth: string
    gender: UserGender
    // type: PassengerType
  }[]
}
export interface SeatsData {
  [FlightType.OUTBOUND]: {
    [FlightLegType.DEPARTURE]: {
      [PassengerType.ADULT]: {
        seat: ISeat
        services: {
          baggage: {
            quantity: number
            charge: number
          }
          meal: {
            name: string
            charge: number
          }
        }
      }[]
      [PassengerType.CHILD]: {
        seat: ISeat
        services: {
          baggage: {
            quantity: number
            charge: number
          }
          meal: {
            name: string
            charge: number
          }
        }
      }[]
    }
    [FlightLegType.TRANSIT]: {
      [PassengerType.ADULT]: {
        seat: ISeat
        services: {
          baggage: {
            quantity: number
            charge: number
          }
          meal: {
            name: string
            charge: number
          }
        }
      }[]
      [PassengerType.CHILD]: {
        seat: ISeat
        services: {
          baggage: {
            quantity: number
            charge: number
          }
          meal: {
            name: string
            charge: number
          }
        }
      }[]
    }
  }
  [FlightType.INBOUND]: {
    [FlightLegType.DEPARTURE]: {
      [PassengerType.ADULT]: {
        seat: ISeat
        services: {
          baggage: {
            quantity: number
            charge: number
          }
          meal: {
            name: string
            charge: number
          }
        }
      }[]
      [PassengerType.CHILD]: {
        seat: ISeat
        services: {
          baggage: {
            quantity: number
            charge: number
          }
          meal: {
            name: string
            charge: number
          }
        }
      }[]
    }
    [FlightLegType.TRANSIT]: {
      [PassengerType.ADULT]: {
        seat: ISeat
        services: {
          baggage: {
            quantity: number
            charge: number
          }
          meal: {
            name: string
            charge: number
          }
        }
      }[]
      [PassengerType.CHILD]: {
        seat: ISeat
        services: {
          baggage: {
            quantity: number
            charge: number
          }
          meal: {
            name: string
            charge: number
          }
        }
      }[]
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
    surcharges: ISurcharge[]
    mealPlans: IMealPlan[]
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
