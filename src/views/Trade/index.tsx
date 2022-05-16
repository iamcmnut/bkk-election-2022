import React from 'react'
import { Grid, Box } from '@mui/material'

import { TradingGraphContainer } from '../../containers/TradingGraphContainer'
import { OpenPositionContainer } from '../../containers/OpenPositionContainer'
import { TradeHistoryContainer } from '../../containers/TradeHistoryContainer'


export const Trade = (): JSX.Element => {
  return <Grid container>
    <Grid item xs={12} sm={12} md={7} lg={8} xl={9} height={720}>
      <TradingGraphContainer />
    </Grid>
    <Grid item xs={12} sm={12} md={5} lg={4} xl={3}>
      <Box padding={2}><OpenPositionContainer /></Box>
    </Grid>
    <Grid item xs={12} sm={12} md={7} lg={8} xl={9} height={400}>
      <TradeHistoryContainer />
    </Grid>
  </Grid>
}
