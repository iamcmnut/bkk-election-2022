import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Stack } from '@mui/material'

import { CreateFundHeader } from '../../components/CreateFundHeader'
import { CreateFundButton } from '../../components/CreateFundButton'
import { CreateFundForm, OnContinueParameters } from '../../components/CreateFundForm'
import { CreateFundSummary } from '../../components/CreateFundSummary'
import { createFund } from '../../state/api-actions'

type Prop = {
  onCreate: () => void
}

export const CreateFundContainer = (prop: Prop): JSX.Element => {
  const dispatch = useDispatch()
  const [step, setStep] = useState(0)
  
  const step1BackHandle = useCallback(() => setStep(0), [])
  const step1ContinueHandle = useCallback(({ fundName, perfFee }: OnContinueParameters) => {
    dispatch(createFund({
      profile: { name: fundName, picUri: '' },
      performanceFeePercent: perfFee,
      tags: ['#prototype', '#testfund'],
    }))
    setStep(2)
  }, [])

  return <Stack spacing={2} alignItems='center'>
    <CreateFundHeader step={step} />
    { step === 0 ? (
      <CreateFundButton onClick={() => {setStep(1), prop.onCreate()}} />
    ) : null }
    { step === 1 ? (
      <CreateFundForm
        onBack={step1BackHandle}
        onContinue={step1ContinueHandle}
      />
    ) : null }
    { step === 2 ? (
      <CreateFundSummary />
    ) : null }
  </Stack>
}
