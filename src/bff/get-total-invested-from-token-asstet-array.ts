import { TokenAmount, TokenAsset } from '../state/types'


import { getUsdtValueFromTokenAssets } from './get-usdt-value-from-token-assets'

export const getUsdValueFormTokenAssetsArray = async (tokenAssets: TokenAsset[][]): Promise<TokenAmount> => {
  return (await Promise.all(tokenAssets.map((tokenAsset: TokenAsset[]) => {
    return getUsdtValueFromTokenAssets(tokenAsset)
  }))).reduce((prev, curr) => prev + curr, 0)

}

