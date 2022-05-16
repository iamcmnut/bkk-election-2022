/* eslint-disable import/no-default-export */
import React from 'react'
import { Meta, Story } from '@storybook/react'

import { BuySellModal, Props } from './index'

export default {
  component: BuySellModal,
  title: 'BuySellModal',
} as Meta

const Template:Story<Props> = (args: Props) => <BuySellModal {...args} />
export const Primary = Template.bind({})
Primary.args = {
  orderCommand: {
    assetName: 'BTC',
    assetNameDescription: 'Bitcoin',
    currentBalance: 14000,
    invested: 14000,
  },
}
