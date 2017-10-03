// @flow
import type { Feature } from './types'

type Method = 'get' | 'post' | 'put' | 'delete'
const request = async (method: Method, path: string, body: ?Object) => {
  const url = new URL(`${window.location.origin}${path}`)

  const username = 'admin'
  const password = 'password'
  const credentials = window.btoa(`${username}:${password}`)

  const headers = new Headers()
  headers.append('Accept', 'application/json')
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', `Basic ${credentials}`)

  const options = body ? { method, headers, body: JSON.stringify(body) } : { method, headers }

  const res = await fetch(url, options)

  if (res.ok) {
    if (method === 'get') {
      const json = await res.json()
      return json
    }
  } else {
    throw new Error('request failed')
  }
}

export default {
  all: (): Array<Feature> => {
    return request('get', '/rollout/features')
  },

  find: (featureId: string): Feature => {
    return request('get', `/rollout/features/${featureId}`)
  },

  setPercentage: (featureId: string, percentage: number) => {
    return request('put', `/rollout/features/${featureId}`, { percentage })
  },

  users: (featureId: string): * => {
    return request('get', `/rollout/features/${featureId}/users`)
  },

  addUser: (featureId: string, userId: number): * => {
    return request('post', `/rollout/features/${featureId}/users`, { user_id: userId })
  },

  removeUser: (featureId: string, userId: number): * => {
    return request('delete', `/rollout/features/${featureId}/users/${userId}`)
  },

  groups: (featureId: string): * => {
    return request('get', `/rollout/features/${featureId}/groups`)
  },

  addGroup: (featureId: string, group: string): * => {
    return request('post', `/rollout/features/${featureId}/groups`, { group })
  },

  removeGroup: (featureId: string, group: string): * => {
    return request('delete', `/rollout/features/${featureId}/groups/${group}`)
  }
}
