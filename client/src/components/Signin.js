// @flow

import React, { Component } from 'react'

type Props = {
  onSubmit: (username: string, password: string) => void
}

type State = {
}

export default class Signin extends Component<Props, State> {
  props: Props
  state: State

  handleSubmit = (event: Event) => {
    event.preventDefault()

    const username = event.target.children.username.value
    const password = event.target.children.password.value

    if (username && password) {
      this.props.onSubmit(username, password)
    }
  }

  render() {
    return (
      <article className="sans-serif black bg-white mw7 center" style={{ margin: 'auto' }}>
        <header className="w-100 bg-red white pa3 ph5-ns mb3">
          <h1 className="f2 mt3 mb3">Basic Auth</h1>
        </header>
        <form className="pa3 pb5 ma0 ph5-ns" onSubmit={this.handleSubmit}>
          <input className="w-100 f1 mb4 pt3 pb3 outline bn" type="text" name="username" placeholder="Username" />
          <input className="w-100 f1 mb4 pt3 pb3 outline bn" type="password" name="password" placeholder="Password" />
          <button className="center f1 pa3 bg-dark-blue outline bn white pointer grow" type="submit">Sign in</button>
        </form>
      </article>
    )
  }
}
