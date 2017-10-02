import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Features from '../components/Features'

storiesOf('Features', module)
  .add('list of features', () => <Features />)
