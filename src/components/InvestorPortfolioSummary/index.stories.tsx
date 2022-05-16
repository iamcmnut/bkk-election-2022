/* eslint-disable import/no-default-export */
import React from 'react'
import { Meta, Story } from '@storybook/react'


import { InvestorPortfolioSummary, Props } from './index'
export default {
  component: InvestorPortfolioSummary,
  title: 'InvestorPortfolioSummary',
} as Meta

const Template: Story<Props> = (args: Props) =>
  <InvestorPortfolioSummary portfolioSummaryModel={args.portfolioSummaryModel} />

export const Primary = Template.bind({})
Primary.args = {
  portfolioSummaryModel: {
    'avatarUri': '/static/images/avatar/1.jpg',
    'investorName': 'Noname #001',
    'totalInvested': 5000,
    'totalBalance': 10000,
    'avalable': 5000,
  },
}
