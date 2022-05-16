/* eslint-disable import/no-default-export */
import React from 'react'
import { Meta, Story } from '@storybook/react'

import { PortfolioPositionList, Props } from './index'

export default {
  component: PortfolioPositionList,
  title: 'PortfolioPositionList',
} as Meta

const Template: Story<Props> = (args: Props) => <PortfolioPositionList {...args} />
export const Primary = Template.bind({})

Primary.args = {
  coinPositions: [

  ],
}

