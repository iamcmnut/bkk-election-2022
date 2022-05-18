/* eslint-disable no-unused-vars */

import React from 'react'
import {
  Avatar, Typography, Box
} from '@mui/material'
import NumberFormat from 'react-number-format'
import { useSelector } from 'react-redux'

import { TOKEN } from '../../bff/constants'
import { RootState } from '../../state/store'

export type Props = {
  amount: number | undefined
}

export const HeaderCoinBalance = (prop: Props): JSX.Element => {
  const wallet = useSelector((state: RootState) => state.investor.currentInvestor?.userId)
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
      <Avatar
        alt='metamask'
        src={'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png'}
        sx={{ height: '28px', width: '28px' }} />
      <Typography variant='subtitle1' fontWeight='bold'>
        {wallet ?? 'กำลังเชื่อมต่อ...'}
      </Typography>
    </Box>
  )
}

