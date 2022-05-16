import { v4 as uuid } from 'uuid'

import { Order, Token } from '../state/types'

import { getState, save } from './mock-state'
import { copyOrder } from './copy-order'
import { selectUsdtBalance } from './selectors'
import { TOKEN_LIST } from './constants'

import { marketCalculator } from '.'

const getRandomToken = (): Token['symbol'] => {
  const randIndex = Math.floor(Math.random() * TOKEN_LIST.length)
  return TOKEN_LIST[randIndex]
}

const INTERVAL = 60000
export const startAutoManageFunds = (): void => {
  setInterval(async () => {
    const { userInvestor, funds } = getState()
    const validFunds = funds
    .filter(f => f.followers.includes(userInvestor.walletAddress))
    .filter(f => f.fundAddress !== userInvestor.assets.ownFunds?.[0])
    for (const fund of validFunds) {
      // random amount to place an order
      const newOrderUsdtAmount = Math.max(Math.random() * 10000, 5000)
      // checking if a fund has enough money
      // then place the order for random token
      const fundUsdtBalance = selectUsdtBalance(fund.assets.tokens)
      if (newOrderUsdtAmount <= fundUsdtBalance) {
        const randToken = getRandomToken()
        const newOrder: Order<'USDT', typeof randToken> = {
          id: uuid(),
          type: 'market',
          marketName: `${randToken}/USDT`,
          side: 'buy',
          fromToken: 'USDT',
          fromTokenAmount: newOrderUsdtAmount,
          toToken: randToken,
          status: 'open',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        fund.orders.push(newOrder)

        await copyOrder(fund, userInvestor, newOrder)
      }

      // sell any orders that has 5% profit
      const buyOrders = fund.orders
        .filter(o => o.status === 'filled')
        .filter(o => !o.closePositionOrderId)

      for (const order of buyOrders) {
        if (!order.toTokenAmount) return
        const { toTokenAmount: tokenUsdtValue } = await marketCalculator({
          fromToken: order.toToken,
          toToken: 'USDT',
          fromTokenAmount: order.toTokenAmount,
        })
        const pnl = tokenUsdtValue - order.fromTokenAmount
        const pnlPercent = (pnl / order.fromTokenAmount) * 100

        if (pnlPercent > 5) { // profit 5%
          const sellOrder: Order<typeof order.toToken, 'USDT'> = {
            id: uuid(),
            type: 'market',
            marketName: `${order.toToken}/USDT`,
            side: 'sell',
            fromToken: order.toToken,
            fromTokenAmount: order.toTokenAmount ?? 0,
            toToken: 'USDT',
            status: 'open',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }

          order.closePositionOrderId = sellOrder.id
          fund.orders.push(sellOrder)

          // sell the copied order too
          const copyingFund = userInvestor.assets.copyingFunds.find(f => f.fundAddress === fund.fundAddress)
          if (!copyingFund) return

          const copiedOrder = copyingFund.orders.find(o => o.copiedFormOrderId === order.id)
          if (!copiedOrder) return

          const sellCopiedOrder = {
            id: uuid(),
            type: 'market',
            marketName: `${copiedOrder.toToken}/USDT`,
            side: 'sell',
            fromToken: copiedOrder.toToken,
            fromTokenAmount: copiedOrder.toTokenAmount ?? 0,
            toToken: 'USDT',
            status: 'open',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            copiedFormOrderId: sellOrder.id,
            copiedFromFundAddress: fund.fundAddress,
          } as const

          copyingFund.orders.push(sellCopiedOrder)
        }
      }
    }

    save()
  }, INTERVAL)
}
