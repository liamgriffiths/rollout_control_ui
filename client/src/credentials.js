// @flow

// kind of a hacky password storage ;)

export default {
  set: (username, password): void => {
    // basic auth, base65
    const credentials = window.btoa(`${username}:${password}`)
    window.localStorage.setItem('credentials', credentials)
  },
  get: (): string => {
    return window.localStorage.getItem('credentials')
  },
  clear: (): void => {
    window.localStorage.clear('credentials')
  }
}
