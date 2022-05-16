import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Fund } from '../../state/types'
import { RootState } from '../../state/store'
import { InvestExitModal } from '../../components/InvestExitModal'
//import { getUsdtValueFromTokenAssets } from '../../bff/get-usdt-value-from-token-assets'
import { exitFund, investFund } from '../../state/api-actions'

type Input = {
  fund: Fund | null
  onClose: () => void
  mode: 'invest' | 'exit'
  onClickInvest: (f: Fund | null) => void
  onClickExit: (f: Fund | null) => void
}
export function InvestExitModalContainer(
  { fund, onClose, mode, onClickInvest, onClickExit }: Input): JSX.Element | null {
  const dispatch = useDispatch()
  const [totalInvestedUsdt, setTotalInvestedUsdt] = useState(0)
  const currentInvestor = useSelector((state: RootState) => state.investor.currentInvestor)

  useEffect(() => {
    if (!currentInvestor) return

    const copyingFund = currentInvestor.assets.copyingFunds
      .find((f) => f.fundAddress === fund?.fundAddress ?? '')

    if (!copyingFund) {
      setTotalInvestedUsdt(0)
      return
    }
    setTotalInvestedUsdt(copyingFund.invested)
  }, [currentInvestor, fund])

  const submitHandler = useCallback((userInvestAmount: number, setUserInvestAmount: (v: number) => void) => {
    if (fund) {
      if (mode === 'invest') {
        dispatch(investFund({ fundAddress: fund.fundAddress, usdtAmount: userInvestAmount }))
      }
      if (mode === 'exit') {
        dispatch(exitFund({ fundAddress: fund.fundAddress, usdtAmount: userInvestAmount }))
      }
      setUserInvestAmount(0)
    }
  }, [fund, mode])

  if (!currentInvestor) return null

  const totalUsdtBalance = currentInvestor.assets.tokens
    .filter((a) => a.symbol === 'USDT')
    .reduce((acc, t) => acc + t.amount, 0)

  return <InvestExitModal
    fund={fund}
    onClose={onClose}
    mode={mode}
    totalInvestedUsdt={totalInvestedUsdt}
    totalUsdtBalance={totalUsdtBalance}
    onSubmit={submitHandler}
    onClickInvest={onClickInvest}
    onClickExit={onClickExit}
  />
}

