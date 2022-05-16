import React from 'react'
import { Box, Stack, Step, StepLabel, Stepper, Typography } from '@mui/material'

type Props = {
  step: number
}
export const CreateFundHeader = ({ step }: Props): JSX.Element => {
  return <Stack mt={10} mb={5} spacing={2} alignItems='center'>
    <Typography variant="h4">Create your Fund</Typography>
    <Typography variant="subtitle1" color="gray">
    With CAMP you can create and manage more than 1 fund at a time
    </Typography>
    <Box sx={{ width: '100%' }}>
      <Stepper  activeStep={step} >
        <Step key={0}>
          <StepLabel>{''}</StepLabel>
        </Step>
        <Step key={1}>
          <StepLabel>{''}</StepLabel>
        </Step>
        <Step key={2}>
          <StepLabel>{''}</StepLabel>
        </Step>
      </Stepper>
    </Box>
  </Stack>
}
