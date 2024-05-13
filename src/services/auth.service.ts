import IUser from '@/interfaces/user.interface'
import axiosClient from './api/axios.service'
class AuthService {
  // accessToken: string = ''

  // async setAccessToken(accessToken: string) {
  //   this.accessToken = accessToken
  // }

  async register(data: IUser) {
    const response = await axiosClient.post('/auth/register', data, {
      headers: {
        // 'Content-Type': 'application/json',
      },
    })

    return response.data.data
  }
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
  async requestResetPasswordOTPEmail(email: string) {
    const response = await axiosClient.post(
      '/auth/request-reset-password-otp-email',
      {
        email,
      },
      {
        headers: {},
      },
    )

    return response.data
  }
  async verifyOTP(email: string, OTP: string) {
    const response = await axiosClient.post(
      '/auth/verify-otp',
      {
        email,
        OTP,
      },
      {
        headers: {},
      },
    )

    return response.data
  }
  async resetPasswordWithOTP(email: string, OTP: string, newPassword: string) {
    const response = await axiosClient.post(
      '/auth/reset-password-with-otp',
      {
        email,
        OTP,
        newPassword,
      },
      {
        headers: {},
      },
    )

    return response.data
  }
}

export default new AuthService()
