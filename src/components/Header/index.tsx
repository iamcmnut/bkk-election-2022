import React from 'react'
import { Box, Button, Link, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import logo from '../../assets/bkk_election_logo.png'
import { Role } from '../../state/types'
import { HeaderCoinBalance } from '../HeaderCoinBalance/index'
import './index.css'
import { HeaderRole } from '../HeaderRole'

const Wrapper = styled(Box)`
  height:80px;
  alignItems:'center';
  padding-left:50px;
  padding-right:50px;
  backdrop-filter: blur(4px)
`

export type Props = {
  currPath: 'explore' | 'swap' | 'port' | 'trade' | 'fund-dashboard'
  role: Role
  balance: number | undefined
  canTrade: boolean
  onRoleChange: (newRole: Role) => void
  onResetState: () => void
}

export const Header = ({ role, onRoleChange, currPath, balance, canTrade, onResetState }: Props):
  JSX.Element => {

  return <Wrapper
    alignItems='center'
    display='flex'
    flexDirection='row'
    justifyContent='space-between'
    style={{ backgroundColor: currPath == 'trade' ? '#131722' : '#082746' }}
  >
    <Box flexDirection='row' display='flex' alignItems='center'>
      <img src={logo as string} height={34} />
      <Box width={40} />
      {
        role === 'investor' ?
          <Box flexDirection='row' display='flex' alignItems='center'>
            <Link href="/explore" className={currPath === 'explore' ? 'link active' : 'link'}>
              <Typography variant="h6">โหวต</Typography>
            </Link>
            <Box width={20} />
            <Link pr={2} href="/swap" className={currPath === 'swap' ? 'link active' : 'link'}>
              <Typography variant="h6">ผลโหวต</Typography>
            </Link>
            <Box width={20} />
            {/* <Link pr={2} href="/port" className={currPath === 'port' ? 'link active' : 'link'}>
              <Typography variant="h6">PORTFOLIO</Typography>
            </Link> */}
          </Box> :
          <Box flexDirection='row' display='flex' alignItems='center'>
            <Link href="/fund-dashboard" className={currPath === 'fund-dashboard' ? 'link active' : 'link'}>
              <Typography variant="h6">DASHBOARD</Typography>
            </Link>
            <Box width={20} />
            {canTrade && <Link href="/trade" className={currPath === 'trade' ? 'link active' : 'link'}>
              <Typography variant="h6">TRADE</Typography>
            </Link>}
          </Box>
      }
    </Box>
    <Box flexDirection='row' display='flex' alignItems='center'>
      {/* <Box width={200}> <HeaderCoinBalance amount={balance} /></Box> */}
      {/* <Box width={200} pl={2}>  <HeaderRole role={role} onChanged={onRoleChange} /></Box> */}
      <Box pl={2}><Button variant="contained" onClick={() => onResetState()}>DONATE</Button></Box>
    </Box>
  </Wrapper >

}

