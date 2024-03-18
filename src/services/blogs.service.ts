import { PassengerType } from '@/enums/passenger.enums'
import axiosClient from './api/axios.service'
import { FlightLegType } from '@/enums/flightLeg.enums'
import { FlightType } from '@/enums/flight.enums'
import { UserGender } from '@/enums/user.enums'
import { SeatClass } from '@/enums/seat.enums'
import IBlog from '@/interfaces/blog/blog.interface'

interface QueryOption {
  page?: number
  perPage?: number
  // sort?: string
  // order?: string
  // filter?: string
  q?: string
  // searchFields?: string
}

class BlogsService {
  async getBlogsPaginate({ page = 1, perPage = 20, q = '' }: QueryOption) {
    // const accessToken = this.accessToken

    const response = await axiosClient.get('/blogs', {
      params: {
        page,
        perPage,
        q,
      },
      headers: {},
    })
    const data = response.data.data
    return data
  }
  async getBlog(id: string) {
    const response = await axiosClient.get(`/blogs/${id}`)
    return response.data.data.doc
  }

  async createBlog(data: IBlog) {
    const response = await axiosClient.post('/blogs', data)
    return response.data
  }
  async updateBlog(data: IBlog) {
    const response = await axiosClient.patch(`/blogs/${data._id}`, data)
    return response.data
  }
}

export default new BlogsService()
