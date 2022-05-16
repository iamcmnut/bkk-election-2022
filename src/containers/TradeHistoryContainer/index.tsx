import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { placeOrder } from '../../state/api-actions'
import { TradeHistory } from '../../components/TradeHistory'
import { PlaceOrderInput } from '../../state/api-actions'
import { RootState } from '../../state/store'
import { Order } from '../../state/types'
import { setCurrentMarket } from '../../state/slices/markets'

export const TradeHistoryContainer = (): JSX.Element | null => {
  const dispatch = useDispatch()
  const role = useSelector((state: RootState) => state.investor.role)
  const markets = useSelector((state: RootState) => state.market.markets)
  const ownFundAddr = useSelector((state: RootState) => state.investor.currentInvestor?.assets?.ownFunds?.[0])
  const ownFundOrders = useSelector((state: RootState) =>
    state.funds.topFunds.find(f => f.fundAddress === ownFundAddr)?.orders)

  if (!ownFundAddr) return null

  const onCloseOrder = (order: Order) => {
    const market = markets.find(e => e.name === order.marketName)

    if (!market) return

    const input: PlaceOrderInput = {
      marketName: order.marketName,
      side: order.side == 'buy' ? 'sell' : 'buy',
      fromToken: order.toToken,
      fromTokenAmount: order.toTokenAmount ?? 0,
      toToken: order.fromToken,
      toTokenAmount: order.toTokenAmount ?? 0 / market.price,
      closePositionOrderId: order.id,
    }

    dispatch(placeOrder({ input, role }))
  }

  const onClickMarket = (market: string) => {
    const selected = markets.find(e => e.name === market)
    if (selected) {
      dispatch(setCurrentMarket(selected))
    }
  }


  return <TradeHistory
    data={ownFundOrders}
    onClose={onCloseOrder}
    onClickMarket={onClickMarket} />
}
