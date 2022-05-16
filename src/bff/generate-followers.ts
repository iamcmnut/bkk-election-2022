import { Investor } from '../state/types'

import { generateRandomAddr } from './generate-random-addr'

export const generateFollowers = (max: number): Investor['walletAddress'][] => {
  const amount = Math.ceil(Math.random() * max)
  return new Array(amount).fill(0).map(() => generateRandomAddr())
}
