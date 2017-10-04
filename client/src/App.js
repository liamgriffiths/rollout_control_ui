import React, { Component } from 'react'

import './App.css'

import type { Feature } from './types'
import FeatureAPI from './Feature_API'
import Header from './components/Header'
import Footer from './components/Footer'
import Features from './components/Features'
import EditFeature from './components/EditFeature'
import Signin from './components/Signin'
import Modal from './components/Modal'
import credentials from './credentials'

type Props = {}
type State = {
  features: Array<Feature>,
  selectedFeature: ?string
}

export default class App extends Component<Props, State> {
  state: State = {
    features: [],
    selectedFeature: null
  }

  // close any open modal on ESC press
  static handleESC = (event: *) => event.keyCode === 27 && Modal.close()

  componentDidMount() {
    this.reloadFeatures()
    document.addEventListener("keydown", App.handleESC, false);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", App.handleESC, false);
  }

  reloadFeatures = async () => {
    try {
      const features = await FeatureAPI.all()
      this.setState({ features })
    } catch(err) {
      if (err.message === 'unauthorized') {
        Modal.show(<Signin onSubmit={this.handleSignin} />)
      }
    }
  }

  handleSignin = (username: string, password: string) => {
    Modal.close()
    credentials.set(username, password)
    this.reloadFeatures()
  }

  handleSelect = (feature: Feature) => {
    this.setState({ selectedFeature: feature.name })
  }

  render() {
    const { features, selectedFeature } = this.state

    if (selectedFeature) {
      const feature = this.state.features.find((feature) => feature.name === selectedFeature)
      Modal.show(<EditFeature feature={feature} onChange={this.reloadFeatures} />)
    }

    return (
      <div className="app">
        <Header />
        { features && <Features features={features} onSelect={this.handleSelect} /> }
        <Footer />
      </div>
    );
  }
}
