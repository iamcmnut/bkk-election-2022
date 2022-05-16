import React from 'react'
import { Stack, Typography } from '@mui/material'
import { AreaChart, XAxis, YAxis, CartesianGrid, Area, Tooltip, ResponsiveContainer } from 'recharts'
import { styled } from '@mui/material/styles'

import { TimeSelection } from './TimeSelection'

const StackStyled = styled(Stack)`
  background-color: #01203D;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(255, 255, 255, 0.03);
`

export type DataPoint = {
  xLabel: string,
  value: number
}
type Input = {
  data: DataPoint[]
  setTimeframe: (tf: string) => void
}

export const FundDashboardChart = ({ data, setTimeframe }: Input): JSX.Element => {
  return <StackStyled
    borderRadius={10}
    paddingX={4}
    paddingY={3}
    spacing={2}
  >
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="h6">PROFIT/LOSS</Typography>
      <TimeSelection setTimeframe={setTimeframe} />
    </Stack>
    <ResponsiveContainer height={430} width='99%'>
      <AreaChart height={430} data={data}>
        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="10%" stopColor="#F07645" stopOpacity={1} />
            <stop offset="50%" stopColor="#F07645" stopOpacity={0.5} />
            <stop offset="85%" stopColor="#F07645" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="xLabel" stroke="white" fontSize="12" fontWeight="100" />
        <YAxis orientation="right" stroke="white" fontSize="12" unit="%" fontWeight="100" origin={-10} />
        <CartesianGrid stroke="rgba(255, 255, 255, 0.47)" />
        <Tooltip
          contentStyle={{ backgroundColor: '#01203D' }}
          formatter={(value: number) => `${value}%`}
          labelFormatter={() => 'Equity'}
        />
        <Area dataKey="value" stroke="#F07645" fillOpacity={1} fill="url(#colorPv)" />
      </AreaChart>
    </ResponsiveContainer>
  </StackStyled>
}
