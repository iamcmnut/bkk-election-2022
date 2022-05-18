import React, { useState, useEffect } from 'react'
import {
  Avatar,
  Box,
  Grid,
  Paper,
  Skeleton,
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
import { CandidateCard } from '../../components/CandidateCard'

export const Result = (): JSX.Element | null => {
  const [sortedCandidates, setSortedCandidates] = useState<Fund[]>([])
  const candidates = useSelector((state: RootState) => state.funds.topFunds)

  useEffect(() => {
    void getCandidates().then(result => {
      const sortedCandidatess =
        [...candidates.map((c, i) =>
          ({ ...c, campScore: { ...c.campScore, return: Number(result[i]) } }))]
          .sort((c1, c2) => c2.campScore.return - c1.campScore.return)
      setSortedCandidates(sortedCandidatess)

      console.log(sortedCandidatess)
    })
  }, [candidates])


  if (!candidates || candidates.length == 0 || !sortedCandidates || sortedCandidates.length == 0)
    return <Box style={{ fontFamily: 'Kanit' }}>
      <Grid container justifyContent="center">
        <Grid item p={0}>
          <Skeleton animation="wave"
            width={300} height={600} style={{ padding: 0 }} />
        </Grid>
        <Grid container justifyContent="center" spacing={6}>
          <Skeleton animation="wave"
            width={300} height={600} />
          <Box p={3} />
          <Skeleton animation="wave"
            width={300} height={600} />
        </Grid>
      </Grid>

      <Box paddingX={3}>
        <Skeleton animation="wave"
          width='100%' height={1000} />
      </Box>
    </Box>





  return <Box padding={5} style={{ fontFamily: 'Kanit' }}>
    <Grid container justifyContent="center">
      <CandidateCard fund={
        sortedCandidates[0]
      } onClickInvest={function (f: Fund): void {
        throw new Error('Function not implemented.')
      }} onClickExit={function (f: Fund): void {
        throw new Error('Function not implemented.')
      }} />
    </Grid>
    <Grid container justifyContent="center">
      <CandidateCard fund={sortedCandidates[1]} onClickInvest={function (f: Fund): void {
        throw new Error('Function not implemented.')
      }} onClickExit={function (f: Fund): void {
        throw new Error('Function not implemented.')
      }} />
      <CandidateCard fund={sortedCandidates[2]} onClickInvest={function (f: Fund): void {
        throw new Error('Function not implemented.')
      }} onClickExit={function (f: Fund): void {
        throw new Error('Function not implemented.')
      }} />
    </Grid>

    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow style={{ fontFamily: 'Kanit' }}>
            <TableCell width='10px' size='small' style={{ fontFamily: 'Kanit' }}>อันดับ</TableCell>
            <TableCell width='30px' size='small'></TableCell>
            <TableCell style={{ fontFamily: 'Kanit' }}>ชื่อผู้สมัคร</TableCell>
            <TableCell align="right" style={{ fontFamily: 'Kanit' }}>หมายเลข</TableCell>
            <TableCell align="right" style={{ fontFamily: 'Kanit' }}>คะแนน</TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ fontFamily: 'Kanit' }}>
          {sortedCandidates.filter((e, i) => i > 2).map((c, i2) => (
            <TableRow
              key={`candi_${i2}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell size='small' align='center'>
                {i2 + 4}
              </TableCell>
              <TableCell  size='small' >
                <Avatar src={c.profile.picUri}></Avatar>
              </TableCell>
              <TableCell style={{ fontFamily: 'Kanit' }}>
                {c.profile.name}
              </TableCell>
              <TableCell align="right" style={{ fontFamily: 'Kanit' }}>
                {c.campScore.consistency}
              </TableCell>
              <TableCell align="right" style={{ fontFamily: 'Kanit' }}>
                {c.campScore.return.toLocaleString('en')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
}

