// @flow

import React, { Component } from 'react'
import type { Feature } from '../types'
import FeatureAPI from '../Feature_API'

type Props = {
}

type State = {
}

export default class Signin extends Component<Props, State> {
  props: Props
  state: State

  render() {
    return (
      <article className="sans-serif black bg-white mw7 center" style={{ margin: 'auto' }}>
        <header className="w-100 bg-red white pa3 ph5-ns">
          <h1 className="f2 mt3 mb3">Basic Auth</h1>
        </header>
        <form className="pa3 pb5 ma0 ph5-ns">
          <input type="text" name="username" placeholder="Username" />
          <input type="password" name="password" placeholder="Password" />
          <button type="submit">Sign in</button>
        </form>
      </article>
    )
  }
}
