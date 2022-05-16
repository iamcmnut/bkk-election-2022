import React, { useState, useCallback, useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Alert, Snackbar, ThemeProvider } from '@mui/material'

import { HeaderContainer } from './containers/HeaderContainer'
import { Explore } from './views/Explore'
import { Swap } from './views/Swap'
import { Port } from './views/Port'
import { RootState } from './state/store'
import { loadTopFunds, loadUserInvestor, loadRewardData } from './state/api-actions'
import { markAsShown } from './state/slices/notification'
import { dark } from './theme/dark'
import { light } from './theme/light'
import { CampCssBaseline } from './theme/CampCssBaseline'
import { ProgressTrackingDrawer } from './components/ProgressTrackingDrawer'
import { Trade } from './views/Trade'
import { FundDashboard } from './views/FundDashboard'
import { startAutoFill } from './bff/auto-fill'
import { CongratDialog } from './components/CongratDialog'
import { startAutoManageFunds } from './bff/auto-manage-funds'

export const App = (): JSX.Element => {
  const dispatch = useDispatch()

  const { pathname } = useLocation()
  const currPath = (pathname.split('/')?.[1] ?? 'explore')

  const { notifications } = useSelector((state: RootState) => state.notification)
  const isInvestorLoading = useSelector((state: RootState) => !state.investor.currentInvestor)
  const hasOwnFund = useSelector((state: RootState) =>
    !!state.investor.currentInvestor?.assets?.ownFunds
    && state.investor.currentInvestor.assets.ownFunds.length > 0
  )

  const role = useSelector((state: RootState) => state.investor.role)
  const notiMessage = notifications.find((n) => !n.wasShown)
  const handleClose = useCallback(() => {
    if (notiMessage) {
      dispatch(markAsShown(notiMessage))
    }
  }, [notiMessage])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    dispatch(loadUserInvestor())
    dispatch(loadTopFunds())
    //load tracking reward
    dispatch(loadRewardData())
    startAutoFill()
    startAutoManageFunds()
  }, [])

  useEffect(() => {
    setReady(true)
  }, [role])


  if (notiMessage?.level === 'info') {
    dispatch(markAsShown(notiMessage))
  }

  return <ThemeProvider theme={role == 'manager' && currPath == 'trade' ? dark : light}>
    <CssBaseline />
    <CampCssBaseline />
    <HeaderContainer />
    {/* <ProgressTrackingDrawer /> */}
    <CongratDialog />
    {ready &&
      <Routes>
        <Route path="/" element={<Navigate to='/explore' replace={true} />} />
        <Route path="/explore"
          element={role === 'investor' ? <Explore /> : <Navigate to='/fund-dashboard' replace={true} />}
        />
        <Route path="/swap"
          element={role === 'investor' ? <Swap /> : <Navigate to='/fund-dashboard' replace={true} />}
        />
        <Route path="/port"
          element={role === 'investor' ? <Port /> : <Navigate to='/fund-dashboard' replace={true} />}
        />
        <Route path="/fund-dashboard" element={
          role === 'manager' ? <FundDashboard /> : <Navigate to='/explore' replace={true} />
        } />
        <Route path="/trade"
          element={
            (role === 'manager') ?
              (hasOwnFund || isInvestorLoading) ?
                <Trade />
                : <Navigate to='/fund-dashboard' replace />
              : <Navigate to='/explore' replace={true} />
          }
        />
      </Routes>
    }


    {notiMessage?.level !== 'info' ? (
      <Snackbar
        open={!!notiMessage}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={notiMessage?.level} sx={{ width: '100%' }}>
          {notiMessage?.text ?? ''}
        </Alert>
      </Snackbar>
    ) : undefined}
  </ThemeProvider>
}
