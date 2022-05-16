import { TokenAmount, TokenAsset, Token } from '../state/types'

export const addTokenToTokenAssets = (tokens: TokenAsset[], symbol: Token['symbol'], amount: TokenAmount): void => {
  const token = tokens.find((t) => t.symbol === symbol)
  if (token) {
    token.amount += amount
  } else {
    tokens.push({ symbol, amount })
  }
}

export const removeTokenFromTokenAssets = (
  tokens: TokenAsset[],
  symbol: Token['symbol'], amount: TokenAmount,
): void => {
  const token = tokens.find((t) => t.symbol === symbol)

  if (!token) {
    throw new Error('Insufficient token amount')
  }

  const adjustedAmount = token.amount - amount < 0.000001 ? token.amount : amount

  if (token.amount < adjustedAmount) {
    throw new Error('Insufficient token amount')
  }

  token.amount -= adjustedAmount
}

