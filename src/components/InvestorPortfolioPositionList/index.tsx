import React from 'react'
import {
  TableContainer, Table, TableHead, TableRow, TableCell,
  Paper,
  TableBody,
  Typography,
} from '@mui/material'

import { PositionListItem } from './CoinPositionItem'

export type CoinPositionModel = {
  fundAddress?: string
  icon?: string
  shortName?: string
  name?: string
  unit?: number
  invested?: number
  pnl?: number
  currentValue?: number
  onClick?: (address: string) => void
}

export type Props = {
  coinPositions: CoinPositionModel[]
}

export const InvestorPortfolioPositionList = (prop: Props): JSX.Element =>
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
          <TableCell align="right"><Typography>Invested</Typography></TableCell>
          <TableCell align="right"><Typography>P/L</Typography></TableCell>
          <TableCell align="right"><Typography>Value($)</Typography></TableCell>
          {/* <TableCell align="center"></TableCell> */}
        </TableRow>
      </TableHead>
      <TableBody>
        {prop.coinPositions.map((coinPosition, key) => {
          return (
            <PositionListItem key={key}
              icon={coinPosition.icon}
              name={coinPosition.name}
              shortName={coinPosition.shortName}
              unit={coinPosition.unit}
              invested={coinPosition.invested}
              pnl={coinPosition.pnl}
              currentValue={coinPosition.currentValue}
              onClick={coinPosition.onClick}
              fundAddress={coinPosition.fundAddress}
            />)
        })}
      </TableBody>
    </Table>
  </TableContainer>

