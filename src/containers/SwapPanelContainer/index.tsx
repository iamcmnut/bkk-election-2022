import React from 'react'

const wardenUrl = 'https://sentry-ward.wardenswap.finance/#/white-label-swap'
const fromToken = '0x55d398326f99059ff775485246999027b3197955'
const toToken = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'

export const SwapPanelContainer = (): JSX.Element => <iframe
  src={`${wardenUrl}?hideLayout&t=1&network=bsc&from=${fromToken}&to=${toToken}`}
  frameBorder="0"
  width="100%"
  height="640px"
  style={{
    borderRadius: '10px',
    marginTop: '45px'
  }}
/>
