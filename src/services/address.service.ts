import axiosClient from './api/axios.service'

class AddressService {
  async getCountries() {
    const response = await axiosClient.get('/address/countries', {})
    const data = response.data.data
    return data
  }
  async getProvinces(countryCode?: string) {
    const response = await axiosClient.get('/address/provinces', { params: { countryCode } })
    const data = response.data.data
    return data
  }
  async getDistricts(provinceCode?: string) {
    const response = await axiosClient.get('/address/districts', { params: { provinceCode } })
    const data = response.data.data
    return data
  }
  async getWards(districtCode?: string) {
    const response = await axiosClient.get('/address/wards', { params: { districtCode } })
    const data = response.data.data
    return data
  }
}

export default new AddressService()
