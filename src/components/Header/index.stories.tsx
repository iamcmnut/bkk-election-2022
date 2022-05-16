/* eslint-disable import/no-default-export */
import React from 'react'
import { Meta } from '@storybook/react'

import { Header } from './index'

export default {
  component: Header,
  title: 'Header',
} as Meta

export const Primary = () => <Header role="investor"
  onRoleChange={() => undefined}
  onResetState={() => undefined}
  currPath='explore' balance={undefined} canTrade={true}></Header>
