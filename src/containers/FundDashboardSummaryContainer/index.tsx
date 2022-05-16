import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { getUsdtValueFromTokenAssets } from '../../bff/get-usdt-value-from-token-assets'
import {
  selectCashBalanceFromOwnFund,
  selectCopyingFund,
  selectCopyingFundTokens,
  selectFollowersFromOwnFund,
  selectInvestedFromCopyingFund,
  selectInvestedFromOwnFund,
  selectOwnFund,
  selectTokensFromOwnFund,
} from '../../bff/selectors'
import { FundDashboardSummary } from '../../components/FundDashboardSummary'
import { RootState } from '../../state/store'

export const FundDashboardSummaryContainer = (): JSX.Element | null => {
  const followers = useSelector((state: RootState) => selectFollowersFromOwnFund(
    selectOwnFund(state.investor.currentInvestor, state.funds.topFunds),
  ))
  const invested = useSelector((state: RootState) =>
    selectInvestedFromOwnFund(
      selectOwnFund(state.investor.currentInvestor, state.funds.topFunds),
    )
  )
  const cInvested = useSelector((state: RootState) =>
    selectInvestedFromCopyingFund(
      selectCopyingFund(state.investor.currentInvestor)
    )
  )
  const cashBalance = useSelector((state: RootState) => selectCashBalanceFromOwnFund(
    selectOwnFund(state.investor.currentInvestor, state.funds.topFunds),
  ))
  const tokens = useSelector((state: RootState) => selectTokensFromOwnFund(
    selectOwnFund(state.investor.currentInvestor, state.funds.topFunds),
  ))

  const copyingFundTokens = useSelector((state: RootState) => selectCopyingFundTokens(
    selectCopyingFund(state.investor.currentInvestor),
  ))

  const [tokensUsdtValue, setTokensUsdtValue] = useState(0)
  const [cTokensUsdtValue, setCTokensUsdtValue] = useState(0)

  useEffect(() => {
    if (tokens) {
      getUsdtValueFromTokenAssets(tokens)
        .then(value => setTokensUsdtValue(value))
        .catch(e => console.error(e))
    }
  }, [tokens])

  useEffect(() => {
    if (copyingFundTokens) {
      getUsdtValueFromTokenAssets(copyingFundTokens)
        .then(value => setCTokensUsdtValue(value))
        .catch(e => console.error(e))
    }
  }, [copyingFundTokens])

  const aum = tokensUsdtValue + cTokensUsdtValue
  const allInvested = invested + cInvested
  const pnlPercent = ((aum - allInvested) / allInvested) * 100

  return <FundDashboardSummary
    pnlPercent={pnlPercent}
    aum={aum}
    numberOfInvestors={followers?.length ?? 0}
    invested={cInvested}
    cashBalance={cashBalance}
  />
}
