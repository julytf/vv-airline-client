import authService from './auth.service'
import usersService from './users.service'

export default {
  setAccessToken: (accessToken: string) => {
    console.log(accessToken)

    usersService.setAccessToken(accessToken)
    authService.setAccessToken(accessToken)
  },
}
