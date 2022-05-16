import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { loadPortfolio } from '../../state/api-actions'
import { InvestorPortfolioContainer } from '../../containers/InvestorPortfolioContainer'

export const Port = (): JSX.Element => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadPortfolio())
  }, [])

  return <>
    <InvestorPortfolioContainer />
  </>
}
