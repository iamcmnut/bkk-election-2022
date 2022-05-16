/* eslint-disable import/no-default-export */
import React from 'react'
import { Meta, Story } from '@storybook/react'

import { PrototypeWarningModal } from './index'

export default {
  component: PrototypeWarningModal,
  title: 'PrototypeWarningModal',
} as Meta

const Template: Story = () => <PrototypeWarningModal />
export const Primary = Template.bind({})
Primary.args = {}
