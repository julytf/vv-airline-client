import IUser from '@/interfaces/user.interface'
import axiosClient from './api/axios.service'

interface QueryOption {
  page?: number
  perPage?: number
  // sort?: string
  // order?: string
  // filter?: string
  q?: string
  // searchFields?: string
}

class UsersService {
  // accessToken: string = ''

  // async setAccessToken(accessToken: string) {
  //   this.accessToken = accessToken
  // }

  async getProfile(accessToken: string = '') {
    // accessToken = accessToken || this.accessToken
    const response = await axiosClient.get('/users/get-profile', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    // console.log(response)

    const user = response.data.data.user

    return user
  }
  async updateProfile(data: IUser) {
    // const accessToken = this.accessToken
    // console.log(accessToken)

    const response = await axiosClient.patch('/users/update-profile', data, {
      headers: {
        // 'Content-Type': 'application/json',
        // Authorization: `Bearer ${accessToken}`,
      },
    })
    console.log(response.data.data.user)

    const user = response.data.data.user

    return user
  }
  async getUsersPaginate({ page = 1, perPage = 20, q = '' }: QueryOption) {
    // const accessToken = this.accessToken

    const response = await axiosClient.get('/users', {
      params: {
        page,
        perPage,
        q,
      },
      headers: {
        // 'Content-Type': 'application/json',
        // Authorization: `Bearer ${accessToken}`,
      },
    })
    const data = response.data.data
    return data
  }
}

export default new UsersService()
