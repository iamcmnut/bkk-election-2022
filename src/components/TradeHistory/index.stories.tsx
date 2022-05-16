/* eslint-disable import/no-default-export */
import React from 'react'
import { Meta, Story } from '@storybook/react'

import { TradeHistory, Props } from './index'

export default {
  component: TradeHistory,
  title: 'TradeHistory',
} as Meta

const Template: Story<Props> = (args: Props) => <TradeHistory {...args} />
export const Primary = Template.bind({})
Primary.args = {
  data: [
    // {
    //   date: new Date(),
    //   market: 'BTC',
    //   openPosition: 48000.00,
    //   unit: 10.00,
    //   value: 480000.0,
    // },
    // {
    //   date: new Date(),
    //   market: 'BTC',
    //   openPosition: 48000.00,
    //   unit: 10.00,
    //   value: 480000,
    // },
    // {
    //   date: new Date(),
    //   market: 'BTC',
    //   openPosition: 48000.00,
    //   unit: 10.00,
    //   value: 480000,
    // },
    // {
    //   date: new Date(),
    //   market: 'BTC',
    //   openPosition: 48000.00,
    //   unit: 10.00,
    //   value: 480000,
    // },
    // {
    //   date: new Date(),
    //   market: 'BTC',
    //   openPosition: 48000.00,
    //   unit: 10.00,
    //   value: 480000,
    // },
  ],

}
