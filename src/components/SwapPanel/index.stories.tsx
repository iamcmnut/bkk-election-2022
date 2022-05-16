/* eslint-disable import/no-default-export */
import React from 'react'
import { Meta, Story } from '@storybook/react'

import { SwapPanel, Props } from './index'

export default {
  component: SwapPanel,
  title: 'SwapPanel',
} as Meta


const Template: Story<Props> = (args: Props) => <SwapPanel {...args} />
export const Primary = Template.bind({})
Primary.args = {
  token1: {
    name: 'USDT',
    balance: 500,
    price: 1,
    icon: 'https://assets.coingecko.com/coins/images/325/thumb_2x/Tether-logo.png?1598003707',
  },
  token2: {
    name: 'BNB',
    balance: 0,
    price: 461.354,
    icon: 'https://assets.coingecko.com/coins/images/825/thumb_2x/binance-coin-logo.png?1547034615',
  },
  onClickSwap: () => { },
}
