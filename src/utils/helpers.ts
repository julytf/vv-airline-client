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
  // console.log('query', query)
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
    // console.log('path', path)
  }

  return path
}

export const numberToAlphabet = (number: number) => {
  // Assuming input is a number between 1 and 26
  if (number < 1 || number > 26) {
    console.error('Invalid input. Please enter a number between 1 and 26.')
  }
  return String.fromCharCode(64 + number) // 65 is the ASCII code for 'A'
}

export const countNonEmpty = (arr: unknown[]) => arr.filter((item) => item).length

export function truncate(str: string, n: number) {
  return str?.length > n ? str.slice(0, n - 1) + '...' : str
}

export const minNotNull = (...arr: (number | null)[]) => Math.min(...arr.filter((item) => item !== null))
