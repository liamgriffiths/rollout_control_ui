// @flow

import React, { Component } from 'react'
import Modal from 'react-modal'
import type { Feature } from '../types'

type Props = {
  feature: Feature
}

type State = {
}

const modalStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.75)'
  },
  content : {
    position                   : 'absolute',
    top                        : '0 ',
    left                       : '0',
    right                      : '0',
    bottom                     : '0',
    border                     : 'none',
    background                 : '#000',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px'
  }
}

export default class SelectedFeature extends Component<Props, State> {
  render() {
    return (
      <Modal isOpen={this.props.feature} style={modalStyles}>
        <section className="cf ph3 ph5-ns pb5 white">
          <article className="pv3 fl w-100 w-third-l sans-serif pointer hover-dark-blue">
            <h2 className="f4 f2-ns fw6 mb2">feature_name</h2>
            <div className="w-100 overflow-auto near-black">
              <dl class="dib mr5 mt0">
                <dt class="f6 db">Percentage </dt>
                <dd class="db pl0 ml0 f4 f2-ns b">65%</dd>
              </dl>
              <dl class="dib mr5 mt0">
                <dt class="f6 db">Users </dt>
                <dd class="db pl0 ml0 f4 f2-ns b">35</dd>
              </dl>
              <dl class="dib mr5 mt0">
                <dt class="f6 db">Groups </dt>
                <dd class="db pl0 ml0 f4 f2-ns b">0</dd>
              </dl>
            </div>
          </article>
        </section>
      </Modal>
    )
  }
}
