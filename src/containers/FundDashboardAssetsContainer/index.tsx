import React from 'react'

import { TOKEN } from '../../bff/constants'
import { PortfolioPositionList } from '../../components/PortfolioPositionList'
import { TokenAsset } from '../../state/types'

type Prop = {
  assets: {
    tokens: TokenAsset[]
  }
}

export const FundDashboardAssetsContainer = (prop: Prop): JSX.Element => {
  const assets = prop.assets.tokens.filter((t) => t.amount > 0).map((t) => ({
    icon: TOKEN[t.symbol].logoURI,
    name: TOKEN[t.symbol].name,
    shortName: t.symbol,
    unit: t.amount,
    averageOpen: 0,
    invested: 0,
    profitLossDollar: 0,
    profitLossPercent: 0,
    currentValue: 0,
    toToken: t.symbol

  }))

  return <PortfolioPositionList coinPositions={assets} />
}
