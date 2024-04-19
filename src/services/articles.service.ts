import { PassengerType } from '@/enums/passenger.enums'
import axiosClient from './api/axios.service'
import { FlightLegType } from '@/enums/flightLeg.enums'
import { FlightType } from '@/enums/flight.enums'
import { UserGender } from '@/enums/user.enums'
import { TicketClass } from '@/enums/ticket.enums'
import IArticle from '@/interfaces/article/article.interface'

interface QueryOption {
  page?: number
  perPage?: number
  // sort?: string
  // order?: string
  // filter?: string
  q?: string
  // searchFields?: string
}

class ArticlesService {
  async getArticlesPaginate({ page = 1, perPage = 20, q = '' }: QueryOption) {
    // const accessToken = this.accessToken

    const response = await axiosClient.get('/articles', {
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
  async getArticle(id: string) {
    const response = await axiosClient.get(`/articles/${id}`)
    return response.data.data.doc
  }
  async getFeaturedArticles() {
    const response = await axiosClient.get(`/articles/get-featured`)
    return response.data.data
  }
  async getLatestArticles() {
    const response = await axiosClient.get(`/articles/get-latest`)
    return response.data.data
  }

  async createArticle(data: IArticle) {
    const response = await axiosClient.post('/articles', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  }
  async updateArticle(data: Partial<IArticle>) {
    const response = await axiosClient.patch(`/articles/${data._id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  }
}

export default new ArticlesService()
