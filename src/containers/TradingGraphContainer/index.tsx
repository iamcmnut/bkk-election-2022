import React from 'react'
import { useSelector } from 'react-redux'

import { TradingGraph } from '../../components/TradingGraph'
import { RootState } from '../../state/store'
export const TradingGraphContainer = (): JSX.Element | null => {
  const currentMarket = useSelector((state: RootState) => state.market.currentMarket)
  // if (!currentMarket) return null
  return <TradingGraph symbol={currentMarket?.name.replace('/', '').replace('BTCB', 'BTC')} />
}

