import axiosClient from './api/axios.service'

export default {
  async getProfile(accessToken: string) {
    const response = await axiosClient.get('/auth/get-profile', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    // console.log(response)

    const user = response.data.data.user

    return user
  },
  async login(credentials: { email: string; password: string }) {
    const response = await axiosClient.post('/auth/login', credentials, {})
    // console.log(response)

    // const user = response.data.data.user
    const data = response.data.data

    return data
  },
}
