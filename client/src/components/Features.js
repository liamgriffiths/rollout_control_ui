// @flow

import React, { Component } from 'react'
import type { Feature } from '../types'
import './Features.css'

type Props = {
  features: Array<Feature>,
  onSelect: (feature: Feature) => void
}

type State = {
}

class Features extends Component<Props, State> {

  static Feature = (props: { onSelect: (name: string) => void, feature: Feature }) => {
    const { name, percentage, users, groups } = props.feature
    const handleClick = (event: *) => {
      props.onSelect(props.feature)
    }

    return (
      <article className="feature" onClick={handleClick}>
        <h1>{name}</h1>
        <dl>
          <dt>Percentage </dt>
          <dt>Users </dt>
          <dt>Groups </dt>
          <dd>{ percentage }%</dd>
          <dd>{ users.length }</dd>
          <dd>{ groups.length }</dd>
        </dl>
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
      <main>
        <section className="active features">
          <h2>Active ({ features.active.length })</h2>
          <div className="grid">
            { features.active.map(renderFeature) }
          </div>
        </section>
        <section className="inactive features">
          <h2>Inactive ({ features.inactive.length })</h2>
          <div className="grid">
            { features.inactive.map(renderFeature) }
          </div>
        </section>
      </main>
    )
  }
}

export default Features
