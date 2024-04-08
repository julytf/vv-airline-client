import axiosClient from './api/axios.service'

class SurchargeService {
  async getSurcharges() {
    const response = await axiosClient.get('/surcharges', {})
    const data = response.data.data
    return data
  }
}

export default new SurchargeService()
