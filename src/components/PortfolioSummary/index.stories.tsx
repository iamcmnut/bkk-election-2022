/* eslint-disable import/no-default-export */
import React from 'react'
import { Meta, Story } from '@storybook/react'


import { PortfolioSummary, Props } from './index'
export default {
  component: PortfolioSummary,
  title: 'PortfolioSummary',
}as Meta

const Template : Story<Props> = (args: Props) =>
  <PortfolioSummary portfolioSummaryModel={args.portfolioSummaryModel} />

export const Primary = Template.bind({})
Primary.args = {
  portfolioSummaryModel: {
    'avatarUri': '/static/images/avatar/1.jpg',
    'investorName': 'Noname #001',
    'totalCapitalInvest': 2.9,
    'profitLossSign': '+',
    'profitLossPercent': 20,
    'profitLossTotal': 10000,
    'currentValue': 20000,
  },
}
