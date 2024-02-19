import { SeatClass } from './../enums/seat.enums'
import { FC, PropsWithChildren, createContext, useContext, useState } from 'react'

interface WizardData {
  currentStep: number
  data?: {
    searchData: {
      departureAirport: string
      destinationAirport: string
      departureDate: Date
      destinationDate: Date
      isRoundTrip: boolean
      passengers: {
        adult: number
        child: number
        // infant: number
      }
    }
    flightsData: {
      departureFlight: {
        id: string
        seatClass: SeatClass
      }
      returnFlight: {
        id: string
        seatClass: SeatClass
      }
    }
    passengersData: {
      adultsInfo: [
        {
          lastName: string
          firstName: string
          dateOfBirth: Date
          gender: boolean
          phoneNumber: string
          email: string
        },
        ...{
          lastName: string
          firstName: string
          dateOfBirth: Date
          gender: boolean
        }[],
      ]
      childrenInfo: {
        lastName: string
        firstName: string
        dateOfBirth: Date
        gender: boolean
      }[]
    }
    seatsData: {
      departureFlight: {
        leg1: {
          adultsSeats: string[]
          childrenSeats: string[]
        }
        leg2: {
          adultsSeats: string[]
          childrenSeats: string[]
        }
      }
      returnFlight: {
        leg1: {
          adultsSeats: string[]
          childrenSeats: string[]
        }
        leg2: {
          adultsSeats: string[]
          childrenSeats: string[]
        }
      }
    }
  }
}

const SearchWizardContext = createContext<WizardData | undefined>(undefined)

const useSearchWizard = (): WizardData => {
  const wizardData = useContext(SearchWizardContext)

  if (!wizardData) {
    throw new Error('useSearchWizard must be used within a SearchWizardProvider')
  }

  return wizardData
}

export { useSearchWizard }

export default SearchWizardContext
