type RouteOptions = {
  params?: {
    [key: string]: string
  }
  query?: {
    [key: string]: string
  }
}

export const route = (path: string, { params, query }: RouteOptions = {}) => {
  Object.entries(params || {}).forEach(([key, value]) => {
    path = path.replace(`:${key}`, value.toString())
  })

  if (query) {
    const params = new URLSearchParams(query)

    path = `${path}?${params.toString()}`
  }

  return path
}
