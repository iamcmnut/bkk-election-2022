/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

import { CoinPositionModel, InvestorPortfolioPositionList } from '../../components/InvestorPortfolioPositionList'
import { RootState } from '../../state/store'
import { getUsdtValueFromTokenAssets } from '../../bff/get-usdt-value-from-token-assets'
import { InvestorPortfolioSummary, InvestorPortfolioSummaryModel } from '../../components/InvestorPortfolioSummary'
import { getUsdValueFormTokenAssetsArray } from '../../bff/get-total-invested-from-token-asstet-array'
import { TOKEN } from '../../bff/constants'

export const InvestorPortfolioContainer = () => {
  const [summary, setSummary] = useState<InvestorPortfolioSummaryModel | null>(null)
  const [coinPositions, setCoinPositions] = useState<CoinPositionModel[] | null>([])
  const topFunds = useSelector((state: RootState) => state.funds.topFunds)
  const currentInvestor = useSelector((state: RootState) => state.investor.currentInvestor)
  const copyingFundsFromInvestor = useSelector((state: RootState) => state.investor.currentInvestor?.assets.copyingFunds)

  useEffect(() => {
    if (!currentInvestor) return
    const copyingFundsAssets = currentInvestor.assets.copyingFunds.map(fund => fund.assets.tokens)

    const totalUsdtAvailable = currentInvestor.assets.tokens
      .filter((a) => a.symbol === 'USDT')
      .reduce((acc, t) => acc + t.amount, 0)

    let sum: InvestorPortfolioSummaryModel = {
      avatarUri: currentInvestor.profile?.picUri ?? '',
      investorName: currentInvestor.profile?.name ?? 'Unnamed investor',
      totalInvested: 0,
      totalBalance: 0,
      avalable: totalUsdtAvailable,

    }
    getUsdValueFormTokenAssetsArray(copyingFundsAssets).then(value => {
      sum = {
        ...sum,
        totalInvested: value,
        totalBalance: value + sum.avalable

      }
      setSummary(sum)
    })

    // getUsdtValueFromTokenAssets(copyingFund.assets.tokens)
    // .then((v) => setTotalInvestedUsdt(v))
    // .catch(e => console.log(e))
    //create add stable coin
    let positions: CoinPositionModel[] = []
    positions.push(
      {
        icon: TOKEN.USDT.logoURI,
        name: TOKEN.USDT.name,
        shortName: TOKEN.USDT.symbol,
        unit: totalUsdtAvailable,
        currentValue: totalUsdtAvailable,
      }
    )
    setCoinPositions([...positions])
    //let copyingFundsSummary: CoinPositionModel[] = []
    if (copyingFundsFromInvestor)
      Promise.all(
        copyingFundsFromInvestor.map(async fund => {
          getUsdtValueFromTokenAssets(fund.assets.tokens).then((v) => {
            const invested = currentInvestor.assets.copyingFunds.find(f => f.fundAddress == fund.fundAddress)?.invested ?? 0
            if (invested > 0) {
              positions.push(
                {
                  fundAddress: fund.fundAddress,
                  icon: topFunds.find(f => f.fundAddress == fund.fundAddress)?.profile.picUri,
                  //shortName: TOKEN.USDT.symbol,
                  shortName: topFunds.find(f => f.fundAddress == fund.fundAddress)?.profile.name,
                  //unit: totalUsdtAvailable,
                  currentValue: v,//copyingFunds.find(f => f.fundAddress === fund.fundAddress)?.assets.tokens.find(token => token.symbol === 'USDT')?.amount,
                  invested: invested,
                  pnl: v - (invested ?? 0),
                  onClick: selectFund
                }
              )
              setCoinPositions([...positions])
            }

          })
            .catch(e => console.log(e))
        })
      )
    // copyingFunds.forEach(fund => {

    //   positions.push(
    //     {
    //       fundAddress: fund.fundAddress,
    //       icon: fund.profile.picUri,
    //       //shortName: TOKEN.USDT.symbol,
    //       shortName: fund.profile.name,
    //       //unit: totalUsdtAvailable,
    //       currentValue: copyingFunds.find(f => f.fundAddress === fund.fundAddress)?.assets.tokens.find(token => token.symbol === 'USDT')?.amount,
    //       invested: currentInvestor.assets.copyingFunds.find(f => f.fundAddress == fund.fundAddress)?.invested,
    //       pnl: 100,
    //       onClick: selectFund
    //     }
    //   )
    // })


    // positions.push(...copyingFundsSummary)




    // setCoinPositions(currentInvestor.assets.tokens.map((t) => ({
    //   icon: 'https://assets.coingecko.com/coins/images/1/thumb_2x/bitcoin.png?1547033579',
    //   name: 'Test',
    //   shortName: t.symbol,
    //   unit: t.amount,

    //   invested: 0,
    //   pnl: 0,
    //   currentValue: 0,
    // })))
  }, [currentInvestor, topFunds])
  // Summary:
  // Investor Image
  // Total Balance
  // Total Invested
  // Available

  //List
  // Stable Coin
  // Unit
  // Value

  // Fund List
  // Invested
  // PnL%
  // Current Value

  const selectFund = (address: String) => {
    console.log(address)
  }

  return <Grid
    container
    direction="column"
    justifyContent="space-evenly"
    padding={5}
    spacing={3}
  >
    <Grid item xs>
      <Typography variant="h4">
        PORTFOLIO
      </Typography>
    </Grid>
    {summary && <Grid item xs>
      <InvestorPortfolioSummary portfolioSummaryModel={summary} />
    </Grid>}
    {coinPositions &&
      < Grid item xs>
        <InvestorPortfolioPositionList coinPositions={coinPositions.sort()} />
      </Grid>
    }
  </Grid >
}
