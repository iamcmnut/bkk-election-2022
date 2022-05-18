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
  resetState,
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
      if (action.payload.data && action.payload.data?.profile) {
        const { name } = action.payload.data.profile
        const text = `Hello ${name}`
        state.notifications.push({ id: uuid(), text, wasShown: false, level: 'info' })
        return
      }

      if (action.payload.error instanceof Error) {
        state.notifications.push({ id: uuid(), text: action.payload.error.message, wasShown: false, level: 'error' })
        return
      }

      state.notifications.push({ id: uuid(), text: 'unknown error', wasShown: false, level: 'error' })
    })
    builder.addCase(loadTopFunds.fulfilled, (state, action) => {
      if (action.payload.data) {
        state.notifications.push({ id: uuid(), text: 'Top funds was loaded', wasShown: false, level: 'info' })
        return
      }

      if (action.payload.error instanceof Error) {
        state.notifications.push({ id: uuid(), text: action.payload.error.message, wasShown: false, level: 'error' })
        return
      }

      state.notifications.push({ id: uuid(), text: 'unknown error', wasShown: false, level: 'error' })
    })
    builder.addCase(placeOrder.fulfilled, (state, action) => {
      if (action.payload.data) {
        state.notifications.push({
          id: uuid(),
          text: 'The order was successfully PLACED!',
          wasShown: false,
          level: 'success'
        })
        return
      }

      if (action.payload.error instanceof Error) {
        state.notifications.push({ id: uuid(), text: action.payload.error.message, wasShown: false, level: 'error'  })
        return
      }

      state.notifications.push({ id: uuid(), text: 'unknown error', wasShown: false, level: 'error'  })
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
    builder.addCase(exitFund.fulfilled, (state, action) => {
      if (action.payload.data) {
        const investedFund = action.payload.data?.funds?.find(f => f.fundAddress === action.meta.arg.fundAddress)
        if (investedFund) {
          state.notifications.push({
            id: uuid(),
            text:
              `You've just withdrawed (${action.meta.arg.usdtAmount} USDT) from "${investedFund.profile.name}" fund`,
            wasShown: false,
            level: 'success'
          })
        }
        return
      }

      if (action.payload.error instanceof Error) {
        state.notifications.push({ id: uuid(), text: action.payload.error.message, wasShown: false, level: 'error'  })
        return
      }

      state.notifications.push({ id: uuid(), text: 'unknown error', wasShown: false, level: 'error'  })
    })
    builder.addCase(createFund.fulfilled, (state, action) => {
      if (action.payload.data) {
        const newFund = action.payload.data?.funds?.find(f =>
          f.fundAddress === action.payload.data?.userInvestor?.assets?.ownFunds?.[0])
        if (newFund) {
          state.notifications.push({
            id: uuid(),
            text: `Your new fund "${newFund.profile.name}" has just been CREATED!`,
            wasShown: false,
            level: 'success'
          })
        }
        return
      }

      if (action.payload.error instanceof Error) {
        state.notifications.push({ id: uuid(), text: action.payload.error.message, wasShown: false, level: 'error'  })
        return
      }

      state.notifications.push({ id: uuid(), text: 'unknown error', wasShown: false, level: 'error'  })
    })
    builder.addCase(deleteFund.fulfilled, (state, action) => {
      if (action.payload.data) {
        const newFund = action.payload.data?.funds?.find(f =>
          f.fundAddress === action.payload.data?.userInvestor?.assets?.ownFunds?.[0])
        if (newFund) {
          state.notifications.push({
            id: uuid(),
            text: `Your fund "${newFund.profile.name}" has been DELETED!`,
            wasShown: false,
            level: 'success'
          })
        }
        return
      }

      if (action.payload.error instanceof Error) {
        state.notifications.push({ id: uuid(), text: action.payload.error.message, wasShown: false, level: 'error'  })
        return
      }

      state.notifications.push({ id: uuid(), text: 'unknown error', wasShown: false, level: 'error'  })
    })
    builder.addCase(resetState.fulfilled, (state, action) => {
      if (action.payload.data) {
        state.notifications.push({
          id: uuid(),
          text: 'All fake data was reset!',
          wasShown: false,
          level: 'success'
        })
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
