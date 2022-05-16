import { createSlice, PayloadAction } from '@reduxjs/toolkit'


import { Market } from '../types'
import { loadMarkets } from '../api-actions'

type MarketState = { currentMarket: Market | null, markets: Market[] }
const initialState: MarketState = { currentMarket: null, markets: [] }

const slice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    setCurrentMarket: (state: MarketState, action: PayloadAction<Market>) => {
      state.currentMarket = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadMarkets.fulfilled, (state, action) => {
      if (action.payload.data) {
        state.markets = action.payload?.data
        return
      }
    })
  }
})

export const { setCurrentMarket } = slice.actions
export const { reducer: marketReducer } = slice
