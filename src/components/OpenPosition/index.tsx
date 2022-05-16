import React, { FunctionComponent, useState } from 'react'
import { styled } from '@mui/material/styles'
import {
  Avatar,
  ButtonGroup,
  Button,
  Typography,
  Box,
  FormControl,
  InputAdornment,
  OutlinedInput,
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { capitalize } from 'lodash'
import NumberFormat from 'react-number-format'

const Wraper = styled(Box)`
    border-radius: 10px;
    background-color: #1F222C;
    padding: 27px 32px 32px 32px;
    height: fit-content;
`
const InputCurrencyStyled = styled(Box)`
    margin-top:12px;
    border-radius: 7px;
    height: 55px;
    background-color: #FFFFFF26;
    padding: 10px;
`
const LineDashed = styled(Box)`
  border: 1px dashed rgba(255, 255, 255, 0.5);
  margin-top: 23px;
  margin-bottom: 23px;
`

const PercentAction = { P25: 25, P50: 50, P75: 75, P100: 100 }
const OrderSide = { BUY: 'buy', SELL: 'sell' }

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

export type Props = {
  target: Token;
  available: number;
  onPlaceOrder: (orderSize: number, side: 'buy' | 'sell') => void;
}

export type Token = {
  name: string;
  price: number;
  icon: string;
  onClick: () => void;
}
export const OpenPosition = ({
  target,
  available,
  onPlaceOrder,
}: Props): JSX.Element => {

  const [amount, setAmount] = useState('')
  const [orderSide, setOrderSide] = useState(OrderSide.BUY)


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



  function setActionVolume(percent: number) {

    const amountValue = available * percent / 100.00
    setAmount(amountValue.toString())

  }

  const onClickPlaceOrder = () => {
    if (amount == '' || Number.isNaN(amount)) {
      setAmount('')
      return
    }
    const numberValue = Number(amount)

    if (numberValue <= 0 || numberValue > available) return

    onPlaceOrder(numberValue, 'buy')
    setAmount('')
  }
  console.log()
  return <Wraper>
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Box padding={'4px'} style={{
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 10,
      }}>
        <Button
          style={{
            borderRadius: 10,
            color: 'white'
          }}
          fullWidth
          onClick={() => setOrderSide(OrderSide.BUY)}
          variant={orderSide === OrderSide.BUY ? 'contained' : 'text'}
          color='primary'
          sx={{
            width: '50%',

          }}>Buy</Button>
        <Button
          disabled
          style={{
            borderRadius: 10,
            color: 'white'
          }}
          fullWidth
          onClick={() => setOrderSide(OrderSide.SELL)}
          variant={orderSide === OrderSide.SELL ? 'contained' : 'text'}
          color='secondary'
          sx={{
            width: '50%',
          }}>Sell</Button>
      </Box>
    </Box>
    <Box sx={{
      mt: 2
    }}>
      < Typography variant='h6' > Select Token({target.name})</Typography>
    </Box>
    <InputCurrencyStyled
      justifyContent='space-between'
      alignItems='center'
      display='flex'
      sx={{ padding: 2 }}
    >
      <Button
        onClick={target.onClick}
        variant="text"
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}>
        <Avatar
          src={target.icon}
          sx={{ height: '32px', width: '32px', marginRight: '11px' }} />
        <Typography>{target.name}</Typography>
        <KeyboardArrowDownIcon fontSize='small' style={{ color: 'white' }} />
      </Button>
      <Typography>
        {target.price}
      </Typography>
    </InputCurrencyStyled>
    <LineDashed />
    < Typography variant='h6'> {capitalize(orderSide)} Token ({target.name})</Typography>
    <Box sx={{ mt: 2 }}>
      <Box gridColumn="span 12">
        <FormControl sx={{ width: '100%' }} variant="outlined">
          <OutlinedInput
            sx={{ paddingRight: '0px', backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
            startAdornment={<InputAdornment
              position="start" sx={{ fontSize: '20px !important' }}>
              Amount
            </InputAdornment>}
            endAdornment={<InputAdornment
              position="end"
              sx={{
                border: 'none',
                fontSize: '20px !important',
                height: '3.9rem',
                paddingLeft: '1rem', paddingRight: '1rem',
                backgroundColor: '#131722',
                maxHeight: 'inherit', WebkitTextFillColor: 'white',
              }}>
              USDT
            </InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              style: { textAlign: 'right', fontSize: '20px' },
              pattern: '^[0-9]*[.,]?[0-9]*$',
            }}
            value={amount}
            placeholder='0'
            onChange={onAmountChange}
          />
        </FormControl>
      </Box>
    </Box>
    <Box marginTop='36px' >
      <SpendPercentButtonGroup onSelectPercent={setActionVolume} />
    </Box>
    <LineDashed />
    <Box display='flex' justifyContent='space-between' >
      < Typography color='rgba(255, 255, 255, 0.5)' noWrap variant='body2'>Available Balance (USDT):</Typography>
      < Typography color='rgba(255, 255, 255, 0.5)' noWrap variant='body2'>
        {available}
      </Typography>
    </Box>

    <LineDashed />
    <Button
      disabled={amount == '' || Number.isNaN(amount) || Number(amount) <= 0}
      onClick={onClickPlaceOrder}
      style={{ borderRadius: '10' }} variant='contained' fullWidth>
      <Typography variant='h6' fontWeight={600}>{orderSide}</Typography>
    </Button>

  </Wraper >
}
