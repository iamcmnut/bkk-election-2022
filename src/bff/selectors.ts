import { CopyingFund, Fund, Investor, TokenAsset } from '../state/types'

export const selectOwnFund = (investor: Investor | null, funds: Fund[]): Fund | undefined => {
  if (!investor) return
  return funds.find(f => f.fundAddress === investor.assets.ownFunds?.[0])
}

export const selectCopyingFundTokens = (
  copyingFund: CopyingFund | undefined
): TokenAsset[] | undefined => {
  return copyingFund?.assets?.tokens
}

export const selectCopyingFund = (investor: Investor | null): CopyingFund | undefined => {
  if (!investor) return
  return investor.assets.copyingFunds?.[0]
}

export const selectUsdtBalance = (tokens: TokenAsset[]): number =>
  tokens
    .filter((a) => a.symbol === 'USDT')
    .reduce((acc, t) => acc + t.amount, 0)

export const selectTokensFromOwnFund = (ownFund: Fund | undefined): TokenAsset[] | undefined => ownFund?.assets?.tokens

export const selectFollowersFromOwnFund = (ownFund: Fund | undefined): string[] | undefined => ownFund?.followers

export const selectInvestedFromOwnFund = (
  ownFund: Fund | undefined
): number => ownFund?.invested ?? 0

export const selectInvestedFromCopyingFund = (
  copyingFund: CopyingFund | undefined
): number => copyingFund?.invested ?? 0

export const selectCashBalanceFromOwnFund = (ownFund: Fund | undefined): number => ownFund ?
  selectUsdtBalance(ownFund.assets.tokens)
    : 0
