import React from 'react'
import NumberFormat from 'react-number-format'
import { Stack } from '@mui/material'

import { SummaryCard } from './SummaryCard'

type Input = {
  pnlPercent: number
  aum: number
  numberOfInvestors: number
  invested: number
  cashBalance: number
}
export const FundDashboardSummary = ({
  pnlPercent,
  aum,
  numberOfInvestors,
  invested,
  cashBalance,
}: Input): JSX.Element => {
  return <Stack
           spacing={3}
           overflow="auto"
           height={527}
           paddingRight={1.5}
         >
    <SummaryCard label="PROFIT/LOSS">
      {pnlPercent}
    </SummaryCard>
    <SummaryCard label="NUMBER OF INVESTORS">
      {numberOfInvestors}
    </SummaryCard>
    <SummaryCard label="Assets Under Management">
      {aum}
    </SummaryCard>
    <SummaryCard label="INVESTED">
      {invested}
    </SummaryCard>
    <SummaryCard label="CASH BALANCE">
        {cashBalance}
    </SummaryCard>
  </Stack>
}
