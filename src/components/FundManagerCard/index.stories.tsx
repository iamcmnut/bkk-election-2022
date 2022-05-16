/* eslint-disable import/no-default-export */
import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Fund } from '../../state/types'

import { FundManagerCard, Props } from './index'

export default {
  component: FundManagerCard,
  title: 'FundManagerCard',
} as Meta

const Template: Story<Props> = (args: Props) => <FundManagerCard {...args} />
export const Primary = Template.bind({})
Primary.args = {
  fund: {
    profile: { name: 'test-fund', picUri: '' },
    performanceFeePercent: 10,
    fundAddress: 'addr',
  } as Fund,
  onClickInvest: () => {},
  onClickExit: () => {},
}

