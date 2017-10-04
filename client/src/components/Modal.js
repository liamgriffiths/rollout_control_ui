// @flow
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal'

// style copied (mostly) from docs
const style = {
  overlay : { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 },
  content : {
    position: 'absolute',
    top: '0 ',
    left: '0',
    right: '0',
    bottom: '0',
    border: 'none',
    background: 'none',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '0',
    outline: 'none',
    padding: '0'
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
        contentLabel=""
        isOpen={isOpen}
        style={style}
        shouldCloseOnOverlayClick={false}>
        <div className="absolute bg-black-80 w-100 h-100" onClick={onClose}>
          <a className="absolute top-1 right-2 grow white pvs pa2 tc f1 pointer z-1" onClick={onClose}>&times;</a>
          <div className="center relative pa0 h-100 mt6-l" onClick={(event: *) => event.stopPropagation()}>
            { children }
          </div>
        </div>
      </ReactModal>
    )
  }
}
