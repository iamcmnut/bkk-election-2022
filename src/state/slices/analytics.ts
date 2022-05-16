import amplitude from 'amplitude-js'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  investFund,
  exitFund,
  createFund,
  deleteFund,
  placeOrder,
  loadUserInvestor,
  loadManagerDashboard,
  loadExplorePage,
  loadPortfolio,
  resetState,
} from '../api-actions'

const events = {
  investFund: 'invest fund',
  exitFund: 'exit fund',
  createFund: 'create fund',
  deleteFund: 'delete fund',
  placeOrder: 'place order',
  submitBasicReward: 'submit basic reward',
  visitFundDashboard: 'visit fund dashboard',
  visitExplorePage: 'visit explore page',
  visitPortfolio: 'visit portfolio',
  resetState: 'reset state',
}

type AnalyticsState = {
  isBasicRewardSubmitted: boolean
  userId?: string
}
type BasicRewardArgs = {
  walletAddress: string
  twitterId: string
  telegramId: string
}

const amplitudeKey = '5b311bb401471f5264ada45fc338772f'
const client = amplitude.getInstance()
client.init(amplitudeKey)
const initialState: AnalyticsState = {
  isBasicRewardSubmitted: false,
}

const slice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    submitBasicReward: (state: AnalyticsState, action: PayloadAction<BasicRewardArgs>) => {
      if (!state.isBasicRewardSubmitted) {
        const data = action.payload
        client.logEvent(events.submitBasicReward, {
          ...data
        })
        state.isBasicRewardSubmitted = true
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUserInvestor.fulfilled, (state, action) => {
      try {
        if (!state.userId || state.userId !== action.payload.data?.userId) {
          client.setUserId(action.payload.data?.userId ?? null)
          state.userId = action.payload.data?.userId
        }
      } catch (e) {
        console.log(e)
      }
    })
    builder.addCase(investFund.fulfilled, () => {
      try {
        client.logEvent(events.investFund)
      } catch (e) {
        console.log(e)
      }
    })
    builder.addCase(exitFund.fulfilled, () => {
      try {
        client.logEvent(events.exitFund)
      } catch (e) {
        console.log(e)
      }
    })
    builder.addCase(createFund.fulfilled, () => {
      try {
        client.logEvent(events.createFund)
      } catch (e) {
        console.log(e)
      }
    })
    builder.addCase(deleteFund.fulfilled, () => {
      try {
        client.logEvent(events.deleteFund)
      } catch (e) {
        console.log(e)
      }
    })
    builder.addCase(placeOrder.fulfilled, () => {
      try {
        client.logEvent(events.placeOrder)
      } catch (e) {
        console.log(e)
      }
    })
    builder.addCase(loadManagerDashboard.fulfilled, () => {
      try {
        client.logEvent(events.visitFundDashboard)
      } catch (e) {
        console.log(e)
      }
    })
    builder.addCase(loadPortfolio.fulfilled, () => {
      try {
        client.logEvent(events.visitPortfolio)
      } catch (e) {
        console.log(e)
      }
    })
    builder.addCase(loadExplorePage.fulfilled, () => {
      try {
        client.logEvent(events.visitExplorePage)
      } catch (e) {
        console.log(e)
      }
    })
    builder.addCase(resetState.fulfilled, () => {
      try {
        client.logEvent(events.resetState)
      } catch (e) {
        console.log(e)
      }
    })
  },
})


export const { submitBasicReward } = slice.actions
export const { reducer: analyticsReducer } = slice
