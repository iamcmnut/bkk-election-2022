import React, { FunctionComponent } from 'react'
import { Box, Avatar, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import NumberFormat from 'react-number-format'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

const StlyledBox = styled(Box)`
    border-radius: 10px;
    background-color: #01203D;
    box-shadow: 0px 0px 10px rgba(113, 99, 203, 0.4);
    margin: 5px;
    padding-left: 25px;
    padding-right: 25px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    align-content: flex-end;
    flex-direction: column;
    height: 120px;
    flex-basis: 100%;
`
type TextProps = {
  text?: string,
  color?: string,
  size?: string,
  weight?: string
}

const Text: FunctionComponent<TextProps> = ({ text = '',
  color = 'text',
  size = '30px',
  weight = '400',
  children,
}) =>
  <Typography
    variant="subtitle2"
    color={color}
    sx={{
      fontSize: size,
      fontWeight: weight,
    }}
  >
    {text}
    {children}
  </Typography>

export type PortfolioSummaryModel = {
  avatarUri: string
  investorName: string
  totalCapitalInvest: number
  profitLossSign: string
  profitLossPercent: number
  profitLossTotal: number
  currentValue: number
}
export type Props = {
  portfolioSummaryModel: PortfolioSummaryModel
}

export const PortfolioSummary = (prop: Props): JSX.Element => {
  const color = prop.portfolioSummaryModel.profitLossSign === '+' ?
    'success.main' :
    'error.main'

  const upDownSign = prop.portfolioSummaryModel.profitLossSign === '+' ?
    <ArrowDropUpIcon color='success' fontSize='large' /> :
    <ArrowDropDownIcon color='error' fontSize='large' />

  return <Box sx={{ display: 'flex', width: '100%' }}>
    <StlyledBox sx={{
      flexDirection: 'row',
      justifyContent: 'start',
      alignContent: 'center',
      alignItems: 'center',
      flexBasis: '200%',
    }}>
      <Avatar alt={prop.portfolioSummaryModel.investorName} src={prop.portfolioSummaryModel.avatarUri}
        sx={{ height: '86px', width: '86px' }} />
      <Box sx={{ justifyContent: 'center', alignItems: 'center', ml: 2 }}>
        <Text
          text="My Account"
          color="text.secondary"
          size='18px'
        />
        <Text
          text={prop.portfolioSummaryModel.investorName}
          color="text"
          size='30px'
          weight='700'
        />
      </Box>
    </StlyledBox>

    <StlyledBox>
      <Text
        text="Invested"
        color="text.secondary"
        size='18px'
      />
      <Text
        color="text"
        size='30px'
        weight='700'
      >
        {prop.portfolioSummaryModel.totalCapitalInvest}
      </Text>
    </StlyledBox>

    <StlyledBox>
      <Text
        text="P/L (%)"
        color="text.secondary"
        size='18px'
      />
      <Text
        color={color}
        size='30px'
        weight='700'
      >
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'nowrap',
        }}>
          {prop.portfolioSummaryModel.profitLossPercent}
          %
          {upDownSign}
        </Box>

      </Text>

    </StlyledBox>

    <StlyledBox>
      <Text
        text="P/L ($)"
        color="text.secondary"
        size='18px'
      />
      <Text
        color={color}
        size='30px'
        weight='700'
      >
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'nowrap',
        }}>
          {prop.portfolioSummaryModel.profitLossTotal}
        </Box>


      </Text>
    </StlyledBox>

    <StlyledBox>
      <Text
        text="Value($)"
        color="text.secondary"
        size='18px'
      />
      <Text
        color={color}
        size='30px'
        weight='700'
      >
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'nowrap',
        }}>

          {prop.portfolioSummaryModel.currentValue}
          {upDownSign}
        </Box>

      </Text>
    </StlyledBox>

  </Box>
}


