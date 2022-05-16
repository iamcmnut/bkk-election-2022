
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Skeleton } from '@mui/material'

import { TOKEN } from '../../bff/constants'
import { MarketListModal, Market } from '../../components/MarketListModal'
import { OpenPosition, Token } from '../../components/OpenPosition'
import { loadMarkets, loadTopFunds, placeOrder } from '../../state/api-actions'
import { setCurrentMarket } from '../../state/slices/markets'
import { RootState } from '../../state/store'
import { PlaceOrderInput } from '../../state/api-actions'
import { subscribeAutoFill, unsubscribeAutoFill } from '../../bff/auto-fill'


export const OpenPositionContainer = (): JSX.Element | null => {
  const dispatch = useDispatch()

  //redux state

  const [autoFillCount, setAutoFillCount] = useState(0)
  const markets = useSelector((state: RootState) => state.market.markets)
  const currentMarket = useSelector((state: RootState) => state.market.currentMarket || state.market.markets[0])
  const currentInvestor = useSelector((state: RootState) => state.investor.currentInvestor)
  const role = useSelector((state: RootState) => state.investor.role)
  const ownFundUsdt = useSelector(
    (state: RootState) =>
      state.funds.topFunds.find((f) =>
        f.fundAddress === state.investor?.currentInvestor?.assets?.ownFunds?.[0])
        ?.assets.tokens.filter((a) => a.symbol === 'USDT').reduce((acc, t) => acc + t.amount, 0))


  //local state
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const subKey = 'OpenPositionContainer'
    subscribeAutoFill({
      key: subKey,
      callback: setAutoFillCount,
    })
    dispatch(loadMarkets())
    return () => {
      unsubscribeAutoFill(subKey)
    }
  }, [])

  useEffect(() => {
    dispatch(loadTopFunds())
  }, [autoFillCount])


  // useEffect(() => {
  //   const totalUsdtBalance = ownFundUsdt?.assets.tokens.filter((a) => a.symbol === 'USDT')
  //     .reduce((acc, t) => acc + t.amount, 0)
  //   setAvailableUsdt(totalUsdtBalance || 0)
  // }, [ownFundUsdt])

  useEffect(() => {
    if (!currentMarket) {
      dispatch(setCurrentMarket(markets[0]))
    }
  }, [markets])

  console.log({ currentInvestor, currentMarket, markets })

  if (!currentInvestor || !currentMarket)
    return <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '5px',
    }}>
      <Skeleton
        variant="rectangular"
        width={1000}
        height={600}
        sx={{
          borderRadius: '10px',

        }} />
    </Box >



  const onPlaceOrder = (orderSize: number, side: 'buy' | 'sell') => {
    const input: PlaceOrderInput = {
      marketName: currentMarket?.name || 'BNB',
      side: side,
      fromToken: currentMarket.toTokenSymbol || '',
      fromTokenAmount: orderSize,
      toToken: currentMarket.fromTokenSymbol,
      toTokenAmount: orderSize / currentMarket.price,
      closePositionOrderId: '',
    }

    dispatch(placeOrder({ input, role }))
  }

  //call back
  const onClickToken1 = () => {
    openMarket()
  }

  const onClose = () => {
    setOpen(false)
  }

  const onSelectMarket = (market: Market) => {
    const selected = markets.find(e => e.fromTokenSymbol === market.ticker)
    if (selected) {
      dispatch(setCurrentMarket(selected))
    }
    onClose()
  }

  const openMarket = () => {
    setOpen(true)
  }
  //props
  const marKetProp: Market[] = markets.map(item => ({
    ticker: TOKEN[item.fromTokenSymbol].symbol,
    name: TOKEN[item.fromTokenSymbol].name,
    price: item.price,
    img: TOKEN[item.fromTokenSymbol].logoURI,
  }))
  const target: Token = {
    name: TOKEN[currentMarket?.fromTokenSymbol ?? 'BNB'].symbol,
    price: currentMarket?.price ?? 0,
    icon: TOKEN[currentMarket?.fromTokenSymbol ?? 'BNB'].logoURI,
    onClick: onClickToken1,
  }

  return <>
    <OpenPosition
      target={target}
      available={ownFundUsdt || 0}
      onPlaceOrder={onPlaceOrder}
    />
    <MarketListModal
      open={open}
      onClose={onClose}
      markets={marKetProp}
      onSelectMarket={onSelectMarket}
    />
  </>
}
