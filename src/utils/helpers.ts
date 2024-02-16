import { userRoutes } from '@/routers/user.router'
import { adminRoutes } from '@/routers/admin.router'
import { matchRoutes } from 'react-router-dom'

type RouteOptions = {
  params?: {
    [key: string]: string
  }
  query?: {
    [key: string]: string
  }
}

export const route = (path: string, { params, query }: RouteOptions = {}) => {
  const routes = [...userRoutes, ...adminRoutes]
  const matchedRoutes = matchRoutes(routes, path)

  if (!matchedRoutes?.length) {
    throw new Error(`Route ${path} not found`)
  }

  Object.entries(params || {}).forEach(([key, value]) => {
    path = path.replace(`:${key}`, value.toString())
  })

  if (query) {
    const params = new URLSearchParams(query)

    path = `${path}?${params.toString()}`
  }

  return path
}
