import { TokenAmount, TokenAsset } from '../state/types'

import { marketCalculator } from './market-calculator'

export const getUsdtValueFromTokenAssets = async (tokens: TokenAsset[]): Promise<TokenAmount> => {
  return (await Promise.all(tokens.map((token: TokenAsset) => {
    return marketCalculator({
      fromToken: token.symbol,
      toToken: 'USDT',
      fromTokenAmount: token.amount,
    })
  }))).reduce((value, usdt) => value + usdt.toTokenAmount, 0)
}

