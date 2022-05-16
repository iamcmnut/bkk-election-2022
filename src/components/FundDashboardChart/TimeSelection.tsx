import React from 'react'
import { ToggleButtonGroup, ToggleButton, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

const ToggleButtonGroupStyled = styled(ToggleButtonGroup)`
  background-color: rgba(255, 255, 255, 0.14);
  border-radius: 10px;
`

const ToggleButtonStyled = styled(ToggleButton)`
  background-color: transparent !important;
  border-width: 0px;
  width: 50px;
  padding: 0px;
`

const TypographySelectedStyled = styled(Typography)`
  background-color: #01203D;
  border-radius: 5px;
  width: 45px;
  height: 28px;
  line-height: 28px;
  align-items: center;
  font-size: 14px;
`

const TypographyStyled = styled(Typography)`
  align-items: center;
  line-height: inherit;
  font-size: 14px;
`

type Input = {
  setTimeframe: (tf: string) => void
}
export const TimeSelection = ({ setTimeframe }: Input): JSX.Element => {
  const [time, setTime] = React.useState('24h')

  const handleChange = (_event: React.MouseEvent<HTMLElement>, newTime: string) => {
    if (newTime) {
      setTime(newTime)
      setTimeframe(newTime)
    }
  }
  return <ToggleButtonGroupStyled
      value={time}
      exclusive
      onChange={handleChange}
      aria-label="text alignment"
    >
      <ToggleButtonStyled value="24h" aria-label="24h">
        {time === '24h'
          ? (<TypographySelectedStyled>24h</TypographySelectedStyled>)
          : (<TypographyStyled>24h</TypographyStyled>)
        }
      </ToggleButtonStyled>
      <ToggleButtonStyled value="7d" aria-label="7d">
        {time === '7d'
          ? (<TypographySelectedStyled>7d</TypographySelectedStyled>)
          : (<TypographyStyled>7d</TypographyStyled>)
        }
      </ToggleButtonStyled>
      <ToggleButtonStyled value="30d" aria-label="30d">
        {time === '30d'
          ? (<TypographySelectedStyled>30d</TypographySelectedStyled>)
          : (<TypographyStyled>30d</TypographyStyled>)
        }
      </ToggleButtonStyled>
      <ToggleButtonStyled value="90d" aria-label="90d">
        {time === '90d'
          ? (<TypographySelectedStyled>90d</TypographySelectedStyled>)
          : (<TypographyStyled>90d</TypographyStyled>)
        }
      </ToggleButtonStyled>
    </ToggleButtonGroupStyled>
}

