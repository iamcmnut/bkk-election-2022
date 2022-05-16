/* eslint-disable import/no-default-export */
import React from 'react'
import { Meta, Story } from '@storybook/react'

import { MarketSummary, Props } from './index'

export default {
  component: MarketSummary,
  title: 'MarketSummary',
}as Meta

const Template:Story<Props> = (args: Props) => <MarketSummary {...args} />
export const Primary = Template.bind({})
Primary.args = {
  marketSummary: {
    iconUri: '/static/images/avatar/1.jpg',
    shortName: 'ADA',
    currentPrice: 2.9,
    percentChangeSign: '+',
    percentChange: 20,
    volume24Hour: 10000,
    totalLiquidity: 20000,
    marketCap: 3000000,
    fullyDilutedMarketCap: 600000,
  },
}
