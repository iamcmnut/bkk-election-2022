import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { Header, Props } from '../../components/Header'
import { loadUserInvestor, resetState } from '../../state/api-actions'
import { setRole } from '../../state/slices/investor'
import { RootState } from '../../state/store'
import { Role } from '../../state/types'

export const HeaderContainer = (): JSX.Element => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const currPath = (pathname.split('/')?.[1] ?? 'explore') as Props['currPath']
  const role = useSelector((state: RootState) => state.investor.role)
  const investorBalance = useSelector((state: RootState) =>
    state.investor.currentInvestor?.assets.tokens.find(f => f.symbol === 'USDT')?.amount)
  const hasOwnFund = useSelector((state: RootState) =>
    state.investor.currentInvestor?.assets.ownFunds[0] ? true : false
  )
  const managerBalance = useSelector((state: RootState) =>
    hasOwnFund ?
      state.funds.topFunds.find(
        f => f.fundAddress === state.investor.currentInvestor?.assets.ownFunds[0])?.assets.tokens.filter(
          (a) => a.symbol === 'USDT')
        .reduce((acc, t) => acc + t.amount, 0) :
      0
  )

  useEffect(() => {
    //const initRole: Role = currPath === 'fund-dashboard' || currPath === 'trade' ? 'manager' : 'investor'
    //dispatch(setRole(initRole))
  }, [])

  const roleChangeHandler = useCallback((newRole: Role) => {
    dispatch(setRole(newRole))
  }, [])

  const resetStateHandler = useCallback(() => {
    dispatch(resetState())
    dispatch(loadUserInvestor())
  }, [])

  return <>
    <Header role={role}
      onRoleChange={roleChangeHandler}
      onResetState={resetStateHandler}
      currPath={currPath}
      canTrade={hasOwnFund}
      balance={role === 'investor' ? investorBalance : managerBalance} />
  </>
}
