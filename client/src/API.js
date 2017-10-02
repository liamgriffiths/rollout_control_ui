// @flow

type Method = 'get' | 'post' | 'put' | 'delete' | 'patch'
const request = async (method: Method, path: string) => {
  const url = new URL(`${window.location.origin}${path}`)
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  const res = await fetch(url, { method, headers })
  const json = await res.json()
  return json
}

type Config = {
  username: string,
  password: string
}

export default (config: Config) => {
  
  return {
    getFeatures: async () => {
      return request('get', 'rollout/features')
    }
  }

}
