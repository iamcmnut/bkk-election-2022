import React, { FunctionComponent, useState } from 'react'
import { styled } from '@mui/material/styles'
import {
  Avatar,
  SvgIcon,
  ButtonGroup,
  Button,
  Typography,
  Box,
  TextField,
} from '@mui/material'

enum PercentAction { P25 = 25, P50 = 50, P75 = 75, P100 = 100 }

const Wraper = styled(Box)`
    border-radius: 10px;
    width: 376px;
    background-color: #1F222C;
    padding: 27px 20px 20px 20px;
`
const InOutPutStyledBox = styled(Box)`
    border-radius: 10px;
    border: 1px solid;
    border-color: white;
    padding: 14px 14px 14px 14px;
    margin-top:33px;
`
const InputCurrencyStyled = styled(Box)`
    margin-top:12px;
    border-radius: 10px;
    height: 55px;
    background-color: #49546C;
    padding: 10px;

`
const AmountInputField = styled(TextField)`
  '&[type=number]': {
      '-moz-appearance': 'textfield',
    },
    '&::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '&::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
`

const Input: FunctionComponent = ({ children }) =>
  <InOutPutStyledBox>
    {children}
  </InOutPutStyledBox>

const OutPut: FunctionComponent = ({ children }) =>
  <InOutPutStyledBox style={{ border: '2px solid #BD7914' }}>
    {children}
  </InOutPutStyledBox>


type SpendPercentButtonGroupProps = {

  onSelectPercent: (percent: PercentAction) => void
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
  token1: Token;
  token2: Token;
  onClickSwap: (spend: number, recieve: number) => void;
}

type Token = {
  name: string;
  balance: number;
  price: number;
  icon: string;
}
export const SwapPanel: React.FC<Props> = ({
  token1,
  token2,
  onClickSwap,
}) => {
  const [spendAmount, setSpendAmount] = useState(0)
  const [recieveAmount, setRecieveAmount] = useState(0)


  function setAmount(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    const pattern = /^[0-9]*[.,]?[0-9]*$/
    const amountValue = event.target.value
    if (amountValue === '' || pattern.test(amountValue)) {
      const amount = Number(amountValue)

      setSpendAmount(amount)
      setRecieveAmount((token1.price * amount) / token2.price)
    }
  }

  function setRecievAmount(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    const pattern = /^[0-9]*[.,]?[0-9]*$/
    const amountValue = event.target.value
    if (amountValue === '' || pattern.test(amountValue)) {
      const amount = Number(amountValue)

      setRecieveAmount(amount)
      setSpendAmount((token2.price * amount) / token1.price)
    }
  }

  function setActionVolume(percent: PercentAction) {
    const amount = token1.balance * percent / 100.00
    setSpendAmount(amount)
    setRecieveAmount((token1.price * amount) / token2.price)
  }

  const onSwap = () => {
    onClickSwap(spendAmount, recieveAmount)
  }


  return <Wraper>
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant='h6'>SWAP</Typography>
      <SvgIcon viewBox='0 0 25 18' >
        {/* Put Refresh Icon Here */}
      </SvgIcon>
    </Box>

    <Input>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='subtitle1'>You Pay</Typography>
        <Box display='flex'>
          <Typography variant='subtitle1' color="text.secondary">~$0.00</Typography>
          <Typography variant='subtitle1' color='success.main'>(+0.00%)</Typography>
        </Box>
      </Box>
      <InputCurrencyStyled
        justifyContent='space-between'
        alignItems='center'
        display='flex'
      >
        <Button
          variant="text"
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}>
          <Avatar
            src={token1.icon}
            sx={{ height: '32px', width: '32px', marginRight: '11px' }} />
          <Typography>{token1.name}</Typography>
        </Button>

        <AmountInputField
          hiddenLabel
          type="text"
          variant="standard"
          placeholder='0.0'
          onChange={setAmount}
          value={spendAmount}
          InputProps={{
            inputMode: 'decimal',
            disableUnderline: true,
            inputProps: {
              inputMode: 'decimal',
              style: { textAlign: 'right', fontSize: '20px', border: 'none' },
            },
          }
          }
          fullWidth
        />
      </InputCurrencyStyled>
      <Box marginTop='10px'>
        <SpendPercentButtonGroup onSelectPercent={setActionVolume} />
      </Box>
    </Input>
    <OutPut>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

        <Typography variant='subtitle1'>You Recieve</Typography>
        <Box display='flex'>
          <Typography variant='subtitle1' color="text.secondary">~$0.00</Typography>
          <Typography variant='subtitle1' color='success.main'>(+0.00%)</Typography>
        </Box>
      </Box>
      <InputCurrencyStyled
        justifyContent='space-between'
        alignItems='center'
        display='flex'
      >
        <Button
          variant="text"
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}>
          <Avatar
            src={token2.icon}
            sx={{ height: '32px', width: '32px', marginRight: '11px' }} />
          <Typography>{token2.name}</Typography>
        </Button>

        <AmountInputField
          hiddenLabel
          type="text"
          variant='standard'
          placeholder='0.0'
          onChange={setRecievAmount}
          value={recieveAmount}
          InputProps={{
            inputMode: 'decimal',
            disableUnderline: true,
            inputProps: {
              inputMode: 'decimal',
              style: { textAlign: 'right', fontSize: '20px', border: 'none' },
            },
          }
          }
          fullWidth
        />
      </InputCurrencyStyled>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '13px' }}>
        <Typography>Transaction Cost</Typography>
        <Box sx={{ display: 'flex' }}>
          <Typography>0.00000</Typography>
          <Typography>{token2.name}</Typography>
        </Box>
      </Box>
      <Typography textAlign='right'>~$0.0000</Typography>

    </OutPut>
    <Button
      onClick={onSwap}
      sx={{ marginTop: '36px' }} variant='contained' fullWidth><Typography variant='h6'>SWAP</Typography></Button>

  </Wraper>
}
