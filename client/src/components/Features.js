// @flow

import React, { Component } from 'react'
import type { Feature } from '../types'

type Props = {
  features: Array<Feature>,
  onSelect: (feature: Feature) => void
}

type State = {
}

class Features extends Component<Props, State> {

  static Feature = (props: { onSelect: (name: string) => void, feature: Feature }) => {
    const { name, percentage, users, groups } = props.feature
    const handleClick = (event: *) => props.onSelect(props.feature)

    return (
      <article onClick={handleClick} className="pv3 fl w-100 w-third-l sans-serif pointer hover-dark-blue">
        <h2 className="f4 f2-ns fw6 mb3">{name}</h2>
        <div className="w-100 overflow-auto near-black">
          <dl className="dib mr5 mt0">
            <dt>Percentage </dt>
            <dd className="db pl0 ml0 f4 f2-ns b">{ percentage }%</dd>
          </dl>
          <dl className="dib mr5 mt0">
            <dt className="f6 db">Users </dt>
            <dd className="db pl0 ml0 f4 f2-ns b">{ users.length }</dd>
          </dl>
          <dl className="dib mr5 mt0">
            <dt className="f6 db">Groups </dt>
            <dd className="db pl0 ml0 f4 f2-ns b">{ groups.length }</dd>
          </dl>
        </div>
      </article>
    )
  }

  static groupFeatures = (features: Array<Feature>): { active: Array<Feature>, inactive: Array<Feature> } => {
    // sort alphabetically
    const sortedFeatures = features.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    })

    // group into active/inactive
    return sortedFeatures.reduce((acc, feature) => {
      if (feature.percentage > 0 || feature.users.length > 0 || feature.groups.length > 0) {
        return { ...acc, active: [...acc.active, feature] }
      } else {
        return { ...acc, inactive: [...acc.inactive, feature] }
      }
    }, { active: [], inactive: [] })
  }

  render() {
    const { Feature } = Features
    const features = Features.groupFeatures(this.props.features)
    const renderFeature = (feature) => <Feature key={feature.name} feature={feature} onSelect={this.props.onSelect} />

    return (
      <div>
        <section className="cf ph3 ph5-ns pb5 bg-washed-blue navy">
          <h1 className="fl w-100 mt5 f5 ttu tracked fw6 sans-serif">Active ({ features.active.length })</h1>
          { features.active.map(renderFeature) }
        </section>
        <section className="cf ph3 ph5-ns pb5 bg-washed-yellow navy">
          <h1 className="fl w-100 mt5 f5 ttu tracked fw6 sans-serif">Inactive ({ features.inactive.length })</h1>
          { features.inactive.map(renderFeature) }
        </section>
      </div>
    )
  }
}

export default Features
