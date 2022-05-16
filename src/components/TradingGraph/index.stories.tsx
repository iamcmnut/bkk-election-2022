/* eslint-disable import/no-default-export */
import React from 'react'
import { Story, Meta } from '@storybook/react'

import { TradingGraph } from '.'


export default {
  component: TradingGraph,
  title: 'TradingGraph',
} as Meta

const Template: Story = (args) => <TradingGraph {...args} />
export const Primary = Template.bind({})
Primary.args = {}
