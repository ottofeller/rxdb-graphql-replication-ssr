import {Auth0UserProfile} from 'auth0-js'
let mockedIsAuthenticated = false
let mockedRole = 'any'
let mockedUser = null

export default {
  mockIsAuthenticated: (isAuthenticated: boolean) => { mockedIsAuthenticated = isAuthenticated },
  mockRole           : (role: 'any' | 'student' | 'teacher') => { mockedRole = role },
  mockUser           : (user: Auth0UserProfile) => { mockedUser = user },
}

export const useAuth = () => ({
  authResult: {
    idToken       : mockedIsAuthenticated ? 'idtoken' : null,
    idTokenPayload: {'https://hasura.io/jwt/claims': {'x-hasura-role': 'orgadmin'}},
  },

  isAuthenticated: () => mockedIsAuthenticated,

  user: mockedUser || (mockedRole ? {
    'https://hasura.io/jwt/claims': {
      'x-hasura-role': mockedRole,
    },
  } : {}),
})
