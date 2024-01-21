import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import config from '@/config'

const baseAPIURL: string = config.baseAPIURL
const getToken = () => localStorage.getItem('token')
const getTokenAdmin = () => localStorage.getItem('tokenAdmin')

const axiosClient = axios.create({
  baseURL: baseAPIURL,
})

axiosClient.interceptors.request.use(async (value: InternalAxiosRequestConfig) => {
  value.headers['Content-Type'] = 'application/json'
  value.headers['authorization'] = `Bearer ${getToken()}`
  value.headers['authentizationAdmin'] = `Bearer ${getTokenAdmin()}`

  return value
})

export default axiosClient
