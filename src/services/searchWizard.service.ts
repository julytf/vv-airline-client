import axiosClient from './api/axios.service'

class searchWizardService {
  accessToken: string = ''

  async setAccessToken(accessToken: string) {
    this.accessToken = accessToken
  }

  // async getFlightRoutes() {
  //   const response = await axiosClient.get('/search-wizard/get-flight-routes', {
  //     headers: {},
  //   })

  //   const flightRoutes = response.data.data

  //   return flightRoutes
  // }
  async getAirport(IATA: string) {
    const response = await axiosClient.get('/search-wizard/get-airport', {
      params: {
        IATA,
      },
      headers: {},
    })

    const airport = response.data.data

    return airport
  }

  async getAirports() {
    const response = await axiosClient.get('/search-wizard/get-airports', {
      headers: {},
    })

    const airport = response.data.data

    return airport
  }

  async getFlights({
    departureAirportIATA,
    arrivalAirportIATA,
    departureDate,
    passengersAdults,
    passengersChildren,
  }: {
    departureAirportIATA: string
    arrivalAirportIATA: string
    departureDate: Date
    passengersAdults: number
    passengersChildren: number
  }) {
    const response = await axiosClient.get('/search-wizard/get-flights', {
      params: {
        departureAirportIATA,
        arrivalAirportIATA,
        departureDate,
        passengersAdults,
        passengersChildren,
      },
      headers: {},
    })

    const flightRoutes = response.data.data

    return flightRoutes
  }

  // async getSeatMap() {
  //   const response = await axiosClient.get('/search-wizard/get-seat-map', {
  //     params: {},
  //     headers: {},
  //   })

  //   const seatMap = response.data.data

  //   return seatMap
  // }
}

export default new searchWizardService()
