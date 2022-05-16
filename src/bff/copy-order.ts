import { v4 as uuid } from 'uuid'

import { Investor, Fund, Order } from '../state/types'

import { getUsdtValueFromTokenAssets } from './get-usdt-value-from-token-assets'
import { selectUsdtBalance } from './selectors'

export const copyOrder = async (fund: Fund, investor: Investor, newOrder: Order): Promise<void> => {
  const fundTotalUsdtValue = await getUsdtValueFromTokenAssets(fund.assets.tokens)
  const fundOrderRatio = newOrder.fromTokenAmount / fundTotalUsdtValue

  const copyingFund = investor.assets.copyingFunds.find((f) => f.fundAddress === fund.fundAddress)
  if (!copyingFund) return

  // Example:
  // given the fund's total asset usdt value is 100 usdt and the new order is 10 usdt then
  // ratio - 10/100 = 0.1 or 10%
  // the user's total asset usdt value is 50
  // then the user should get the copied order value 50 * 0.1 = 5 usdt
  const investorTotalAssetValue = await getUsdtValueFromTokenAssets(copyingFund.assets.tokens)
  const copyingAmount = investorTotalAssetValue * fundOrderRatio
  const investorUsdtBalance = selectUsdtBalance(copyingFund.assets.tokens)

  // checking if the user has sufficient usdt
  if (investorUsdtBalance > copyingAmount) {
    copyingFund.orders.push({
      ...newOrder,
      id: uuid(),
      fromTokenAmount: copyingAmount,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      copiedFromFundAddress: fund.fundAddress,
      copiedFormOrderId: newOrder.id
    })
  }
}

