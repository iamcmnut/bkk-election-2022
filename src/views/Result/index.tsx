import React from 'react'
import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,

} from '@mui/material'

import { FundManagerCard } from '../../components/FundManagerCard'
import { Fund } from '../../state/types'

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein }
}

export const Result = (): JSX.Element => {
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ]
  return <Box padding={5}>
    <Grid container justifyContent="center">
      <FundManagerCard fund={{
        fundAddress: '',
        performanceFeePercent: 0,
        campScore: {
          return: 0,
          risk: 0,
          riskAdjustedReturn: 0,
          consistency: 0
        },
        invested: 0,
        followers: [],
        orders: [],
        assets: {
          tokens: []
        },
        tags: [],
        profile: {
          name: '',
          picUri: ''
        },
        createdAt: '',
        updatedAt: ''
      }} onClickInvest={function (f: Fund): void {
        throw new Error('Function not implemented.')
      }} onClickExit={function (f: Fund): void {
        throw new Error('Function not implemented.')
      }} />
    </Grid>
    <Grid container justifyContent="center">
      <FundManagerCard fund={{
        fundAddress: '',
        performanceFeePercent: 0,
        campScore: {
          return: 0,
          risk: 0,
          riskAdjustedReturn: 0,
          consistency: 0
        },
        invested: 0,
        followers: [],
        orders: [],
        assets: {
          tokens: []
        },
        tags: [],
        profile: {
          name: '',
          picUri: ''
        },
        createdAt: '',
        updatedAt: ''
      }} onClickInvest={function (f: Fund): void {
        throw new Error('Function not implemented.')
      }} onClickExit={function (f: Fund): void {
        throw new Error('Function not implemented.')
      }} />
      <FundManagerCard fund={{
        fundAddress: '',
        performanceFeePercent: 0,
        campScore: {
          return: 0,
          risk: 0,
          riskAdjustedReturn: 0,
          consistency: 0
        },
        invested: 0,
        followers: [],
        orders: [],
        assets: {
          tokens: []
        },
        tags: [],
        profile: {
          name: '',
          picUri: ''
        },
        createdAt: '',
        updatedAt: ''
      }} onClickInvest={function (f: Fund): void {
        throw new Error('Function not implemented.')
      }} onClickExit={function (f: Fund): void {
        throw new Error('Function not implemented.')
      }} />
    </Grid>

    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
}

