import axiosClient from './api/axios.service'

export default {
  async login(credentials: { email: string; password: string }) {
    const response = await axiosClient.post('/auth/login', credentials, {})
    // console.log(response)

    // const user = response.data.data.user
    const data = response.data.data

    return data
  },
}
