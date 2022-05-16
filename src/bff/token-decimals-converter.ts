import { Token, TokenAmount, TokenDecimalAmount } from '../state/types'

import { TOKEN } from './constants'

export const toTokenDecimals = (symbol: Token['symbol'], amount: TokenAmount): TokenDecimalAmount => {
  return amount * (10 ** TOKEN[symbol].decimals)
}

export const fromTokenDecimals = (symbol: Token['symbol'], amount: TokenDecimalAmount): TokenAmount => {
  return amount / (10 ** TOKEN[symbol].decimals)
}

