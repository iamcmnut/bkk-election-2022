import React, { useState, useEffect } from 'react'
import { Typography, Grid, Box } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../state/store'
import { deleteFund, loadManagerDashboard } from '../../state/api-actions'
import { CreateFundContainer } from '../../containers/CreateFundContainer'
import { FundDashboardChartContainer } from '../../containers/FundDashboardChartContainer'
import { FundDashboardSummaryContainer } from '../../containers/FundDashboardSummaryContainer'
import { FundDashboardAssetsContainer } from '../../containers/FundDashboardAssetsContainer'

export const FundDashboard = (): JSX.Element => {
  const [isCreateFund, setIsCreateFund] = useState(false)
  const dispatch = useDispatch()
  const ownFund = useSelector(
    (state: RootState) =>
      state.funds.topFunds.find((f) => f.fundAddress === state.investor?.currentInvestor?.assets?.ownFunds?.[0]))

  useEffect(() => {
    dispatch(loadManagerDashboard())
  }, [])

  // if (ownFund) {
  //   console.log(ownFund)
  // }
  return <>
    {((!ownFund && !isCreateFund) || (!ownFund && isCreateFund) || (ownFund && isCreateFund)) && (
      <CreateFundContainer onCreate={() => setIsCreateFund(true)} />
    )}

    {!isCreateFund && ownFund && (
      <Box display='flex' flexDirection='column'>
        <Typography p={3} variant="h4">{ownFund.profile.name}{'\'s Dashboard'}
          <DeleteForeverIcon onClick={() => dispatch(deleteFund(ownFund.fundAddress))} />
        </Typography>

        <Grid container spacing={2} padding={3}>
          <Grid item xs={12} sm={12} md={8} lg={9} xl={9} height={500}>
            <FundDashboardChartContainer />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={3} xl={3} height={400}>
            <FundDashboardSummaryContainer />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography p={1} pt={7} variant="h4">Assets</Typography>
            <FundDashboardAssetsContainer assets={ownFund.assets} />
          </Grid>
        </Grid>
      </Box>
    )}
  </>
}
