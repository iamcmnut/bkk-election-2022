import { Order, Fund, Role, Investor, Market, RewardProgress, RewardSubmitForm } from '../state/types'
import { connectAndSwitchNetwork, vote } from '../services/web3'

import { generateMarkets, getState, reset, save } from './mock-state'
import { generateFollowers } from './generate-followers'
import { generateRandomAddr } from './generate-random-addr'
import { addTokenToTokenAssets, removeTokenFromTokenAssets } from './manage-token-assets'
import { TOKEN } from './constants'
import { randomFloor2digits } from './random-floor-2-digits'
import { copyOrder } from './copy-order'

type AppState = {
  userInvestor: Investor,
  funds: Fund[],
  rewardTracking: RewardProgress,
}

type BffResponse<T> = {
  statusCode: number
  data?: T
  error?: Error | unknown
}

const stupidClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj)) as T

export const loadUserInvestorBff = async (): Promise<BffResponse<Investor>> => {
  const { userInvestor } = getState()
  const res: BffResponse<Investor> = {
    statusCode: 500,
  }
  try {
    const acc = await connectAndSwitchNetwork()
    userInvestor.userId = acc
    res.data = userInvestor
    res.statusCode = 200
  } catch (err) {
    res.statusCode = 500
    res.error = err
  }

  return res
}

export const loadTopFundsBff = async (): Promise<BffResponse<Fund[]>> => {
  const { funds } = getState()
  return {
    statusCode: 200,
    data: stupidClone(funds),
  }
}

export const placeOrderBff = async (order: Order, role: Role): Promise<BffResponse<AppState>> => {
  try {
    const currentState = getState()
    const { userInvestor, funds, rewardTracking } = currentState
    if (role === 'investor') {
      userInvestor.orders.push(order)
    }
    if (role === 'manager') {
      const ownFundAddr = userInvestor.assets.ownFunds?.[0]
      if (!ownFundAddr) throw new Error('User has no fund')

      const ownFund = funds.find((f) => f.fundAddress === ownFundAddr)

      if (!ownFund) throw new Error('Fund not found')

      ownFund.orders.push(order)

      if (ownFund.followers.includes(userInvestor.walletAddress)) {
        await copyOrder(ownFund, userInvestor, order)
      }
    }

    rewardTracking.placeOrder += 1

    save()

    return {
      statusCode: 200,
      data: stupidClone(currentState),
    }
  } catch (e) {
    return {
      statusCode: 500,
      error: e,
    }
  }
}

export const investFundBff = async (
  fundAddress: Fund['fundAddress'],
  usdtAmount: number,
): Promise<BffResponse<AppState>> => {
  try {
    const currentState = getState()
    const { userInvestor, funds, rewardTracking } = currentState
    const fund = funds.find((f) => f.fundAddress === fundAddress)

    if (!fund) throw new Error('Fund not found')

    // const { walletAddress: investorAddress } = userInvestor

    // if (!fund.followers.includes(investorAddress)) {
    //   fund.followers.push(userInvestor.walletAddress)
    // }

    // const { copyingFunds, tokens: userTokens } = userInvestor.assets

    // // remove usdt from user
    // removeTokenFromTokenAssets(userTokens, 'USDT', usdtAmount)

    // move usdt to copying fund
    // const copyingFund = copyingFunds.find((f) => f.fundAddress === fundAddress)
    // if (copyingFund) {

    //   addTokenToTokenAssets(copyingFund.assets.tokens, 'USDT', usdtAmount)
    //   copyingFund.invested += usdtAmount
    // } else {
    //   userInvestor.assets.copyingFunds.push({
    //     invested: usdtAmount,
    //     fundAddress,
    //     assets: {
    //       tokens: [
    //         { symbol: 'USDT', amount: usdtAmount },
    //       ],
    //     },
    //     orders: [],
    //   })
    // }

    // rewardTracking.copyFund += 1

    try {
      await vote(fund.campScore.consistency)
    } catch(err) {

      const errMsg = (err as any).reason ? (err as any).reason : 'ยกเลิกการ vote'

      return {
        statusCode: 500,
        error: new Error(errMsg),
      }
    }

    save()

    return {
      statusCode: 200,
      data: stupidClone(currentState),
    }
  } catch (e) {
    return {
      statusCode: 500,
      error: e,
    }
  }
}

export const exitFundBff = async (
  fundAddress: Fund['fundAddress'],
  usdtAmount: number,
): Promise<BffResponse<AppState>> => {
  try {
    const currentState = getState()
    const { userInvestor, funds } = currentState
    const fund = funds.find((f) => f.fundAddress === fundAddress)

    if (!fund) throw new Error('Fund not found')

    const { copyingFunds, tokens: userTokens } = userInvestor.assets
    const copyingFund = copyingFunds.find((f) => f.fundAddress === fundAddress)

    if (!copyingFund) {
      throw new Error('No fund to exit')
    }

    // remove usdt from fund
    removeTokenFromTokenAssets(copyingFund.assets.tokens, 'USDT', usdtAmount)
    copyingFund.invested -= usdtAmount

    // add usdt to user
    addTokenToTokenAssets(userTokens, 'USDT', usdtAmount)

    save()

    return {
      statusCode: 200,
      data: stupidClone(currentState),
    }
  } catch (e) {
    return {
      statusCode: 500,
      error: e,
    }
  }
}

