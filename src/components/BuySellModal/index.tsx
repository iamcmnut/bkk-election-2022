/* eslint-disable no-unused-vars */

import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import React from 'react'
import { useState } from 'react'
import {
  Avatar, Button, ButtonGroup, Card, CardActions, CardContent, FormControl, InputAdornment, OutlinedInput, Typography,
} from '@mui/material'

type Order = {
    assetName: string
    assetNameDescription: string
    currentBalance:number
    invested:number
}

export type Props = {
  orderCommand: Order
}

export const BuySellModal = (prop: Props) => {
  enum OrderAction{ BUY = 'Buy', SELL = 'Sell' }
  enum PercentAction{ P25 = 25, P50 = 50, P75 = 75, P100 = 100 }
  const [selection, setSelection] = useState(OrderAction.BUY)
  const [percent, setPercent] = useState(0)
  const [orderAmount, setOrderAmount] = useState(0)

  function setActionVolume(percent : PercentAction) {
    setPercent(percent)
    setOrderAmount((prop.orderCommand.currentBalance * percent ) / 100)
  }

  function setAmount(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> ) {
    const re = /^[0-9\b]+$/
    const amountValue = event.target.value
    if (amountValue === '' || re.test(amountValue)) {
      const amount = Number(amountValue)
      const currentBalance = prop.orderCommand.currentBalance
      setOrderAmount(amount > currentBalance ? currentBalance : amount)
      setPercent(0)
    }
  }

  return (
    <Modal
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'auto',
        boxShadow: 24,
        backgroundColor: '#0B2C4D',
        p: 4,
        borderRadius: '10px',
      }}>
        <Card raised
          sx={{ backgroundColor: '#0B2C4D', boxShadow: 'none' }}
        >
          <CardContent>
            <Box sx={{ display: 'table', margin: '0 auto' }}>
              <ButtonGroup variant="contained" aria-label="button group"
                sx={{ width: '100%' }} color="primary">
                <Button sx={{ width: '50%', color: '#ffffff !important',
                  backgroundColor: selection == OrderAction.BUY ? '#F07645' : '#2b4965',
                  borderColor: selection == OrderAction.BUY ? '#A85230 !important' : '#2b4965 !important',
                }}
                size="large" variant="contained"
                onClick={()=> {
                  setSelection(OrderAction.BUY)
                }}
                >
                  Buy</Button>
                <Button sx={{ width: '50%', color: '#ffffff !important',
                  backgroundColor: selection == OrderAction.SELL ? '#144E93' : '#2b4965' }}
                size="large" color="secondary"
                onClick={()=> {
                  setSelection(OrderAction.SELL)
                }}
                >
                  Sell
                </Button>
              </ButtonGroup>
            </Box>
            <Box sx={{ display: 'flex', p: 0, m: 0 }}>
              <Box sx={{
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                alignContent: 'center',
                flexDirection: 'row',
                flexGrow: '2',
                backgroundColor: '#2B4965',
                marginTop: '1rem',
                marginBottom: '1rem',
                borderRadius: '10px',
              }}>
                <Avatar
                  style={{ height: '86px', width: '86px', margin: '10px' }} />
                <Box sx={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Typography variant="h6" color="text">{prop.orderCommand.assetName}</Typography>
                  <Typography variant="subtitle1" >
                    {prop.orderCommand.assetNameDescription}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
              <Box gridColumn="span 12">
                <Typography variant="subtitle1">Current Balance (USDT)</Typography>
              </Box>
              <Box gridColumn="span 12">
                <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                  <OutlinedInput disabled sx={{ border: 'solid 1px #ffffff' }}
                    id="outlined-adornment-weight" value={'$' + prop.orderCommand.currentBalance.toLocaleString()}
                    startAdornment={<InputAdornment position="start">Amount</InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      'aria-label': 'weight', 'style': {
                        textAlign: 'right', fontSize: '20px',
                        WebkitTextFillColor: 'white',
                      },
                    }} />
                </FormControl>
              </Box>
              <Box gridColumn="span 12">
                <Typography variant="h6">Invested (USDT)</Typography>
              </Box>
              <Box gridColumn="span 12">
                <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                  <OutlinedInput disabled sx={{ border: 'solid 1px #ffffff' }}
                    id="outlined-adornment-weight" value={'$' + prop.orderCommand.invested.toLocaleString()}
                    startAdornment={<InputAdornment position="start">Amount</InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      'aria-label': 'weight', 'style': {
                        textAlign: 'right', fontSize: '20px',
                        WebkitTextFillColor: 'white',
                      },
                    }} />
                </FormControl>
              </Box>
              <Box gridColumn="span 12">
                <Typography variant="h6">{ selection }</Typography>
              </Box>
              <Box gridColumn="span 12">
                <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                  <OutlinedInput sx={{ border: 'solid 1px #ffffff', paddingRight: '0px', backgroundColor: '#2B4965' }}
                    id="outlined-adornment-weight"
                    startAdornment={<InputAdornment
                      position="start" sx={{ fontSize: '20px !important' }}>
                      Amount
                    </InputAdornment>}
                    endAdornment={<InputAdornment
                      position="end" sx={{
                        fontSize: '20px !important', height: '3.9rem',
                        paddingLeft: '1rem', paddingRight: '1rem', backgroundColor: '#073662',
                        maxHeight: 'inherit', WebkitTextFillColor: 'white',
                      }}>
                      USDT
                    </InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      'aria-label': 'weight', 'style': { textAlign: 'right', fontSize: '20px' },
                      'pattern': '[0-9]*',
                    }} value = { orderAmount }
                    onChange = { setAmount }
                  />
                </FormControl>
              </Box>
              <Box gridColumn="span 12">
                <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{ width: '100%' }}>
                  <Button sx={{
                    width: '25%', border: '1.3px solid #c6c6c6 !important',
                    boxSizing: 'border-box', borderRadius: '13px', color: '#c6c6c6',
                    backgroundColor: percent == PercentAction.P25 ? '#F07645' : '#2b4965',
                  }}
                  onClick={()=> {
                    setActionVolume(PercentAction.P25)
                  }}
                  >25%</Button>
                  <Button sx={{
                    width: '25%', border: '1.3px solid #c6c6c6 !important',
                    boxSizing: 'border-box', borderRadius: '13px', color: '#c6c6c6',
                    backgroundColor: percent == PercentAction.P50 ? '#F07645' : '#2b4965',
                  }}
                  onClick={()=> {
                    setActionVolume(PercentAction.P50)
                  }}
                  >50%</Button>
                  <Button sx={{
                    width: '25%', border: '1.3px solid #c6c6c6 !important',
                    boxSizing: 'border-box', borderRadius: '13px', color: '#c6c6c6',
                    backgroundColor: percent == PercentAction.P75 ? '#F07645' : '#2b4965',
                  }}
                  onClick={()=> {
                    setActionVolume(PercentAction.P75)
                  }}
                  >75%</Button>
                  <Button sx={{
                    width: '25%', border: '1.3px solid #c6c6c6 !important',
                    boxSizing: 'border-box', borderRadius: '13px', color: '#c6c6c6',
                    backgroundColor: percent == PercentAction.P100 ? '#F07645' : '#2b4965',
                  }}
                  onClick={()=> {
                    setActionVolume(PercentAction.P100)
                  }}
                  >100%</Button>
                </ButtonGroup>
              </Box>
            </Box>
          </CardContent>
          <CardActions style={{ justifyContent: 'space-between', padding: '15px' }}>
            <Button variant="contained" fullWidth size="large" sx={{ textTransform: 'capitalize' }}>
              <Typography>Set Order</Typography>
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Modal>
  )
}

