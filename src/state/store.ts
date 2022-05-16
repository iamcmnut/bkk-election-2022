import { configureStore } from '@reduxjs/toolkit'

import { investorReducer } from './slices/investor'
import { fundsReducer } from './slices/funds'
import { notificationReducer } from './slices/notification'
import { marketReducer } from './slices/markets'
import { rewardTrackingReducer } from './slices/reward-tracking'
import { analyticsReducer } from './slices/analytics'

export const store = configureStore({
  reducer: {
    investor: investorReducer,
    funds: fundsReducer,
    notification: notificationReducer,
    market: marketReducer,
    rewardTracking: rewardTrackingReducer,
    analytics: analyticsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
