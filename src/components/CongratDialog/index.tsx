import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../../state/store'
import { showCongratulations as showCongratulationsAction } from '../../state/api-actions'


export const CongratDialog = (): JSX.Element | null => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  //investor
  const visitExplorePage = useSelector((state: RootState) => state.rewardTracking.progress.visitExplorePage)
  const copyFund = useSelector((state: RootState) => state.rewardTracking.progress.copyFund)
  const visitPortfolio = useSelector((state: RootState) => state.rewardTracking.progress.visitPortfolio)
  //manager
  const placeOrder = useSelector((state: RootState) => state.rewardTracking.progress.placeOrder)
  const visitFundDashboard = useSelector((state: RootState) => state.rewardTracking.progress.visitFundDashboard)
  const createFund = useSelector((state: RootState) => state.rewardTracking.progress.createFund)
  //submit
  const showCongratulations = useSelector((state: RootState) => state.rewardTracking.progress.showCongratulations)


  useEffect(() => {

    if (showCongratulations == undefined) return
    const finishedInvestor = visitExplorePage > 0 && copyFund > 0 && visitPortfolio > 0
    const finishedManager = placeOrder > 0 && visitFundDashboard > 0 && createFund > 0
    const shouldShow = showCongratulations == false && finishedInvestor && finishedManager
    if (shouldShow) {
      setOpen(true)

      dispatch(showCongratulationsAction(true))

    }

  }, [visitExplorePage, copyFund, visitPortfolio, placeOrder, visitFundDashboard, createFund, showCongratulations])
  const onClose = () => {
    setOpen(false)
  }
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: "white",
        }
      }}
    >
      <DialogTitle color='black'>
        Congrats! You are rock!
      </DialogTitle>
      <DialogContent >
        <DialogContentText color='black'>
          You have completed all the basic tasks in this demo.
          Therefore you will be able to submit your entry to get a chance of getting a basic reward.
          Please note that your journey is not quite end yet, keep exploring and you might be surprised
          what reward you might stump upon!
        </DialogContentText>
      </DialogContent>
    </Dialog >
  )
}
