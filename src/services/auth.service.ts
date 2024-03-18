import axiosClient from './api/axios.service'
class AuthService {
  // accessToken: string = ''

  // async setAccessToken(accessToken: string) {
  //   this.accessToken = accessToken
  // }

  async login(credentials: { email: string; password: string }) {
    const response = await axiosClient.post('/auth/login', credentials, {
      headers: {
        // 'Content-Type': 'application/json',
      },
    })

    const data = response.data.data

    return data
  }
  async changePassword(accessToken: string, data: { oldPassword: string; newPassword: string }) {
    console.log(accessToken)

    const response = await axiosClient.patch('/auth/change-password', data, {
      headers: {
        // Authorization: `Bearer ${accessToken}`,
      },
    })
    console.log(response.data.data.user)
  }
}

export default new AuthService()
