// @flow

import React, { Component } from 'react'
import type { Feature } from '../types'
import FeatureAPI from '../Feature_API'
import './EditFeature.css'

type Props = {
  feature: Feature,
  onChange: () => void
}

type State = {
}

export default class EditFeature extends Component<Props, State> {
  props: Props
  state: State

  static PercentageForm = (props: { percentage: number, onChange: (percentage: number) => void }) => {
    const handleSubmit = (event: e) => {
      event.preventDefault()
      const percentage = event.target.children.percentage.value
      props.onChange(+percentage)
    }

    return (
      <div className="w-100 pb3">
        <form onSubmit={handleSubmit}>
          <h2>Percentage <button type="submit" className="green pointer pl2 f5 ttu tracked fw6 sans-serif grow bg-transparent bn">Update</button></h2>
          <input name="percentage" className="input-reset f1 bn bg-transparent light-blue code w-20" type="phone" defaultValue={props.percentage} placeholder="0 - 100"/>
        </form>
      </div>
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
        <div className="pb4">
          <a onClick={handleRemoveClick} className="red pointer">
            <code className="light-blue">{ item } </code> <span className="f4">&times;</span>
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
        <h2 >{ title } <button onClick={handleAddClick} className="green pointer pl2 f5 ttu tracked fw6 sans-serif grow bg-transparent bn">Add</button></h2>
        <div className="measure">
        { items.map((item) => <Row key={item} item={item} />) }
        </div>
      </div>
    )
  }

  update = async (req) => {
    try {
      await req(this.props.feature.name)
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
    const { feature } = this.props

    return (
      <article className="edit-feature sans-serif white bg-black mw7 center">
        <header>
          <h1>{ feature.name }</h1>
        </header>
        <div>
          <PercentageForm percentage={feature.percentage} onChange={this.handlePercentageChange} />
          <ListEdit title="Users" items={feature.users} onAdd={this.handleUserAdd} onRemove={this.handleUserRemove} />
          <ListEdit title="Groups" items={feature.groups} onAdd={this.handleGroupAdd} onRemove={this.handleGroupRemove} />
        </div>
      </article>
    )
  }
}
