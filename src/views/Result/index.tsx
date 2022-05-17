import React, { useState, useEffect } from 'react'
import {
  Avatar,
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
import { useSelector } from 'react-redux'

import { FundManagerCard } from '../../components/FundManagerCard'
import { Fund } from '../../state/types'
import { RootState } from '../../state/store'
import { getCandidates } from '../../services/web3'

export const Result = (): JSX.Element | null => {
  const [scores ,setScores] = useState(null)
  const candidates = useSelector((state: RootState) => state.funds.topFunds)
  if (!candidates || candidates.length == 0) return null

  useEffect(() => {
    void loadScore()
  }, [])

  const loadScore = async()=>{
  const result =  await getCandidates()
  console.log(result)
  //setScores(result)
  }



  return <Box padding={5}>
    <Grid container justifyContent="center">
      <FundManagerCard fund={
        candidates[0]
      } onClickInvest={function (f: Fund): void {
        throw new Error('Function not implemented.')
      }} onClickExit={function (f: Fund): void {
        throw new Error('Function not implemented.')
      }} />
    </Grid>
    <Grid container justifyContent="center">
      <FundManagerCard fund={candidates[1]} onClickInvest={function (f: Fund): void {
        throw new Error('Function not implemented.')
      }} onClickExit={function (f: Fund): void {
        throw new Error('Function not implemented.')
      }} />
      <FundManagerCard fund={candidates[2]} onClickInvest={function (f: Fund): void {
        throw new Error('Function not implemented.')
      }} onClickExit={function (f: Fund): void {
        throw new Error('Function not implemented.')
      }} />
    </Grid>

    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>อันดับ</TableCell>
            <TableCell>ชื่อผู้สมัคร</TableCell>
            <TableCell align="right">หมายเลข</TableCell>
            <TableCell align="right">คะแนน</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {candidates.filter((e, i) => i > 2).map((c, i2) => (
            <TableRow
              key={`candi_${i2}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {i2 + 4}
              </TableCell>
              <TableCell component="th" scope="row">
                <Avatar src={c.profile.picUri}></Avatar>
                {c.profile.name}
              </TableCell>
              <TableCell align="right">   {c.campScore.consistency}</TableCell>
              <TableCell align="right"> {c.campScore.return}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
}

