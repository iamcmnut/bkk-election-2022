import React from 'react'
import { Avatar, TableCell, TableRow, Typography, Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import NumberFormat from 'react-number-format'

import { CoinPositionModel } from '.'

const StlyledCell = styled(TableCell)`
     border-bottom:none;
     height: 73px;
`

const StlyledFirstCell = styled(StlyledCell)`
    border-radius: 5px 0px 0px 5px;
    height: 73px;

`

const StlyledLastCell = styled(StlyledCell)`
     border-radius: 0px 5px 5px 0px;
     height: 73px;
`
const StlyledRow = styled(TableRow)`
   background-color: #14395B;
   height: 73px;
   border-color: none;
`

export const PositionListItem = (prop: CoinPositionModel): JSX.Element | null => {
  if (!prop) return null

  const handleClick = () => {
    if (prop.onClick && prop.fundAddress) {
      prop.onClick(prop.fundAddress)
    }
  }
  return (<StlyledRow
    onClick={handleClick}
  >
    <StlyledFirstCell>
      <Avatar
        style={{ height: '65px', width: '65px' }}
        src={prop.icon}
      /></StlyledFirstCell>
    <StlyledCell align="left"
    >
      <Box>
        <Typography>{prop.shortName}</Typography>
        <Typography>{prop.name}</Typography>
      </Box> </StlyledCell>
    <StlyledCell align="right"><Typography>
      {prop.unit}
      </Typography>
    </StlyledCell>

    <StlyledCell align="right"><Typography>
      {prop.invested}
    </Typography></StlyledCell>
    <StlyledCell align="right"><Typography>
      {prop.pnl}
    </Typography></StlyledCell>

    <StlyledLastCell align="right"><Typography>
      {prop.currentValue}
    </Typography>
    </StlyledLastCell>
    {/* <StlyledLastCell align="center">
      <Button variant="contained" size="large" fullWidth>
        <Typography>Close</Typography>
      </Button>
    </StlyledLastCell> */}
  </StlyledRow>)
}
