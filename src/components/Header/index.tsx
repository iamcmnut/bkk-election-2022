import React from 'react'
import { Box, Button, Link, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Modal from '@mui/material/Modal'

import logo from '../../assets/bkk_election_logo.png'
import { Role } from '../../state/types'
import { HeaderCoinBalance } from '../HeaderCoinBalance/index'
import './index.css'
import { HeaderRole } from '../HeaderRole'

const Wrapper = styled(Box)`
  height:80px;
  alignItems:'center';
  padding-left:10px;
  padding-right:10px;
  backdrop-filter: blur(4px)
`
export type Props = {
  currPath: 'candidate' | 'result'
  role: Role
  balance: number | undefined
  canTrade: boolean
  onRoleChange: (newRole: Role) => void
  onResetState: () => void
}
export const Header = ({ role, onRoleChange, currPath, balance, canTrade, onResetState }: Props):
  JSX.Element => {

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {
    setOpen(true)
    onResetState()
  }
  const handleClose = () => setOpen(false)

  return <Wrapper
    alignItems='center'
    display='flex'
    flexDirection='row'
    justifyContent='space-between'
    style={{ backgroundColor: '#082746', fontFamily: 'Kanit' }}
  >
    <Box flexDirection='row' display='flex' alignItems='center'>
      <img src={logo as string} height={34} />
      <Box width={30} />
      <Box flexDirection='row' display='flex' alignItems='center'>
            <Link href="/candidate" className={currPath === 'candidate' ? 'link active' : 'link'}>
              <Typography variant="h6" style={{ fontFamily: 'Kanit', fontSize: '1rem' }}>ผู้สมัคร</Typography>
            </Link>
            <Box width={20} />
          <Link href="/result" className={currPath === 'result' ? 'link active' : 'link'}>
              <Typography variant="h6" style={{ fontFamily: 'Kanit', fontSize: '1rem' }}>ผลโหวต</Typography>
            </Link>
          </Box>
    </Box>
    <Box flexDirection='row' display='flex' alignItems='center'>
      {/* <Box width={430}> <HeaderCoinBalance amount={balance} /></Box> */}
      {/* <Box width={200} pl={2}>  <HeaderRole role={role} onChanged={onRoleChange} /></Box> */}
      <Box pl={2}><Button variant="contained" onClick={handleOpen}>Donate</Button></Box>
    </Box>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            สนับสนุนโครงการ  🙏
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ fontSize: '0.9rem' }}>
            0x691A9d8d0f0Fe1101bD8150f9511fE45504433fC
          </Typography>
        </Box>
      </Modal>
  </Wrapper >

}

