import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  loadExplorePage,
  createFund,
  investFund,
  placeOrder,
  loadManagerDashboard,
  loadPortfolio,
  loadRewardData,
  submitReward,
} from '../api-actions'
import { RewardProgress, RewardSubmitForm } from '../types'
import { save } from '../../bff/mock-state'

// Basic tasks:
// 1. Investor - Explore Explore page
// 2. Investor - Copy fund
// 3. Investor - Explore portfolio
// 4. Manager  - Create fund
// 5. Manager  - Start trade
// 6. Manager  - Explore dashboard

type RewardTrackingState = { progress: RewardProgress }
const initialState: RewardTrackingState = {
  progress: {
    visitExplorePage: 0,
    copyFund: 0,
    visitPortfolio: 0,
    createFund: 0,
    placeOrder: 0,
    visitFundDashboard: 0,
    formSubmitted: false,
    telegramId: '',
    twitterAccount: '',
    walletAddress: '',
    showCongratulations: false,
  }
}

const slice = createSlice({
  name: 'rewardTracking',
  initialState,
  reducers: {
    copyFund: (state: RewardTrackingState, action: PayloadAction<number>) => {
      if (action.payload > 0) {
        state.progress.copyFund += action.payload
      }
    },
    submitRewardForm: (state: RewardTrackingState, action: PayloadAction<RewardSubmitForm>) => {
      state.progress.telegramId = action.payload.telegramId
      state.progress.twitterAccount = action.payload.twitterAccount
      state.progress.walletAddress = action.payload.walletAddress
      // TODO: send analytics
      state.progress.formSubmitted = true
      save()
    },
    showCongratulation: (state: RewardTrackingState, action: PayloadAction<boolean>) => {
      state.progress.showCongratulations = action.payload
    },
  },
  extraReducers: (builder) => {
    // 1. Investor - Explore Explore page
    builder.addCase(loadExplorePage.fulfilled, (state, action) => {
      if (action.payload.data) {
        state.progress.visitExplorePage += 1
        return
      }
    })
    // 2. Investor - Copy fund
    builder.addCase(investFund.fulfilled, (state, action) => {
      if (action.payload.data) {
        const investedFund = action.payload.data?.funds?.find(f => f.fundAddress === action.meta.arg.fundAddress)
        if (investedFund) {
          state.progress.copyFund += 1
        }
        return
      }
    })
    // 3. Investor - Explore portfolio
    builder.addCase(loadPortfolio.fulfilled, (state, action) => {
      if (action.payload.data) {
        state.progress.visitPortfolio += 1
        return
      }
    })
    // 4. Manager  - Create fund
    builder.addCase(createFund.fulfilled, (state, action) => {
      if (action.payload.data) {
        state.progress.createFund += 1
        return
      }
    })
    // 5. Manager  - Start trade
    builder.addCase(placeOrder.fulfilled, (state, action) => {
      if (action.payload.data) {
        state.progress.placeOrder += 1
        return
      }
    })
    // 6. Manager  - Explore dashboard
    builder.addCase(loadManagerDashboard.fulfilled, (state, action) => {
      if (action.payload.data) {
        state.progress.visitFundDashboard += 1
        return
      }
    })
    builder.addCase(loadRewardData.fulfilled, (state, action) => {
      if (action.payload.data) {
        console.log('load reward data')
        if (action.payload.data.rewardTracking) {
          state.progress = action.payload.data.rewardTracking
        }

        return
      }
    })
    builder.addCase(submitReward.fulfilled, (state, action) => {
      if (action.payload.data) {
        console.log('submit reward')
        state.progress = action.payload.data.rewardTracking
        return
      }
    })

  },
})
export const { showCongratulation, submitRewardForm } = slice.actions
export const { reducer: rewardTrackingReducer } = slice
