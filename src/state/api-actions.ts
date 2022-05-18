import { createAsyncThunk } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'

import {
  createFundBff,
  deleteFundBff,
  exitFundBff,
  investFundBff,
  loadExplorePageBff,
  loadManagerDashboardBff,
  loadMarketsBff,
  loadTopFundsBff,
  loadPortfolioBff,
  loadUserInvestorBff,
  loadRewardDataBff,
  placeOrderBff,
  submitRewardBff,
  showCongratulationsBff,
} from '../bff/api'

import { Fund, Order, RewardSubmitForm, Role } from './types'

export const loadUserInvestor = createAsyncThunk(
  'apis/loadUserInvestor',
  async () => {
    const response = await loadUserInvestorBff()
    return response
  },
)

export const loadTopFunds = createAsyncThunk(
  'apis/loadTopFunds',
  async () => {
    const response = await loadTopFundsBff()
    return response
  },
)
export type PlaceOrderInput = Pick<Order,
  | 'marketName'
  | 'side'
  | 'fromToken'
  | 'fromTokenAmount'
  | 'toToken'
  | 'toTokenAmount'
  | 'closePositionOrderId'
>
export const placeOrder = createAsyncThunk(
  'apis/placeOrder',
  async ({ input, role }: { input: PlaceOrderInput, role: Role }) => {
    //call genrate order
    const newOrder: Order = {
      id: uuid(),
      type: 'market',
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...input,
    }
    const response = await placeOrderBff(newOrder, role)
    return response
  },
)

export const investFund = createAsyncThunk(
  'apis/investFund',
  async ({ fundAddress, usdtAmount }: { fundAddress: Fund['fundAddress'], usdtAmount: number }) => {
    const response = await investFundBff(fundAddress, usdtAmount)
    return response
  },
)

export const exitFund = createAsyncThunk(
  'apis/exitFund',
  async ({ fundAddress, usdtAmount }: { fundAddress: Fund['fundAddress'], usdtAmount: number }) => {
    const response = await exitFundBff(fundAddress, usdtAmount)
    return response
  },
)

export const createFund = createAsyncThunk(
  'apis/createFund',
  async (
    fundInput: Pick<Fund, 'profile' | 'performanceFeePercent' | 'tags'>,
  ) => {
    const response = await createFundBff(fundInput)
    return response
  },
)

export const deleteFund = createAsyncThunk(
  'apis/deleteFund',
  async (fundAddress: Fund['fundAddress']) => {
    const response = await deleteFundBff(fundAddress)
    return response
  },
)

export const loadMarkets = createAsyncThunk(
  'apis/loadMarkets',
  async () => {

    const response = await loadMarketsBff()
    return response
  },
)

export const loadManagerDashboard = createAsyncThunk(
  'apis/visitFundDashboard',
  async () => {
    const response = await loadManagerDashboardBff()
    return response
  },
)

export const loadVoteResult = createAsyncThunk(
  'apis/voteResult',
  async () => {
    return 'loadVoteResult'
  },
)

export const loadExplorePage = createAsyncThunk(
  'apis/visitExplorePage',
  async () => {
    const response = await loadExplorePageBff()
    return response
  },
)

export const loadPortfolio = createAsyncThunk(
  'apis/visitPortfolio',
  async () => {
    const response = await loadPortfolioBff()
    return response
  },
)

export const loadRewardData = createAsyncThunk(
  'apis/loadRewardData',
  async () => {
    const response = await loadRewardDataBff()
    return response
  },
)

export const resetState = createAsyncThunk(
  'apis/resetState',
  async () => {
    return 'reset'
  },
)

export const submitReward = createAsyncThunk(
  'apis/submitReward',
  async (form: RewardSubmitForm) => {
    const response = await submitRewardBff(form)
    return response
  },
)

export const showCongratulations = createAsyncThunk(
  'apis/showCongratulations',
  async (isShow: boolean) => {
    const response = await showCongratulationsBff(isShow)
    return response
  },
)
