import { PassengerType } from '@/enums/passenger.enums'
import axiosClient from './api/axios.service'
import { FlightLegType } from '@/enums/flightLeg.enums'
import { FlightType } from '@/enums/flight.enums'
import { UserGender } from '@/enums/user.enums'
import { TicketClass, TicketType } from '@/enums/ticket.enums'

interface SearchData {
  departureAirportIATA: string
  arrivalAirportIATA: string

  departureDate: string
  returnDate: string | null

  isRoundTrip: boolean

  passengersQuantity: {
    [PassengerType.ADULT]: number
    [PassengerType.CHILD]: number
    // infant: number
  }
}

interface FlightsData {
  [FlightType.OUTBOUND]: {
    flight: string
    ticketClass: TicketClass
    ticketType: TicketType
  }
  [FlightType.INBOUND]: {
    flight: string
    ticketClass: TicketClass
    ticketType: TicketType
  } | null
}
interface PassengersData {
  contactInfo: {
    email: string
    phoneNumber: string
  }
  [PassengerType.ADULT]: {
    lastName: string
    firstName: string
    dateOfBirth: string
    gender: UserGender
  }[]
  [PassengerType.CHILD]: {
    lastName: string
    firstName: string
    dateOfBirth: string
    gender: UserGender
  }[]
}
interface SeatsData {
  [FlightType.OUTBOUND]: {
    [FlightLegType.DEPARTURE]: {
      [PassengerType.ADULT]: string[]
      [PassengerType.CHILD]: string[]
    }
    [FlightLegType.TRANSIT]: {
      [PassengerType.ADULT]: string[]
      [PassengerType.CHILD]: string[]
    }
  }
  [FlightType.INBOUND]: {
    [FlightLegType.DEPARTURE]: {
      [PassengerType.ADULT]: string[]
      [PassengerType.CHILD]: string[]
    }
    [FlightLegType.TRANSIT]: {
      [PassengerType.ADULT]: string[]
      [PassengerType.CHILD]: string[]
    }
  }
}
export interface BookingData {
  searchData: SearchData
  flightsData: FlightsData
  passengersData: PassengersData
  seatsData: SeatsData
}

class bookingService {
  // accessToken: string = ''

  // async setAccessToken(accessToken: string) {
  //   this.accessToken = accessToken
  // }

  async createTempBooking(bookingData: BookingData) {
    // const accessToken = this.accessToken

    const response = await axiosClient.post('/booking/create-temp-booking', bookingData, {
      headers: {
        // Authorization: `Bearer ${accessToken}`,
      },
    })

    const booking = response.data.data.booking

    return booking
  }
}

export default new bookingService()
