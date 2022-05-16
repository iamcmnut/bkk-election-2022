/* eslint-disable import/no-default-export */
import React from 'react'
import { Meta, Story } from '@storybook/react'

import { MarketListModal, Props } from './index'

export default {
  component: MarketListModal,
  title: 'MarketListModal',
} as Meta

const Template: Story<Props> = (args: Props) => <MarketListModal {...args} />
export const Primary = Template.bind({

})
Primary.args = {
  markets :[
    {
      ticker: 'BNB',
      name: 'Binance Coin',
      price: 1.2,
      img: 'https://assets.coingecko.com/coins/images/825/thumb_2x/binance-coin-logo.png?1547034615',
    },
    {
      ticker: 'BTC',
      name: 'Bitcoin',
      price: 1.2,
      img: 'https://assets.coingecko.com/coins/images/1/thumb_2x/bitcoin.png?1547033579',
    },
    {
      ticker: 'ETH',
      name: 'Ethereum',
      price: 1.2,
      img: 'https://assets.coingecko.com/coins/images/279/thumb_2x/ethereum.png?1595348880',
    },
    {
      ticker: 'ADA',
      name: 'Cadano',
      price: 1.2,
      img: 'https://assets.coingecko.com/coins/images/975/thumb_2x/cardano.png?1547034860',
    },
    {
      ticker: 'CAKE',
      name: 'Pancake Swap',
      price: 1.2,
      img: 'https://assets.coingecko.com/coins/images/12632/small/pancakeswap-cake-logo_%281%29.png?1629359065',
    },
    {
      ticker: 'DOGE',
      name: 'Dogecoin',
      price: 1.2,
      img: 'https://assets.coingecko.com/coins/images/5/thumb_2x/dogecoin.png?1547792256',
    },
    {
      ticker: 'LINK',
      name: 'Chainlink',
      price: 1.2,
      img: 'https://assets.coingecko.com/coins/images/877/thumb_2x/chainlink-new-logo.png?1547034700',
    },
    {
      ticker: 'ATOM',
      name: 'Cosmos',
      price: 1.2,
      img: 'https://assets.coingecko.com/coins/images/1481/thumb_2x/cosmos_hub.png?1555657960',
    },
    {
      ticker: 'FTM',
      name: 'Fantom',
      price: 1.2,
      img: 'https://assets.coingecko.com/coins/images/4001/thumb_2x/Fantom.png?1558015016',
    },
  ],
}
