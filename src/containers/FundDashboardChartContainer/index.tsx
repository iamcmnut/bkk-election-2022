import React, { useEffect, useState } from 'react'

import { DataPoint, FundDashboardChart } from '../../components/FundDashboardChart'

import { day30data, day7data, day90data, hour24data } from './fake-data'

export const FundDashboardChartContainer = (): JSX.Element => {
  const [data, setData] = useState<DataPoint[]>([])
  const [timeframe, setTimeframe] = useState<string>('24h')

  useEffect(() => {
    switch(timeframe) {
      case '24h': {
        setData(hour24data)
      } break
      case '7d': {
        setData(day7data)
      } break
      case '30d': {
        setData(day30data)
      } break
      case '90d': {
        setData(day90data)
      } break
    }
  }, [timeframe])

  return <FundDashboardChart data={data} setTimeframe={setTimeframe} />
}
