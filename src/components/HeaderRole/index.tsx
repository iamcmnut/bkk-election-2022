import React from 'react'
import {
  Typography, Box, Switch, Link
} from '@mui/material'

import { Role } from '../../state/types'

export type Props = {
  role: Role
  onChanged: (newRole: Role) => void
}

export const HeaderRole = ({ role, onChanged }: Props): JSX.Element => {
  return (
    <Box
      borderRadius={2}
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      justifyItems='center'
      style={{
        width: '100%',
      }}
    >
      <Link
        underline='none'
        onClick={() => onChanged('investor')}
      >
        <Typography variant='subtitle1'
          color={role === 'investor' ? 'primary' : 'white'}
        >
          Investor
        </Typography>
      </Link>
      <Switch
        checked={role === 'manager'}
        onChange={() => onChanged(role === 'manager' ? 'investor' : 'manager')}
        color="primary"
      />
      <Link
        underline='none'
        onClick={() => onChanged('manager')}
      >
        <Typography variant='subtitle1'
          color={role === 'manager' ? 'primary' : 'white'}
        >
          Manager
        </Typography>
      </Link>
    </Box>
  )
}

