import { Box } from '@mui/material'
import React from 'react'
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets'

export type Props = {
  symbol?: string
}
export const TradingGraph = ({ symbol = 'BNBUSDT' }: Props): JSX.Element => {
  return <Box
    style={{ margin: 0, padding: 0, backgroundColor: '#131722', width: '100%' }}
  >
    <AdvancedRealTimeChart
      theme="dark"
      autosize
      width="100%"
      height="800px"
      symbol={symbol}
      interval="15"
      range="1M"
      allow_symbol_change={false}
      save_image={true}
    />
  </Box>
}
