import React from 'react'

const wardenUrl = 'https://sentry-ward.wardenswap.finance/#/white-label-swap'
const fromToken = '0x55d398326f99059ff775485246999027b3197955'
const toToken = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'

export const SwapContainer = () => <iframe
  src={`${wardenUrl}?hideLayout&t=1&network=bsc&from=${fromToken}&to=${toToken}`}
  frameBorder="0"
  width="480px"
  height="640px"
  style={{ background: 'red', borderRadius: '10px', marginTop: '45px' }}
/>
