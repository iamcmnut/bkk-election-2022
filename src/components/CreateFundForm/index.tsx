import { alpha, Box, Button, FormControl, Grid, InputAdornment, InputBase, InputLabel, 
  Slider, Stack, styled, TextField } 
from '@mui/material'
import React, { useState } from 'react'

export type Props = {
  onContinue: (p: { fundName: string, perfFee: number }) => void
  onBack: () => void
}

export type OnContinueParameters = Parameters<Props['onContinue']>[0]

export const CreateFundForm = ({
  onContinue,
  onBack,
}: Props): JSX.Element => {
  const [fundName, setFundName] = useState('')
  const [perfFee, setPerfFee] = useState(0)
  const minPerfFee = 0
  const maxPerfFee = 50

  const handleFundName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFundName(event.target.value)
  }

  const handlePerfFee = (event: React.ChangeEvent<HTMLInputElement>) => {
    const chosen = Number.parseFloat(event.target.value)
    setPerfFee(!isNaN(chosen) ? Math.min(chosen, 50) : minPerfFee)
  }

  const handlePerfFeeSlider = (_event: Event, newValue: number | number[]) => {
    setPerfFee(newValue as number)
  }

  const CreateFundBackButton = styled(Button)({
      backgroundColor: '#39434C',
      color: '#ffffff',
      '&:hover': {
        boxShadow: `${alpha('#39434C', 0.25)} 0 0 0 0.2rem`,
        backgroundColor: '#39434C',
      }
  })

  const CreateFundConntinueButton = styled(Button)({
    color: '#ffffff'
})


  return <Stack spacing={2} alignItems='center'>
    <FormControl variant="standard">
      <InputLabel shrink htmlFor="fundName">
          Fund Name
      </InputLabel>
      <InputBase id="fundName" value={fundName} onChange={handleFundName} error={!fundName}
      sx={{
        'label + &': {
          marginTop: '24px',
          color: 'gray',
          fontSize: '18px;'
        },
        '& .MuiInputBase-input': {
          color: '#ffffff',
          borderRadius: 2,
          position: 'relative',
          backgroundColor: `${alpha('#ffffff', 0.47)}`,
          border: '1px solid #ced4da',
          fontSize: 16,
          width: '480px',
          padding: '10px 12px',
          transition: `
          border-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, 
          background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, 
          box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
          `,
          // Use the system font instead of the default Roboto font.
          fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
          '&:focus': {
            boxShadow: `${alpha('#F07645', 0.25)} 0 0 0 0.2rem`,
            borderColor: '#F07645',
          },
        }
      }} />
    </FormControl>
    <FormControl variant="standard">
      <InputLabel shrink htmlFor="component-simple">Performance Fee</InputLabel>
      <Grid container alignItems="center">
        <Grid item>
          <Box sx={{ width: 430, marginTop: '24px' }}>
            <Slider
              aria-label="Performance Fee"
              defaultValue={5}
              min={minPerfFee}
              max={maxPerfFee}
              value={perfFee}
              onChange={handlePerfFeeSlider}
            />
          </Box>
        </Grid>
        <Grid item>
          <TextField sx={{ m: 2 ,width: 50, borderBottom:'solid 1px #ffffff', textAlign:'center' }} 
          size="small" value={perfFee} onChange={handlePerfFee} variant="standard"
            InputProps={{
              endAdornment: <InputAdornment position="start">%</InputAdornment>,
            }} />
        </Grid>
      </Grid>
    </FormControl>
    <Stack direction="row" spacing={2}>
      <CreateFundBackButton variant="contained" onClick={() => onBack()}>Back</CreateFundBackButton>
      <CreateFundConntinueButton variant="contained" 
      onClick={() => onContinue({ fundName, perfFee })} disabled={!fundName}>Continue</CreateFundConntinueButton>
    </Stack>
  </Stack>
}
