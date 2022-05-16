import { Token } from '../state/types'

export const TOKEN: Record<Token['symbol'], Token> = {
  'USDT': {
    symbol: 'USDT',
    name: 'Tether USD',
    decimals: 18,
    address: '0x55d398326f99059ff775485246999027b3197955',
    logoURI: 'https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png',
  },
  'BNB': {
    symbol: 'BNB',
    name: 'BNB',
    decimals: 18,
    address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    logoURI: 'https://assets.coingecko.com/coins/images/825/thumb_2x/bnb-icon2_2x.png?1644979850',
  },
  'ETH': {
    symbol: 'ETH',
    name: 'Ethereum Token',
    decimals: 18,
    address: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    logoURI: 'https://assets.coingecko.com/coins/images/279/thumb_2x/ethereum.png?1595348880',
  },
  'DOT': {
    symbol: 'DOT',
    name: 'DOT',
    decimals: 18,
    address: '0x7083609fce4d1d8dc0c979aab8c869ea2c873402',
    logoURI: 'https://tokens.1inch.io/0x7083609fce4d1d8dc0c979aab8c869ea2c873402.png',
  },
  'ADA': {
    symbol: 'ADA',
    name: 'Cardano Token',
    decimals: 18,
    address: '0x3ee2200efb3400fabb9aacf31297cbdd1d435d47',
    logoURI: 'https://tokens.1inch.io/0x3ee2200efb3400fabb9aacf31297cbdd1d435d47.png',
  },
  'BTCB': {
    symbol: 'BTCB',
    name: 'BTCB Token',
    decimals: 18,
    address: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
    logoURI: 'https://tokens.1inch.io/0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c.png',
  },
}

export const TOKEN_LIST = Object.keys(TOKEN).filter(t => t !== 'USDT') as Token['symbol'][]

export const FUND_NAME: string[] = [
  'YellowCity Partners',
  'FirstMont Trust',
  'OakTree Capital',
  'BlackStone Group',
  'StateHill Associates',
  'RedRock Capital',
  'SilverStone Partners',
  'SpringRock Holdings',
  'HudsonBay Holdings',
  'OakTree Partners',
  'BlackBay Capital',
  'BlackOcean Management',
  'PineView Capital',
  'GreenRiver Securities',
  'GoldRiver Capital',
  'SilverRoad Capital',
  'PineMount Capital',
  'OakStreet Advisors',
  'SummerHill Management',
  'OakHill Trust',
]

