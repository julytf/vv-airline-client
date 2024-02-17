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

export default {
  async getProfile(accessToken: string) {
    const response = await axiosClient.get('/users/get-profile', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    // console.log(response)

    const user = response.data.data.user

    return user
  },
  async updateProfile(accessToken: string, data: IUser) {
    console.log(accessToken)

    const response = await axiosClient.patch('/users/update-profile', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
    console.log(response.data.data.user)

    const user = response.data.data.user

    return user
  },
  async getUser({ page = 1, perPage = 20, q = '' }: QueryOption) {
    const response = await axiosClient.get('/users', {
      params: {
        page,
        perPage,
        q,
      },
    })
    const data = response.data.data
    return data
  },
}
