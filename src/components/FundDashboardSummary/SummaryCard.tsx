import React from 'react'
import { Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

const StackStyled = styled(Stack)`
  background-color: #01203D;
  border-radius: 5px;
  box-shadow: 0px 4px 4px rgba(255, 255, 255, 0.03);
  height: 120px;
`

const LabelStyled = styled(Typography)`
  color: white;
  opacity: 0.5;
`

const ValueStyled = styled(Typography)`
  font-weight: 600;
`

type Input = {
  label: string
  children: React.ReactChild
}

export const SummaryCard = ({ label, children }: Input): JSX.Element => {
  return <StackStyled
    textAlign="right"
    justifyContent="space-evenly"
    paddingX={3}
    paddingY={3}
    spacing={1}
  >
    <LabelStyled variant="subtitle1">{label}</LabelStyled>
    <ValueStyled variant="h4">
      {children}
    </ValueStyled>
  </StackStyled>
}
