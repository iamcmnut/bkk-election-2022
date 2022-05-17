import React from 'react'
import { useSelector } from 'react-redux'
import { Grid, IconButton, Typography, Box } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'

import { Fund } from '../../state/types'
import { RootState } from '../../state/store'
import { FundManagerCard } from '../../components/FundManagerCard'

type Input = {
  onClickInvest: (f: Fund) => void
  onClickExit: (f: Fund) => void
}
export const ExploreContainer = ({ onClickInvest, onClickExit }: Input): JSX.Element | null => {
  const topFunds = useSelector((state: RootState) => state.funds.topFunds)

  if (!topFunds) return null

  return <Grid container justifyContent="center" alignItems="center">
    <Grid md={3} /><Grid md={6} sx={{ textAlign: 'center' }}>
      <Typography variant="h4" mt={8}>
        รายชื่อผู้ลงสมัคร
        <IconButton aria-label="info" color="secondary" size="small" >
          <InfoIcon fontSize="inherit" />
        </IconButton>
      </Typography>
    </Grid>
    <Grid item md={3} />
    <Grid item md={3} />
    <Grid md={6} sx={{ textAlign: 'center' }}>
      <Typography variant="h5" mt={5} mb={6}>ท่านมี 1 คะแนนสำหรับการโหวต</Typography>
    </Grid>
    <Grid md={3} />
    <Grid container justifyContent='center' xs paddingX={3}>
      {topFunds.map((f: Fund) => (
        <Grid item key={f.fundAddress} spacing={3} md={4}>
          <Box >
            <FundManagerCard
              fund={f}
              onClickInvest={onClickInvest}
              onClickExit={onClickExit}
            />
          </Box>
        </Grid>
      ))}
    </Grid  >

  </Grid>
}
