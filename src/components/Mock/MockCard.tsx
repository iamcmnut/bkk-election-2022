import React from 'react'
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@mui/material'
import { red } from '@mui/material/colors'

import { Fund } from '../../state/types'

type MockCardInput = {
  fund: Fund,
  onClickInvest: (f: Fund) => void
  onClickExit: (f: Fund) => void
}
export const MockCard = ({ fund, onClickInvest, onClickExit }: MockCardInput) => {
  return <Card sx={{ minWidth: 275, margin: 2 }}>
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          M
        </Avatar>
      }
      title={fund.profile.name}
      subheader={fund.createdAt}
    />
    <CardMedia
      component="img"
      height="50"
      image={fund.profile.picUri}
      alt={fund.profile.name}
    />
    <CardContent>
      <Typography sx={{ fontSize: 14 }}>
        {fund.profile.name}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" onClick={() => onClickInvest(fund)}>Invest</Button>
      <Button size="small" onClick={() => onClickExit(fund)}>Exit</Button>
    </CardActions>
  </Card>
}
