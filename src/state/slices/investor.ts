import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  loadUserInvestor,
  createFund,
  deleteFund,
  exitFund,
  investFund,
  placeOrder,
} from '../api-actions'
import { Investor, Role } from '../types'

type InvestorState = { currentInvestor: Investor | null, role: Role }
const initialState: InvestorState = { currentInvestor: null, role: 'investor' }

const slice = createSlice({
  name: 'currentInvestor',
  initialState,
  reducers: {
    setRole: (state: InvestorState, action: PayloadAction<Role>) => {
      state.role = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUserInvestor.fulfilled, (state, action) => {
      if (action.payload.data) {
        state.currentInvestor = action.payload.data
      }
    })
    builder.addCase(placeOrder.fulfilled, (state, action) => {
      if (action.payload.data) {
        state.currentInvestor = action.payload.data.userInvestor
      }
    })
    builder.addCase(investFund.fulfilled, (state, action) => {
      if (action.payload.data) {
        state.currentInvestor = action.payload.data.userInvestor
      }
    })
    builder.addCase(exitFund.fulfilled, (state, action) => {
      if (action.payload.data) {
        state.currentInvestor = action.payload.data.userInvestor
      }
    })
    builder.addCase(createFund.fulfilled, (state, action) => {
      if (action.payload.data) {
        state.currentInvestor = action.payload.data.userInvestor
      }
    })
    builder.addCase(deleteFund.fulfilled, (state, action) => {
      if (action.payload.data) {
        state.currentInvestor = action.payload.data.userInvestor
      }
    })
  },
})

export const { setRole } = slice.actions
export const { reducer: investorReducer } = slice
