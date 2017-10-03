import React, { Component } from 'react'

import type { Feature } from './types'
import FeatureAPI from './Feature_API'
import Header from './components/Header'
import Footer from './components/Footer'
import Features from './components/Features'
import EditFeature from './components/EditFeature'
import Modal from './components/Modal'

type Props = {}
type State = {
  features: Array<Feature>,
  selectedFeature: ?Feature
}

// todo:
// 2. form to change percentage
// 3. form to change users
// 4. form to change groups
// 5. flash to show success/errors
// 6. login/auth

class App extends Component<Props, State> {
  state: State = {
    features: []
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
    const features = await FeatureAPI.all()
    this.setState({ features })
  }

  handleSignin = async (username: string, password: string) => {
    // try to reload features.
    // set username and pass in local storage
  }

  handleSelect = async (name: string) => {
    Modal.show(<EditFeature featureName={name} onChange={this.reloadFeatures} />)
  }

  render() {
    const { features } = this.state

    return (
      <div id="App" className="w-100">
        <Header />
        { features && <Features features={features} onSelect={this.handleSelect} /> }
        <Footer />
      </div>
    );
  }
}

export default App;
