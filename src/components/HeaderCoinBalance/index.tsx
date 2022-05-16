/* eslint-disable no-unused-vars */

import React from 'react'
import {
  Avatar, Typography, Box
} from '@mui/material'
import NumberFormat from 'react-number-format'

import { TOKEN } from '../../bff/constants'

export type Props = {
  amount: number | undefined
}

export const HeaderCoinBalance = (prop: Props): JSX.Element => {
  return (
    <Box
      borderRadius={2}
      display='flex'
      justifyContent='space-between'
      p={1}
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.22)'
      }}
    >
      <Avatar alt='USDT' src={TOKEN.USDT.logoURI}
        sx={{ height: '28px', width: '28px' }} />
      <Typography variant='subtitle1' fontWeight='bold'>
        {prop.amount}
      </Typography>
    </Box>
  )
}

