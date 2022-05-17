import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { ExploreContainer } from '../../containers/ExploreContainer'
import { InvestExitModalContainer } from '../../containers/InvestExitModalContainer'
import { PrototypeWarningModalContainer } from '../../containers/PrototypeWarningModalContainer'
import { Fund } from '../../state/types'
import { loadExplorePage } from '../../state/api-actions'
import { checkWalletIsConnected, connectWalletHandler } from '../../services/web3'


export const Explore = (): JSX.Element => {
  const dispatch = useDispatch()
  const [selectedFund, setSelectedFund] = useState<Fund | null>(null)
  const [investOrExit, setInvestOrExit] = useState<'invest' | 'exit'>('invest')
  const onClickInvest = useCallback((f: Fund|null) => {
    setInvestOrExit('invest')
    setSelectedFund(f)
  }, [])

  const onClickExit = useCallback((f: Fund|null) => {
    setInvestOrExit('exit')
    setSelectedFund(f)
  }, [])

  const onInvestExitClose = useCallback(() => {
    setSelectedFund(null)
  }, [])

  // example-send-basic-reward
  // const onSendSend = useCallback(() => {
  //   dispatch(submitBasicReward({
  //     walletAddress: 'walletAddress',
  //     twitterId: 'twitterId',
  //     telegramId: 'telegramId',
  //   }))
  // }, [])
  // <Button onClick={() => onSendSend()}>Send send send</Button>


  useEffect(() => {
    dispatch(loadExplorePage())
    checkWalletIsConnected()
  }, [])

  return <div className='container'>
    <button onClick={connectWalletHandler}>Connect</button>
    <ExploreContainer onClickInvest={onClickInvest} onClickExit={onClickExit} />
    <InvestExitModalContainer
      onClose={onInvestExitClose}
      fund={selectedFund}
      mode={investOrExit}
      onClickInvest={onClickInvest}
      onClickExit={onClickExit} />
    <PrototypeWarningModalContainer/>
  </div>
}
