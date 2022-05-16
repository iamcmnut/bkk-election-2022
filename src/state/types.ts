export type Uri = string
export type HashTag = string // e.g. "#eth", "#bigPL"
export type ISOString = string // e.g. "2021-11-25T21:44:48.772Z"
export type Role = 'manager' | 'investor'
export type TokenDecimalAmount = number // 2.5 * (10 ** 18) = 2.5 USDT
export type TokenAmount = number // 2.5 USDT

export type CopyingFund = {
  fundAddress: Fund['fundAddress']
  assets: { tokens: TokenAsset[] }
  orders: CopiedOrder[]
  invested: number
}

export type Investor = {
  userId: string
  walletAddress: string
  orders: Order[]
  assets: {
    tokens: TokenAsset[]
    ownFunds: Fund['fundAddress'][]
    copyingFunds: Array<CopyingFund>
  }
  profile?: {
    name: string
    picUri?: Uri
  }
  createdAt?: ISOString
  updatedAt?: ISOString
}

export type Fund = {
  fundAddress: string
  performanceFeePercent: number // 1 - 50
  campScore: CampScore
  invested: number
  followers: Investor['walletAddress'][]
  orders: Order[]
  assets: {
    tokens: TokenAsset[]
  }
  tags: HashTag[]
  profile: {
    name: string
    picUri: Uri
  }
  createdAt: ISOString
  updatedAt: ISOString
}

export type CampScore = {
  return: number // max 25 pts.
  risk: number // max 25 pts.
  riskAdjustedReturn: number // max 30 pts.
  consistency: number // max 20 pts.
}

export type Order<
  TFrom extends Token['symbol'] = Token['symbol'],
  TTo extends Token['symbol'] = Token['symbol']
  > = {
    id: string
    type: 'limit' | 'market'
    marketName: Market<Token['symbol'], Token['symbol']>['name']
    side: 'buy' | 'sell'
    fromToken: TFrom
    fromTokenAmount: TokenAmount
    status: 'new' | 'open' | 'filled' | 'cancelled'
    createdAt: ISOString
    updatedAt: ISOString
    toToken: TTo
    toTokenAmount?: TokenAmount
    closePositionOrderId?: Order['id']
  }

export type CopiedOrder = Order & {
  copiedFromFundAddress: Fund['fundAddress']
  copiedFormOrderId: Order['id']
}

export type Market<
  TFrom extends Token['symbol'] = Token['symbol'],
  TTo extends Token['symbol'] = Token['symbol']
  > = {
    fromTokenSymbol: TFrom
    toTokenSymbol: TTo
    name: `${TFrom}/${TTo}` // e.g. "BNB/USDT"
    price: TokenAmount
    type: 'spot' | 'future'
    vol24h?: number
    totalLiquidity?: number
    totalSupply?: number
    availSupply?: number
    updatedAt?: ISOString
  }

export type Token = {
  symbol: 'USDT' | 'BNB' | 'ETH' | 'DOT' | 'ADA' | 'BTCB'
  name: string
  decimals: number
  address: string
  logoURI: Uri
}
export type TokenAsset<TSymbol extends Token['symbol'] = Token['symbol']> = {
  symbol: TSymbol
  amount: TokenAmount
}

export type NotificationMsg = {
  id: string
  text: string
  level: 'error' | 'warning' | 'info' | 'success'
  wasShown: boolean
}

export type RewardProgress = {
  visitExplorePage: number
  copyFund: number
  visitPortfolio: number
  createFund: number
  placeOrder: number
  visitFundDashboard: number
  walletAddress: string
  telegramId: string
  twitterAccount: string
  formSubmitted: boolean
  showCongratulations: boolean
}

export type RewardSubmitForm = {
  walletAddress: string
  telegramId: string
  twitterAccount: string
}

export type Candidate = {
  name: string
  number: number
  votes: number
  enable: boolean
  image: string
  thumbnail: string
}
