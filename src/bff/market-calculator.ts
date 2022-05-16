import { Token, TokenAmount } from '../state/types'

import { TOKEN } from './constants'
import { fromTokenDecimals, toTokenDecimals } from './token-decimals-converter'

type Input = {
  fromToken: Token['symbol'],
  toToken: Token['symbol'],
  fromTokenAmount: TokenAmount,
}

type Output = {
  toToken: Token['symbol'],
  toTokenAmount: TokenAmount,
}

type OneInchOutput = {
  toTokenAmount: number
}

const ttl = 60 * 1000 // 1 minute

type CachePrices = {
  fromToken: Token['symbol']
  toToken: Token['symbol']
  updatedAt: string
  price: number
}
const cachePricesKey = 'cachePrices'
const cachePrices = JSON.parse(window.localStorage.getItem(cachePricesKey) ?? '[]') as CachePrices[]

setInterval(() => {
  if (window.localStorage) {
    window.localStorage.setItem(cachePricesKey, JSON.stringify(cachePrices))
  }
}, 10000)

export const marketCalculator = async ({ fromToken, toToken, fromTokenAmount }: Input): Promise<Output> => {
  const fromTokenAddress = TOKEN[fromToken].address
  const toTokenAddress = TOKEN[toToken].address

  if (fromTokenAddress === toTokenAddress) {
    return { toToken, toTokenAmount: fromTokenAmount }
  }

  const fromTokenDecimalAmount = Math.round(toTokenDecimals(fromToken, fromTokenAmount))
  const amountString = fromTokenDecimalAmount.toLocaleString('fullwide', { useGrouping: false })
  if(amountString.includes('.')) {
    console.error('Amount string was wrong: ', amountString)
  }
  const cache = cachePrices.find(c => c.fromToken === fromToken && c.toToken === toToken)
  if (cache && (Date.now() < new Date(cache.updatedAt).getTime() + ttl)) {
    return {
      toToken,
      toTokenAmount: fromTokenAmount / cache.price,
    }
  }
  let res
  try {
    // eslint-disable-next-line max-len
    res = await fetch(`https://api.1inch.exchange/v4.0/56/quote?fromTokenAddress=${fromTokenAddress}&toTokenAddress=${toTokenAddress}&amount=${amountString}`)
  } catch (e) {
    console.error(e)
    throw e
  }
  const data = await res.json() as OneInchOutput
  const updatingCache = cachePrices.find(c => c.fromToken === fromToken && c.toToken === toToken)
  if (updatingCache) {
    updatingCache.price = fromTokenDecimalAmount / data.toTokenAmount
    updatingCache.updatedAt = new Date().toISOString()
  } else {
    cachePrices.push({
      fromToken,
      toToken,
      price: fromTokenDecimalAmount / data.toTokenAmount,
      updatedAt: new Date().toISOString(),
    })
  }

  return {
    toToken,
    toTokenAmount: fromTokenDecimals(toToken, data.toTokenAmount),
  }
}

