import React, { useEffect, useState } from 'react'
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Typography,
  Tooltip,
  Box,
  Button,
} from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import { styled } from '@mui/material/styles'
import NumberFormat from 'react-number-format'
import { format } from 'date-fns'

import { Order } from '../../state/types'
import { marketCalculator } from '../../bff'

export type History = {
  date: Date
  market: string
  openPosition: number
  unit: number
  value: number
}
export type Props = {
  data?: Order[]
  onClose: (order: Order) => void
  onClickMarket: (name: string) => void
}

const dateTimePattern = 'dd/MM/yyyy hh:mm:ss'

const BodyCell = styled(TableCell)`
  border-bottom: none;
`

export const TradeHistory = ({ data, onClose, onClickMarket }: Props): JSX.Element => {


  const closePositionIds = data?.filter((o) => o.closePositionOrderId !== '')?.map((o) => o.closePositionOrderId)

  const openPositions = data?.filter((o) => o.closePositionOrderId === '' && o.status === 'filled')

  const orders = openPositions?.filter((o) => !closePositionIds?.includes(o.id))

  return <TableContainer component={Paper} sx={{
    backgroundColor: '#131722',
    borderRadius: 0,
    height: 400,
    border: '2px solid #2A2E39',
  }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell colSpan={6} >
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
              <Typography variant="h6">Open Trade </Typography>
              <Tooltip
                title="This is tooltip with example description"
                placement="top" >
                <InfoIcon fontSize="small" sx={{ color: 'text.secondary', ml: 1 }} /></Tooltip>
            </Box>

          </TableCell>
        </TableRow>
      </TableHead>
      <TableHead>
        <TableRow>
          <TableCell> <Typography color='GrayText'>Date</Typography></TableCell>
          <TableCell> <Typography color='GrayText'>Market</Typography></TableCell>
          <TableCell align="right"> <Typography color='GrayText' >Entry Price</Typography></TableCell>
          <TableCell align="right"> <Typography color='GrayText'>Unit</Typography></TableCell>
          <TableCell align="right"> <Typography color='GrayText'>Value</Typography></TableCell>
          <TableCell align="center"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody >
        {orders &&
          orders.map((item, index) =>
            <ListItem key={`history_${index}`} data={item} onClose={onClose} onClickMarket={onClickMarket} />
          )
        }
      </TableBody>
    </Table>
  </TableContainer>
}

type ListItemProps = {
  data: Order
  onClose: (order: Order) => void
  onClickMarket: (name: string) => void
}
const ListItem = ({ data, onClose, onClickMarket }: ListItemProps): JSX.Element => {
  const { createdAt, marketName, fromTokenAmount, toTokenAmount, toToken, fromToken } = data
  const price = toTokenAmount ? fromTokenAmount / toTokenAmount : 0


  const [value, setValue] = useState(0)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    marketCalculator({ fromToken: toToken, toToken: fromToken, fromTokenAmount: toTokenAmount || 0 })
      .then(value => {
        console.log(value)
        setValue(value.toTokenAmount)
      })
  }, [])

  return < TableRow
  >
    {/* date */}
    < BodyCell > <Typography>{format(new Date(createdAt), dateTimePattern)}</Typography></BodyCell >
    {/* market */}
    < BodyCell >
      <Button variant='text' onClick={() => onClickMarket(marketName)}>
        <Typography>{marketName}</Typography>
      </Button>

    </BodyCell >
    {/* entry price / avarage price */}
    < BodyCell align="right" > <Typography>
      {price}
    </Typography></BodyCell >
    {/* unit */}
    < BodyCell align="right" > <Typography>
      {toTokenAmount}
    </Typography></BodyCell >
    {/* value */}
    < BodyCell align="right" > <Typography>
      {value}
        </Typography>
    </BodyCell >
    {/* action */}
    < BodyCell >
      <Button variant='contained' onClick={() => onClose(data)}>
        <Typography>CLOSE</Typography>
      </Button>
    </BodyCell >
  </TableRow >

}