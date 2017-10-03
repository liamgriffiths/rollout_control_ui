// @flow

import React, { Component } from 'react'
import type { Feature } from '../types'
import FeatureAPI from '../Feature_API'

type Props = {
  featureName: string,
  onChange: () => void
}

type State = {
  feature: ?Feature
}

export default class EditFeature extends Component<Props, State> {
  props: Props
  state: State = {
    feature: null
  }

  static PercentageForm = (props: { percentage: number, onChange: (percentage: number) => void }) => {
    const handleSubmit = (event: e) => {
      event.preventDefault()
      const percentage = event.target.children.percentage.value
      props.onChange(+percentage)
    }

    return (
      <form>
        <div className="measure">
          <label>
            <h3 className="">Percentage</h3>
            <form onSubmit={handleSubmit}>
              <input name="percentage" className="input-reset bg-transparent white bn pt3 pb3 mw4 f1" type="number" defaultValue={props.percentage} />
            </form>
          </label>
        </div>
      </form>
    )
  }

  static ListEdit = (props: {
    title: string,
    items: Array<string|number>,
    onAdd: (value: string | number) => void,
    onRemove: (value: string | number) => void
  }) => {
    const { title, items, onAdd, onRemove } = props

    const Row = (props: { item: string | number }) => {
      const { item } = props
      const handleRemoveClick = (event: *) => {
        event.preventDefault()
        onRemove(item)
      }

      return (
        <div className="pb3">
          <a onClick={handleRemoveClick} className="red pointer">
            <code className="light-blue">{ item } </code> &times;
          </a>
        </div>
      )
    }

    const handleAddClick = (event: e) => {
      event.preventDefault()
      const item = prompt(`Add ${title}`)
      if (item) onAdd(item.trim())
    }

    return (
      <div>
        <h2>{ title } <a onClick={handleAddClick} className="green pointer f3 pl3">Add</a> </h2>
        <div className="measure">
        { items.map((item) => <Row key={item} item={item} />) }
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.reloadFeature()
  }

  reloadFeature = async () => {
    const feature = await FeatureAPI.find(this.props.featureName)
    this.setState({ feature })
  }

  update = async (req) => {
    try {
      await req(this.state.feature.name)
      this.reloadFeature()
      this.props.onChange()
    } catch(err) {
      alert(err.message)
    }
  }

  handlePercentageChange = (percentage: number) => this.update((name) => FeatureAPI.setPercentage(name, percentage))
  handleUserAdd = (id: number) => this.update((name) => FeatureAPI.addUser(name, id))
  handleUserRemove = (id: number) => this.update((name) => FeatureAPI.removeUser(name, id))
  handleGroupAdd = (group: number) => this.update((name) => FeatureAPI.addGroup(name, group))
  handleGroupRemove = (group: number) => this.update((name) => FeatureAPI.removeGroup(name, group))

  render() {
    const { PercentageForm, ListEdit } = EditFeature
    const { feature } = this.state

    if (!feature) return <h1>Loading</h1>

    return (
      <article className="sans-serif pa3 f4 white pa1">
        <h1>{ feature.name }</h1>
        <PercentageForm percentage={feature.percentage} onChange={this.handlePercentageChange} />
        <ListEdit title="Users" items={feature.users} onAdd={this.handleUserAdd} onRemove={this.handleUserRemove} />
        <ListEdit title="Groups" items={feature.groups} onAdd={this.handleGroupAdd} onRemove={this.handleGroupRemove} />
      </article>
    )
  }
}
