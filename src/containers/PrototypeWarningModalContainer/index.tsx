import React from 'react'

import { PrototypeWarningModal } from '../../components/PrototypeWarningModal'

export function PrototypeWarningModalContainer(): JSX.Element | null {
  const hasData = localStorage.getItem('camp-mock-state') != null
  if (hasData) return null
  return <PrototypeWarningModal />
}
