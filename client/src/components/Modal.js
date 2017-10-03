// @flow
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal'

// style copied (mostly) from docs
const style = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0)'
  },
  content : {
    position                   : 'absolute',
    top                        : '0 ',
    left                       : '0',
    right                      : '0',
    bottom                     : '0',
    border                     : 'none',
    background                 : 'rgba(0, 0, 0, 0.9)',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '0',
    outline                    : 'none',
    padding                    : '0'
  }
}

type Props = {
  isOpen: boolean,
  onClose: () => void,
  children?: any
}

type State = {}

export default class Modal extends Component<Props, State> {
  props: Props
  state: State

  static findOrCreateDOMNode = () => {
    // return the dom node that the modal lives in if we have it
    const id = 'modal'
    const node = document.getElementById('modal')
    if (node) return node

    // otherwise make one and then try to return it again
    const element = document.createElement('div')
    element.setAttribute('id', id)
    document.body.appendChild(element)
    return Modal.findOrCreateDOMNode()
  }

  static render = (component: React$Element<*>) => {
    // this is how we put the modal on the page
    const node = Modal.findOrCreateDOMNode()
    ReactDOM.render(component, node)
  }

  static close = () => {
    // render the modal as closed
    const noop = () => {}
    Modal.render(<Modal isOpen={false} onClose={noop} />)
  }

  static show(chilren?: React$Element<*>) {
    // render the modal as open
    Modal.render(<Modal isOpen={true} onClose={Modal.close}>{ chilren }</Modal>)
  }

  render() {
    const { isOpen, onClose, children } = this.props
    return (
      <ReactModal
        isOpen={isOpen}
        style={style}
        shouldCloseOnOverlayClick={false}>
        <article className="mw6" style={{ margin: '0 auto', padding: '0 1rem' }}>
          <div className="center relative pa0">
            <a className="absolute top-0 right-0 white pvs tc f1 pointer" onClick={onClose}>&times;</a>
            { children }
          </div>
        </article>
      </ReactModal>
    )
  }
}
