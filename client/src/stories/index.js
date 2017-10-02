import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import '../index.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Features from '../components/Features'

storiesOf('Header', module)
  .add('Display', () => <Header />)

storiesOf('Footer', module)
  .add('Display', () => <Footer />)

storiesOf('Features', module)
  .add('List', () => {
    const features = [{
      name: 'cool_feature',
      percentage: 47,
      users: [1, 2, 3],
      groups: ['admins', 'moderators']
    }, {
      name: 'bad_feature',
      percentage: 0,
      users: [],
      groups: []
    }]

    return <Features features={features} onSelect={action('onSelect')} />
  })
  .add('Item', () => {
    const feature = {
      name: 'cool_feature',
      percentage: 47,
      users: [1, 2, 3],
      groups: ['admins', 'moderators']
    }
    return <Features.Feature feature={feature} onSelect={action('onSelect')} />
  })
