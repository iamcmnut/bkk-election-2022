import React from 'react'
import {
  TableContainer, Table, TableHead, TableRow, TableCell,
  Paper,
  TableBody,
  Typography,
} from '@mui/material'

import { Token } from '../../state/types'

import { CoinPositionItem } from './CoinPositionItem'

export type CoinPositionModel = {
  icon: string
  shortName: string
  name: string
  unit: number
  averageOpen: number
  invested: number
  profitLossDollar: number
  profitLossPercent: number
  currentValue: number
  toToken: Token['symbol'],
}

export type Props = {
  coinPositions: CoinPositionModel[]
}

export const PortfolioPositionList = (prop: Props): JSX.Element =>
  <TableContainer
    style={{
      borderRadius: '10px',
      backgroundColor: '#01203D',
    }}
    component={Paper}>
    <Table style={{
      borderCollapse: 'separate',
      borderSpacing: '0px 15px',
      padding: '20px',
    }}>
      <TableHead>
        <TableRow >
          <TableCell width={1} ></TableCell>
          <TableCell align="left"><Typography>Market</Typography></TableCell>
          <TableCell align="right"><Typography>Unit</Typography></TableCell>
          {/* <TableCell align="right"><Typography>AVG.Open</Typography></TableCell>
          <TableCell align="right"><Typography>Invested</Typography></TableCell>
          <TableCell align="right"><Typography>P/L($)</Typography></TableCell>
          <TableCell align="right"><Typography>P/L(%)</Typography></TableCell> */}
          <TableCell align="right"><Typography>Value($)</Typography></TableCell>
          {/* <TableCell align="center"></TableCell> */}
        </TableRow>
      </TableHead>
      <TableBody>
        {prop.coinPositions.map((coinPosition, key) => {
          return (
            <CoinPositionItem key={key}
              icon={coinPosition.icon}
              name={coinPosition.name}
              shortName={coinPosition.shortName}
              unit={coinPosition.unit}
              averageOpen={coinPosition.averageOpen}
              invested={coinPosition.invested}
              profitLossDollar={coinPosition.profitLossDollar}
              profitLossPercent={coinPosition.profitLossDollar}
              currentValue={coinPosition.currentValue}
              toToken={coinPosition.toToken}
            />)
        })}
      </TableBody>
    </Table>
  </TableContainer>

