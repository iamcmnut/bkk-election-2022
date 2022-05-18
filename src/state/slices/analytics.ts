import amplitude from 'amplitude-js'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  investFund,
  loadUserInvestor,
  loadExplorePage,
  loadVoteResult,
  resetState,
} from '../api-actions'

const events = {
  investFund: 'vote',
  visitExplorePage: 'visit vote page',
  visitVoteResult: 'visit vote result',
  resetState: 'donate',
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
client.setVersionName('bkk-vote-2022')
const initialState: AnalyticsState = {
  isBasicRewardSubmitted: false,
}

const slice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    submitBasicReward: (state: AnalyticsState) => {
      if (!state.isBasicRewardSubmitted) {
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
    builder.addCase(loadVoteResult.fulfilled, () => {
      try {
        client.logEvent(events.visitVoteResult)
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
