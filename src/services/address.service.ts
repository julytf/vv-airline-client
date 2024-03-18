import axiosClient from './api/axios.service'

class AddressService {
  async getCountries() {
    const response = await axiosClient.get('/address/get-countries', {})
    const data = response.data.data
    return data
  }
}

export default new AddressService()
