/* eslint-disable import/no-default-export */
import React from 'react'
import { Meta, Story } from '@storybook/react'

import { Fund } from '../../state/types'

import { InvestExitModal, Props } from './index'

export default {
  component: InvestExitModal,
  title: 'InvestExitModal',
} as Meta

const Template:Story<Props> = (args: Props) => <InvestExitModal {...args} />
export const Primary = Template.bind({})
Primary.args = {
  fund: { profile: { name: 'mock-fund', picUri: '' } } as Fund,
  totalInvestedUsdt: 100,
  totalUsdtBalance: 1000,
  mode: 'invest',
}
