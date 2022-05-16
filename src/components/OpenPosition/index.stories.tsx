/* eslint-disable import/no-default-export */
import React from 'react'
import { Meta, Story } from '@storybook/react'

import { OpenPosition, Props } from './index'

export default {
  component: OpenPosition,
  title: 'OpenPosition',
} as Meta


const Template: Story<Props> = (args: Props) => <OpenPosition {...args} />
export const Primary = Template.bind({})
Primary.args = {
  target: {
    name: 'USDT',
    price: 1,
    icon: 'https://assets.coingecko.com/coins/images/325/thumb_2x/Tether-logo.png?1598003707',
    onClick: () => { },
  },
  available: 1000,
  onPlaceOrder: () => { },
}
