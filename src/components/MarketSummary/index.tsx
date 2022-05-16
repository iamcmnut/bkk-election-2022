import React from 'react'
import { Grid, Box, Typography, Button, Divider, Avatar } from '@mui/material'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import NumberFormat from 'react-number-format'

type CoinMarketSummaryModel = {
    iconUri: string
    shortName: string
    currentPrice: number
    percentChangeSign: '+'
    percentChange: number
    volume24Hour: number
    totalLiquidity: number
    marketCap: number
    fullyDilutedMarketCap: number
}

export type Props = {
  marketSummary: CoinMarketSummaryModel
}

export const MarketSummary = (prop: Props) => {
  const upDownSign = prop.marketSummary.percentChangeSign === '+' ?
    <ArrowDropUpIcon color='success' fontSize='large' /> :
    <ArrowDropDownIcon color='error' fontSize='large' />

  const color = prop.marketSummary.percentChangeSign==='+'?
'success.main':
'error.main'

  return (<Grid container
    alignItems="center"
    justifyContent="space-between"
    wrap="nowrap"
    style={{ backgroundColor: '#082746', minHeight: '83px', margin: '6px' }}>
    <Grid item xs={3}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}>
        <Button variant="text" sx={{ justifyContent: 'start' }} fullWidth>
          <Avatar alt={prop.marketSummary.shortName} src={prop.marketSummary.iconUri}
            style={{ height: '45px', width: '45px', margin: '10px' }} />
          < Typography variant="h4">{prop.marketSummary.shortName}</Typography>
        </Button>
      </Box>
    </Grid>
    <Grid item xs={1}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        flexDirection: 'column',
      }}>
        <Typography variant="h4" color={color}> ${prop.marketSummary.currentPrice.toLocaleString()}</Typography>
        <Typography variant="subtitle1" color={color}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
          }}>
            {prop.marketSummary.percentChange}
            % {upDownSign}
          </Box>
        </Typography>
      </Box>
    </Grid>
    <Divider orientation="vertical" flexItem />
    <Grid item xs={2}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'relative',
        top: '-10px',
        paddingLeft: '10px',
      }}>
        <Typography variant="subtitle2" color="text.secondary">
          24H Volume (USD
        </Typography>
        <Typography variant="h5" color="success">
          ${prop.marketSummary.volume24Hour.toLocaleString()}
        </Typography>
      </Box>
    </Grid>
    <Divider orientation="vertical" flexItem />
    <Grid item xs={2}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'relative',
        top: '-10px',
        paddingLeft: '10px',
      }}>
        <Typography variant="subtitle2" color="text.secondary">
          Total Liquidity
        </Typography>
        <Typography variant="h5" color="success">
          {prop.marketSummary.totalLiquidity}
        </Typography>
      </Box>
    </Grid>
    <Divider orientation="vertical" flexItem />
    <Grid item xs={2}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'relative',
        top: '-10px',
        paddingLeft: '10px',
      }}>
        <Typography variant="subtitle2" color="text.secondary">
          Market Cap
        </Typography>
        <Typography variant="h5" color="success">${prop.marketSummary.marketCap.toLocaleString()}</Typography>
      </Box>
    </Grid>
    <Divider orientation="vertical" flexItem />
    <Grid item xs={2}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'relative',
        top: '-10px',
        paddingLeft: '10px',
      }}>
        <Typography variant="subtitle2" color="text.secondary">
          Fully Diluted Market Cap
        </Typography>
        <Typography variant="h5" color="success">
          ${prop.marketSummary.fullyDilutedMarketCap.toLocaleString()}
        </Typography>
      </Box>
    </Grid>
  </Grid>)
}
