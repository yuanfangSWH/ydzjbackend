import Cookies from 'js-cookie'

const TokenKey = 'x_token'

export function getToken() {
  
//  var token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI6OjEiLCJleHAiOjE2MDU3NzkwNTcsImlhdCI6MTYwMzE4NzA1NywibmJmIjoxNjAzMTg3MDU3LCJzdWIiOiIxIn0.BSJRs8H1tXCcI2o1eElvRVRUSiP-EJY4ipxeQwCy5wU"
//   return token
   return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
