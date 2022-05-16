import { Order } from '../state/types'

import { addTokenToTokenAssets, removeTokenFromTokenAssets } from './manage-token-assets'
import { marketCalculator } from './market-calculator'
import { getState, save } from './mock-state'

let count = 0
type Subscriber = {
  key: string
  callback: (count: number) => void
}
let subscribers: Subscriber[]  = []

export const subscribeAutoFill = (subscriber: Subscriber): number => {
  return subscribers.push(subscriber)
}

export const unsubscribeAutoFill = (key: string): void => {
  subscribers = subscribers.filter(s => s.key !== key)
}

export const startAutoFill: () => void = () => {
  setInterval(async () => {
    const { userInvestor, funds } = getState()

    // Filling user orders
    const openOrders = userInvestor.orders.filter(
      (order: Order) => order.status === 'open')

    for(const order of openOrders) {
      try {
        order.status = 'filled'

        const { fromToken, toToken, fromTokenAmount } = order
        order.toTokenAmount = (await marketCalculator({ fromToken, toToken, fromTokenAmount })).toTokenAmount

        removeTokenFromTokenAssets(userInvestor.assets.tokens, order.fromToken, order.fromTokenAmount)
        addTokenToTokenAssets(userInvestor.assets.tokens, order.toToken, order.toTokenAmount)
      } catch (e) {
        order.status = 'cancelled'
        console.error(e)
        return
      }
    }

    // Filling open copied orders
    const openCopiedOrders = userInvestor.assets.copyingFunds
      .map(f => f.orders)
      .flat()
      .filter(o => o.status === 'open')
    for(const order of openCopiedOrders) {
      try {
        order.status = 'filled'

        const { fromToken, toToken, fromTokenAmount } = order
        order.toTokenAmount = (await marketCalculator({ fromToken, toToken, fromTokenAmount })).toTokenAmount

        const fund = userInvestor.assets.copyingFunds.find((f) => f.fundAddress === order.copiedFromFundAddress)

        if (!fund) {
          order.status = 'cancelled'
          return
        }

        removeTokenFromTokenAssets(fund.assets.tokens, order.fromToken, order.fromTokenAmount)
        addTokenToTokenAssets(fund.assets.tokens, order.toToken, order.toTokenAmount)
      } catch(e) {
        order.status = 'cancelled'
        console.error(e)
        return
      }
    }

    // Filling fund orders
    let ownFundOrderNumber = 0
    for (const fund of funds) {
      const fundOpenOrders = fund.orders
        .filter((order: Order) => order.status === 'open')
      if (fund.fundAddress === userInvestor.assets.ownFunds?.[0]) {
        ownFundOrderNumber += fundOpenOrders.length
      }
      for (const order of fundOpenOrders) {
        order.status = 'filled'
        try {
          const { fromToken, toToken, fromTokenAmount } = order
          order.toTokenAmount = (await marketCalculator({ fromToken, toToken, fromTokenAmount })).toTokenAmount

          removeTokenFromTokenAssets(fund.assets.tokens, order.fromToken, order.fromTokenAmount)
          addTokenToTokenAssets(fund.assets.tokens, order.toToken, order.toTokenAmount)
        } catch (e) {
          order.status = 'cancelled'
          console.error(e)
          return
        }
      }
    }

    save()

    if (ownFundOrderNumber > 0) {
      count++
      subscribers.forEach(s => s.callback(count))
    }
  }, 1000)

}
