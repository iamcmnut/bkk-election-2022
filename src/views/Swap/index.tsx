import React from 'react'
import { Grid } from '@mui/material'

import { TradingGraphContainer } from '../../containers/TradingGraphContainer'
import { SwapPanelContainer } from '../../containers/SwapPanelContainer'

export const Swap = (): JSX.Element =>
  <Grid container spacing={3}>
    <Grid item xs={12} sm={12} md={7} lg={8.5} xl={9} height={720}>
      <TradingGraphContainer />
    </Grid>
    <Grid item xs={12} sm={12} md={5} lg={3.5} xl={3} padding={3}>
      <SwapPanelContainer />
    </Grid>
  </Grid>
