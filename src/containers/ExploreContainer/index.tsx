import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Grid, IconButton, Typography, Box } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'

import { Fund } from '../../state/types'
import { RootState } from '../../state/store'
import { FundManagerCard } from '../../components/FundManagerCard'
import { isVoted } from '../../services/web3'

type Input = {
  onClickInvest: (f: Fund) => void
  onClickExit: (f: Fund) => void
}
export const ExploreContainer = ({ onClickInvest, onClickExit }: Input): JSX.Element | null => {

  const [voteStatus, setVoteStatus] = useState('not-ready')
  const topFunds = useSelector((state: RootState) => state.funds.topFunds)
  const voteSuccess = useSelector((state: RootState) => state.funds.isVoted)
  const wallet = useSelector((state: RootState) => state.investor.currentInvestor?.userId)

  let headerMsg = 'ลงคะแนน'

  useEffect(() => {
    isVoted()
      .then(voted => {
      setVoteStatus(voted ? 'voted' : 'ready')
    }).catch(e => console.error(e))
  }, [])

  let finalVoteStatus = voteSuccess ? 'voted' : voteStatus

  if (wallet && wallet.length > 0) {
    finalVoteStatus = voteSuccess ? 'voted' : voteStatus
  } else {
    finalVoteStatus = 'not-ready'
  }

  switch (finalVoteStatus) {
    case "ready":
      headerMsg = 'ท่านมี 1 คะแนนสำหรับการโหวต'
      break
    case "voted":
      headerMsg = 'ท่านได้ลงคะแนนโหวตแล้ว'
      break
    default:
      headerMsg = 'กำลังเชื่อมต่อ Metamask...'
      break
  }

  if (!topFunds) return null

  return <Grid container justifyContent="center" alignItems="center">
    {/* <Grid md={3} /> */}
    <Grid md={12} sm={12} columns={12} xs={12} sx={{ textAlign: 'center' }}>
      <Typography variant="h4" mt={8} style={{ fontFamily: 'Kanit' }}>
        ทดลองโหวตผู้ว่าผ่าน Blockchain
        <IconButton aria-label="info" color="secondary" size="small" >
          <InfoIcon fontSize="inherit" />
        </IconButton>
      </Typography>
    </Grid>
    {/* <Grid item md={3} />
    <Grid item md={3} /> */}
    <Grid md={12} sm={12} columns={12} xs={12} sx={{ textAlign: 'center' }}>
      <Typography variant="h5" mt={5} mb={6} style={{ fontFamily: 'Kanit' }}>{headerMsg}</Typography>
    </Grid>
    {/* <Grid md={3} /> */}
    <Grid container justifyContent='center' xs paddingX={3}>
      {topFunds.map((f: Fund) => (
        <Grid item key={f.fundAddress} spacing={3} md={3}>
          <Box >
            <FundManagerCard
              fund={f}
              onClickInvest={onClickInvest}
              onClickExit={onClickExit}
              voteStatus={finalVoteStatus}
            />
          </Box>
        </Grid>
      ))}
    </Grid  >

  </Grid>
}
