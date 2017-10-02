// @flow
import type { Feature } from './types'

type Method = 'get' | 'post' | 'put' | 'delete'
const request = async (method: Method, path: string) => {
  const url = new URL(`${window.location.origin}${path}`)

  const username = 'admin'
  const password = 'password'
  const credentials = window.btoa(`${username}:${password}`)

  const headers = new Headers()
  headers.append('Accept', 'application/json')
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', `Basic ${credentials}`)


  const res = await fetch(url, { method, headers })
  const json = await res.json()
  return json
}

export default {
  all: (): Array<Feature> => {
    const stub = [{"percentage":0.0,"groups":[],"users":[],"name":"can_send_binding_offers"},{"percentage":100.0,"groups":[],"users":[],"name":"new_user_autohide"},{"percentage":100.0,"groups":["team"],"users":[],"name":"combined_search_and_filters"},{"percentage":100.0,"groups":[],"users":[],"name":"use_designer_matviews"},{"percentage":100.0,"groups":[],"users":[],"name":"purchase_locking"},{"percentage":100.0,"groups":[],"users":[],"name":"recommended_listings"},{"percentage":100.0,"groups":[],"users":[],"name":"verify_paypal_ids"},{"percentage":70.0,"groups":["team_members"],"users":["24392"],"name":"read_from_new_messages"},{"percentage":0.0,"groups":["admins","curators","beta_testers"],"users":[],"name":"read_form_new_messages"},{"percentage":80.0,"groups":["admins"],"users":[],"name":"email_phone_checking"},{"percentage":100.0,"groups":["team_members","developers"],"users":[],"name":"shipments"},{"percentage":100.0,"groups":["admins"],"users":[],"name":"blog_digest"},{"percentage":100.0,"groups":["admins"],"users":["154990"],"name":"conversation_warp_drive"},{"percentage":100.0,"groups":[],"users":[],"name":"connect_paypal"},{"percentage":100.0,"groups":[],"users":["750111"],"name":"transact_paypal_admin"},{"percentage":100.0,"groups":["team_members"],"users":["68595"],"name":"light_conversations"},{"percentage":60.0,"groups":[],"users":[],"name":"transact_paypal"},{"percentage":100.0,"groups":[],"users":[],"name":"jerrytest"},{"percentage":0.0,"groups":[],"users":[],"name":"disable_app_conversations"},{"percentage":100.0,"groups":[],"users":[],"name":"jerrylorenzo"}]
   return stub
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
