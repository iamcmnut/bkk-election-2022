import { v4 as uuid } from 'uuid'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  loadUserInvestor,
  createFund,
  deleteFund,
  exitFund,
  investFund,
  placeOrder,
  loadTopFunds,
} from '../api-actions'
import { NotificationMsg } from '../types'

type NotificationState = { notifications: NotificationMsg[] }
const initialState: NotificationState = { notifications: [] }

const slice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    markAsShown: (state: NotificationState, action: PayloadAction<NotificationMsg>) => {
      const noti = state.notifications.find((n) => n.id === action.payload.id)
      if (noti) {
        noti.wasShown = true
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUserInvestor.fulfilled, (state, action) => {
      if (action.payload.data && action.payload.data?.userId) {
        const userId = action.payload.data?.userId
        const text = `เชื่อมต่อ blockchain สำเร็จ, เลขกระเป๋าของคุณคือ: ${userId}`
        state.notifications.push({ id: uuid(), text, wasShown: false, level: 'success' })
        return
      }

      if (action.payload.error instanceof Error) {
        state.notifications.push({ id: uuid(), text: action.payload.error.message, wasShown: false, level: 'error' })
        return
      }

      state.notifications.push({ id: uuid(), text: 'unknown error', wasShown: false, level: 'error' })
    })
    builder.addCase(investFund.fulfilled, (state, action) => {
      if (action.payload.data) {
        const investedFund = action.payload.data?.funds?.find(f => f.fundAddress === action.meta.arg.fundAddress)
        if (investedFund) {
          state.notifications.push({
            id: uuid(),
            text: `คุณได้ลงคะแนนให้กับ "${investedFund.profile.name}"`,
            wasShown: false,
            level: 'success'  })
        }
        return
      }

      if (action.payload.error instanceof Error) {
        state.notifications.push({ id: uuid(), text: action.payload.error.message, wasShown: false, level: 'error'  })
        return
      }

      state.notifications.push({ id: uuid(), text: 'unknown error', wasShown: false, level: 'error'  })
    })
  },
})


export const { markAsShown } = slice.actions
export const { reducer: notificationReducer } = slice
