import React, { useState, useEffect } from 'react'
import { Avatar, TableCell, TableRow, Typography, Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import NumberFormat from 'react-number-format'

import { marketCalculator } from '../../bff'

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

export const CoinPositionItem = (prop: CoinPositionModel): JSX.Element | null => {

  if (!prop) return null
  const [value, setValue] = useState(0)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    marketCalculator({ fromToken: prop.toToken, toToken: 'USDT', fromTokenAmount: prop.unit || 0 })
      .then(value => {
        if (value.toTokenAmount > 0)
          setValue(value.toTokenAmount)
      })
  }, [])

  return (<StlyledRow >
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
    <StlyledCell align="right"><Typography>{prop.unit.toLocaleString()}</Typography></StlyledCell>
    {/* <StlyledCell align="right"><Typography>{prop.averageOpen.toLocaleString()}</Typography></StlyledCell>
    <StlyledCell align="right"><Typography>{prop.invested.toLocaleString()}</Typography></StlyledCell>
    <StlyledCell align="right"><Typography>{prop.profitLossDollar.toLocaleString()}</Typography></StlyledCell>
    <StlyledCell align="right"><Typography>{prop.profitLossPercent.toLocaleString()}</Typography></StlyledCell> */}
    <StlyledLastCell align="right"><Typography>
      {value}
    </Typography></StlyledLastCell>
    {/* <StlyledLastCell align="center">
      <Button variant="contained" size="large" fullWidth>
        <Typography>Sell</Typography>
      </Button>
    </StlyledLastCell> */}
  </StlyledRow>)
}
