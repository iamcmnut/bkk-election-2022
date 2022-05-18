/* eslint-disable no-unused-vars */
import Box from '@mui/material/Box'
import NumberFormat from 'react-number-format'
import React, { FunctionComponent, useState } from 'react'
import {
  Avatar,
  Button,
  ButtonGroup,
  InputAdornment,
  OutlinedInput,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material'

import { Fund } from '../../state/types'

export type Props = {
  fund: Fund | null
  onClose: () => void
  totalInvestedUsdt: number
  totalUsdtBalance: number
  mode: 'invest' | 'exit'
  onSubmit: (userInvestAmount: number, setUserInvestAmount: (v: number) => void) => void
  onClickInvest: (f: Fund | null) => void
  onClickExit: (f: Fund | null) => void
}

const PercentAction = { P25: 25, P50: 50, P75: 75, P100: 100 }
export const InvestExitModal = ({
  fund,
  onClose,
  mode,
  totalInvestedUsdt,
  totalUsdtBalance,
  onSubmit,
  onClickInvest,
  onClickExit,
}: Props): JSX.Element => {


  const [amount, setAmount] = useState('')
  const [userInvestAmount, setUserInvestAmount] = useState(0)

  let wasClicked = false

  // const ctaEnabled = userInvestAmount > 0 &&
  //   (mode === 'invest' ? userInvestAmount <= totalUsdtBalance : userInvestAmount <= totalInvestedUsdt)



  const submitHandler = () => {
    wasClicked = true
    const numberValue = 1
    console.log(userInvestAmount)
    onSubmit(numberValue, setUserInvestAmount)
  }

  // function setActionVolume(percent: number): void {
  //   setPercent(percent)
  //   setUserInvestAmount((totalUsdtBalance * percent) / 100)
  // }
  function setActionVolume(percent: number) {
    if (mode == 'invest') {
      const amountValue = totalUsdtBalance * percent / 100.00
      setAmount(amountValue.toString())
    } else {
      const amountValue = totalInvestedUsdt * percent / 100.00
      setAmount(amountValue.toString())
    }
  }

  const onAmountChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const reg = /^[0-9]*[.,]?[0-9]*$/
    const preval = e.target.value
    if (e.target.value === '' || reg.test(e.target.value)) {
      setAmount(e.target.value)
    }
    else {
      e.target.value = preval.substring(0, (preval.length - 1))
    }
  }
  return (
    <Dialog
      maxWidth='sm'
      open={!!fund}
      onClose={onClose}
      PaperProps={{
        style: {
          backgroundColor: '#FFF',
          borderRadius: '10px',
        }
      }}
      BackdropProps={{ style: { backgroundColor: 'rgba(244, 238, 255, 0.6)' } }}
    >
      <DialogContent>
        <Avatar style={{ height: '64px', width: '64px', }} src={fund?.profile.picUri} />
        < DialogContentText>
          <Box
            display='flex'
            justifyContent='start'
            padding={2}
            alignItems='center'
            height={75}
            borderRadius='10px'
            sx={{
              backgroundColor: '#2B4965',
              minWidth: '360px',
              maxWidth: '420px',
            }}
          >
            <Box padding={2}>
              <Typography variant='subtitle1' fontWeight='bold'>{fund?.profile.name}</Typography>
              <Typography variant='body2'>หมายเลข: {fund?.campScore.consistency}</Typography>
            </Box>
          </Box>
          <Box pt={2} />
          <Typography variant="subtitle1">ท่านต้องการใช้สิทธิ์เพียง 1 เดียวของท่าน</Typography>
          <Typography variant="subtitle1">เพื่อเลือกผู้สมัครรายนี้ใช่หรือไม่?</Typography>
          <Box pt={3} />
        </DialogContentText>
      </DialogContent >
      <DialogActions
        sx={{ p: 2 }}
      >
        <Button
          // disabled={!wasClicked}
          variant="contained" fullWidth color="secondary" size="large"
          sx={{
            backgroundColor: mode === 'invest' ? '#F07645' : '#144E93',
            borderColor: mode === 'invest' ? '#A85230 !important' : 'inheried'
          }}
          onClick={submitHandler}>{mode === 'invest' ? 'ลงคะแนน' : 'Exit'}
        </Button>
      </DialogActions>
    </Dialog >
  )
}

type SpendPercentButtonGroupProps = {
  onSelectPercent: (percent: number) => void
}

const SpendPercentButtonGroup: FunctionComponent<SpendPercentButtonGroupProps> = ({ onSelectPercent }) =>
  <Box gridColumn="span 12">
    <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{ width: '100%' }}>
      <Button onClick={() => onSelectPercent(PercentAction.P25)}
        sx={{
          width: '25%', border: '1.3px solid #c6c6c6 !important',
          boxSizing: 'border-box', borderRadius: '13px', color: '#c6c6c6',
        }}>25%</Button>
      <Button onClick={() => onSelectPercent(PercentAction.P50)}
        sx={{
          width: '25%', border: '1.3px solid #c6c6c6 !important',
          boxSizing: 'border-box', borderRadius: '13px', color: '#c6c6c6',
        }}>50%</Button>
      <Button onClick={() => onSelectPercent(PercentAction.P75)}
        sx={{
          width: '25%', border: '1.3px solid #c6c6c6 !important',
          boxSizing: 'border-box', borderRadius: '13px', color: '#c6c6c6',
        }}>75%</Button>
      <Button onClick={() => onSelectPercent(PercentAction.P100)}
        sx={{
          width: '25%', border: '1.3px solid #c6c6c6 !important',
          boxSizing: 'border-box', borderRadius: '13px', color: '#c6c6c6',
        }}>100%</Button>
    </ButtonGroup>
  </Box>
