/**
 * Is a user authenticated to the app or not
 */
export function isUserAuthenticated() {
  const userToken = localStorage.getItem('userToken')
  return !!userToken
}
