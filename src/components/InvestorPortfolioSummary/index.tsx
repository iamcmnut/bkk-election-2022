import React, { FunctionComponent } from 'react'
import { Box, Avatar, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import NumberFormat from 'react-number-format'

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

export type InvestorPortfolioSummaryModel = {
  avatarUri: string
  investorName: string
  totalInvested: number
  totalBalance: number
  avalable: number
}

export type Props = {
  portfolioSummaryModel: InvestorPortfolioSummaryModel
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

export const InvestorPortfolioSummary = (prop: Props): JSX.Element | null => {
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
        text="Total balance"
        color="text.secondary"
        size='18px'
      />
      <Text
        color="text"
        size='30px'
        weight='700'
      >
        {prop.portfolioSummaryModel.totalBalance}
      </Text>
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
        {prop.portfolioSummaryModel.totalInvested}
      </Text>
    </StlyledBox>


    <StlyledBox>
      <Text
        text="Available"
        color="text.secondary"
        size='18px'
      />
      <Text
        color="text"
        size='30px'
        weight='700'
      >
        {prop.portfolioSummaryModel.avalable}
      </Text>
    </StlyledBox>

  </Box>
}


