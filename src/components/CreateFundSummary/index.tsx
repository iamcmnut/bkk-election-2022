import React from 'react'
import { Button, Stack, styled, Typography } from '@mui/material'

const CreateFundSummaryBox = styled(Stack)({
  border: 'solid 1px',
  padding: '20px',
  borderRadius: '5px',
  color: '#F07645',
  background: 'rgba(0, 0, 0, 0.24)',

  '& .MuiTypography-root':{
    color: '#F07645',
  },
  '& .MuiButton-root':{
    color: '#ffffff'
  }
})


export const CreateFundSummary = (): JSX.Element => {
  return <CreateFundSummaryBox spacing={2} alignItems="center">
    <Typography variant="h4">Congratulations !</Typography>
    <Typography variant="subtitle1">
    Your fund has been created. Click the button below to continue.
    </Typography>
    <Button href='fund-dashboard' variant="contained">Dashboard</Button>
  </CreateFundSummaryBox>
}