export const createFundBff = async (
  fundInput: Pick<Fund, 'profile' | 'performanceFeePercent' | 'tags'>,
): Promise<BffResponse<AppState>> => {
  try {
    const currentState = getState()
    const { userInvestor, funds, rewardTracking } = currentState
    const newFund: Fund = {
      fundAddress: generateRandomAddr(),
      performanceFeePercent: fundInput.performanceFeePercent,
      campScore: {
        return: randomFloor2digits(25),
        risk: randomFloor2digits(25),
        riskAdjustedReturn: randomFloor2digits(30),
        consistency: randomFloor2digits(20),
      },
      followers: generateFollowers(10),
      orders: [],
      assets: {
        tokens: [
          {
            symbol: TOKEN.USDT.symbol,
            amount: 100000
          }
        ]
      },
      invested: 100000,
      tags: fundInput.tags,
      profile: fundInput.profile,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    funds.push(newFund)
    userInvestor.assets.ownFunds.push(newFund.fundAddress)
    rewardTracking.createFund += 1

    save()

    return {
      statusCode: 200,
      data: stupidClone(currentState),
    }
  } catch (e) {
    return {
      statusCode: 500,
      error: e,
    }
  }
}

export const deleteFundBff = async (fundAddress: Fund['fundAddress']): Promise<BffResponse<AppState>> => {
  try {
    const currentState = getState()
    const { userInvestor, funds } = currentState
    userInvestor.assets.ownFunds = userInvestor.assets.ownFunds.filter((f: Fund['fundAddress']) => f !== fundAddress)
    currentState.funds = funds.filter((f) => f.fundAddress !== fundAddress)

    save()

    return {
      statusCode: 200,
      data: stupidClone(currentState),
    }
  } catch (e) {
    return {
      statusCode: 500,
      error: e,
    }
  }
}


export const loadMarketsBff = async (): Promise<BffResponse<Market[]>> => {
  const markets = await generateMarkets()
  return {
    statusCode: 200,
    data: stupidClone(markets),
  }
}

export const loadManagerDashboardBff = async (): Promise<BffResponse<AppState>> => {
  try {
    const currentState = getState()
    const { rewardTracking } = currentState
    rewardTracking.visitFundDashboard += 1
    save()
    return {
      statusCode: 200,
      data: stupidClone(currentState),
    }
  } catch (e) {
    return {
      statusCode: 500,
      error: e,
    }
  }
}

export const loadExplorePageBff = async (): Promise<BffResponse<AppState>> => {
  try {
    const currentState = getState()
    const { rewardTracking } = currentState
    rewardTracking.visitExplorePage += 1
    save()
    return {
      statusCode: 200,
      data: stupidClone(currentState),
    }
  } catch (e) {
    return {
      statusCode: 500,
      error: e,
    }
  }
}

export const loadPortfolioBff = async (): Promise<BffResponse<AppState>> => {
  try {
    const currentState = getState()
    const { rewardTracking } = currentState
    rewardTracking.visitPortfolio += 1
    save()
    return {
      statusCode: 200,
      data: stupidClone(currentState),
    }
  } catch (e) {
    return {
      statusCode: 500,
      error: e,
    }
  }
}

export const loadRewardDataBff = async (): Promise<BffResponse<AppState>> => {
  try {
    const currentState = getState()
    return {
      statusCode: 200,
      data: stupidClone(currentState),
    }
  } catch (e) {
    return {
      statusCode: 500,
      error: e,
    }
  }
}

export const resetBff = async (): Promise<BffResponse<AppState>> => {
  try {
    reset()
    const currentState = getState()
    return {
      statusCode: 200,
      data: stupidClone(currentState),
    }
  } catch (e) {
    return {
      statusCode: 500,
      error: e,
    }
  }
}

export const submitRewardBff = async (form: RewardSubmitForm): Promise<BffResponse<AppState>> => {
  try {
    const currentState = getState()
    const { rewardTracking } = currentState
    rewardTracking.walletAddress = form.walletAddress
    rewardTracking.telegramId = form.telegramId
    rewardTracking.twitterAccount = form.twitterAccount
    rewardTracking.formSubmitted = true
    save()
    return {
      statusCode: 200,
      data: stupidClone(currentState),
    }
  } catch (e) {
    return {
      statusCode: 500,
      error: e,
    }
  }
}

export const showCongratulationsBff = async (isShow: boolean): Promise<BffResponse<AppState>> => {
  try {
    const currentState = getState()
    const { rewardTracking } = currentState
    rewardTracking.showCongratulations = isShow
    save()
    return {
      statusCode: 200,
      data: stupidClone(currentState),
    }
  } catch (e) {
    return {
      statusCode: 500,
      error: e,
    }
  }
}
