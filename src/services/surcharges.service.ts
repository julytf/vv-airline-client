import ISurcharge from '@/interfaces/flight/surcharge.interface'
import axiosClient from './api/axios.service'

class SurchargeService {
  async getSurcharges() {
    const response = await axiosClient.get('/surcharges', {})
    const data = response.data.data
    return data
  }
  async updateSurcharge(surchargeId: string, surcharge: ISurcharge) {
    const response = await axiosClient.patch(`/surcharges/${surchargeId}`, surcharge)
    const data = response.data.data
    return data
  }
}

export default new SurchargeService()
