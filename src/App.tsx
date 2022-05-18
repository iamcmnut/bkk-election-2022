import React, { useState, useCallback, useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
// import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { Alert, Snackbar, ThemeProvider } from '@mui/material'

import { HeaderContainer } from './containers/HeaderContainer'
import { Explore } from './views/Explore'
import { RootState } from './state/store'
import { loadTopFunds, loadUserInvestor, loadRewardData } from './state/api-actions'
import { markAsShown } from './state/slices/notification'
import { light } from './theme/light'
import { CampCssBaseline } from './theme/CampCssBaseline'
import { CongratDialog } from './components/CongratDialog'
import { Result } from './views/Result'

export const App = (): JSX.Element => {
  const dispatch = useDispatch()

  // const { pathname } = useLocation()
  // const currPath = (pathname.split('/')?.[1] ?? 'explore')

  const { notifications } = useSelector((state: RootState) => state.notification)
  // const isInvestorLoading = useSelector((state: RootState) => !state.investor.currentInvestor)
  // const hasOwnFund = useSelector((state: RootState) =>
  //   !!state.investor.currentInvestor?.assets?.ownFunds
  //   && state.investor.currentInvestor.assets.ownFunds.length > 0
  // )

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
    //startAutoFill()
    //startAutoManageFunds()
  }, [])

  useEffect(() => {
    setReady(true)
  }, [role])


  if (notiMessage?.level === 'info') {
    dispatch(markAsShown(notiMessage))
  }

  return <ThemeProvider theme={light}>
    <CssBaseline />
    <CampCssBaseline />
    <HeaderContainer />
    {/* <ProgressTrackingDrawer /> */}
    <CongratDialog />
    <Routes>
      <Route path="/" element={<Explore />} />
      <Route path="/candidate" element={<Explore />}/>
      <Route path="/result" element={<Result />}/>
    </Routes>


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
