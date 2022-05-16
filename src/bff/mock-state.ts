/* eslint-disable require-jsdoc */
import { sample } from 'lodash'
import { v4 as uuid } from 'uuid'

import { Candidate, Fund, Market } from '../state/types'
import sampleAvatar from '../assets/indiana_jones.png'
import { candidates } from '../state/slices/funds'

import { MockState } from './types'
import { generateRandomAddr } from './generate-random-addr'
import { generateFollowers } from './generate-followers'
import { randomFloor2digits } from './random-floor-2-digits'
import { FUND_NAME, TOKEN } from './constants'
import { marketCalculator } from './market-calculator'

let currentState: MockState | undefined = undefined
const mockStateKey = 'camp-mock-state'
const mockWalletAddress = '0x0000000000000000000000000000000000000000'

export const getState = (): MockState => {
  if (!currentState) {
    throw new Error('state was not loaded')
  }
  return currentState
}

const init = (userId: string|undefined = undefined): MockState => {
  return {
    userInvestor: {
      userId: userId ?? uuid(),
      walletAddress: mockWalletAddress,
      orders: [],
      assets: {
        tokens: [{ symbol: 'USDT', amount: 1 }],
        ownFunds: [],
        copyingFunds: [],
      },
      profile: {
        name: 'Camp Demo',
        picUri: 'https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/DW5IM2H7M5H57DIXFP7ZBI4JAM.jpg',
      },
    },
    funds: generateCandidates(candidates),//generateFunds(3),
    rewardTracking: {
      copyFund: 0,
      createFund: 0,
      formSubmitted: false,
      placeOrder: 0,
      showCongratulations: false,
      telegramId: '',
      twitterAccount: '',
      visitExplorePage: 0,
      visitFundDashboard: 0,
      visitPortfolio: 0,
      walletAddress: '',
    }
  }
}

const generateFunds = (amount: number): Fund[] => {
  return new Array(amount).fill(0).map((_, i) => generateFund(i))
}

const generateCandidates = (candidates: Candidate[]): Fund[] => {
  return new Array(candidates.length).fill(0).map((f, i) => generateCandidate(candidates[i]))
}

const generateCandidate = (candidate: Candidate): Fund => {
  console.log(`Generate fund no: ${candidate.number}`)
  return {
    fundAddress: generateRandomAddr(),
    performanceFeePercent: randomFloor2digits(20) + 1,
    campScore: {
      return: randomFloor2digits(10000),
      risk: 0,
      riskAdjustedReturn: 0,
      consistency: candidate.number,
    },
    followers: generateFollowers(100),
    orders: [],
    assets: {
      tokens: [{ symbol: 'USDT', amount: 1e6 }], // TODO: random USDT size later
    },
    invested: 1e6,
    tags: ['#TOP10'], // TODO: random tags later
    profile: {
      name: candidate.name, // TODO: random name
      picUri: candidate.image,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

const generateFund = (no: number): Fund => {
  console.log(`Generate fund no: ${no}`)
  return {
    fundAddress: generateRandomAddr(),
    performanceFeePercent: randomFloor2digits(20) + 1,
    campScore: {
      return: randomFloor2digits(25),
      risk: randomFloor2digits(25),
      riskAdjustedReturn: randomFloor2digits(30),
      consistency: randomFloor2digits(20),
    },
    followers: generateFollowers(100),
    orders: [],
    assets: {
      tokens: [{ symbol: 'USDT', amount: 1e6 }], // TODO: random USDT size later
    },
    invested: 1e6,
    tags: ['#BNB', '#DEX', '#FASTEARN'], // TODO: random tags later
    profile: {
      name: sample<string>(FUND_NAME) ?? '', // TODO: random name
      picUri: sampleAvatar as string,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}



export const generateMarkets = async (): Promise<Market[]> => {
  console.log('Load market')
  return await Promise.all([
    TOKEN.BNB.symbol,
    TOKEN.BTCB.symbol,
    TOKEN.ETH.symbol,
    TOKEN.DOT.symbol,
    TOKEN.ADA.symbol,
  ].map(async (symbol) => {
    return {
      fromTokenSymbol: symbol,
      toTokenSymbol: TOKEN.USDT.symbol,
      name: `${symbol}/${TOKEN.USDT.symbol}`,
      price: (await marketCalculator({
        fromToken: symbol,
        toToken: TOKEN.USDT.symbol,
        fromTokenAmount: 1,
      })).toTokenAmount,
      type: 'spot',
    }
  }))

}

const load = (): void => {
  if (window.localStorage) {
    const savedItem = window.localStorage.getItem(mockStateKey)
    if (savedItem) {
      console.log('state loaded.')
      currentState = JSON.parse(savedItem) as MockState
      return
    }
  }

  currentState = init()
  console.log('state init.')
}

export const reset = (): void => {
  currentState = currentState ? init(currentState.userInvestor.userId) : init()
  save()
}

export const save = (): void => {
  if (window.localStorage) {
    window.localStorage.setItem(mockStateKey, JSON.stringify(currentState))
  }
}

load()
