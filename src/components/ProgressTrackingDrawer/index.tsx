import React, { Fragment, useCallback, useState } from 'react'
import {
  Drawer,
  Fab,
  Box,
  List, ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Checkbox,
  TextField,
  Button,
} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'

import { RootState } from '../../state/store'
import { submitReward } from '../../state/api-actions'
import { submitBasicReward } from '../../state/slices/analytics'

const anchor = 'right'
export const ProgressTrackingDrawer = (): JSX.Element | null => {
  const dispatch = useDispatch()
  //investor
  const userId = useSelector((state: RootState) => state.investor.currentInvestor?.userId)
  const visitExplorePage = useSelector((state: RootState) => state.rewardTracking.progress.visitExplorePage)
  const copyFund = useSelector((state: RootState) => state.rewardTracking.progress.copyFund)
  const visitPortfolio = useSelector((state: RootState) => state.rewardTracking.progress.visitPortfolio)
  //manager
  const placeOrder = useSelector((state: RootState) => state.rewardTracking.progress.placeOrder)
  const visitFundDashboard = useSelector((state: RootState) => state.rewardTracking.progress.visitFundDashboard)
  const createFund = useSelector((state: RootState) => state.rewardTracking.progress.createFund)
  //submit
  const formSubmitted = useSelector((state: RootState) => state.rewardTracking.progress.formSubmitted)

  const showForm = !formSubmitted &&
    (visitExplorePage && copyFund && visitPortfolio) &&
    (placeOrder && visitFundDashboard && createFund)

  const showBigWin = formSubmitted && (visitExplorePage && copyFund && visitPortfolio) &&
    (placeOrder && visitFundDashboard && createFund)

  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ walletAddress: '', telegramId: '', twitterAccount: '' })

  const printUserId = useCallback(() => {
    if (userId) {
      alert(`Your userId is: ${userId}`)
    }
  }, [userId])

  const toggleDrawer =
    (open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return
        }
        setOpen(open)
      }
  const header = () => (
    <>
      <ListItem >
        <ListItemIcon>
          <AccountBoxOutlinedIcon fontSize='large' onClick={() => printUserId()} />
        </ListItemIcon>
        <ListItemText
          primary='Your Progress'
          secondary='Let’s Track your Progress'
          sx={{ color: 'red' }}
          secondaryTypographyProps={{
            color: 'rgba(0, 0, 0, 0.7)'
          }}
          primaryTypographyProps={{
            color: 'rgba(0, 0, 0, 0.6)'
          }}
        />
      </ListItem>
    </>
  )
  const investor = () => (
    <>
      <ListItem >
        <ListItemText primary='Investor'
          primaryTypographyProps={{
            color: 'rgba(0, 0, 0, 0.6)'
          }} />
      </ListItem>
      <ListItem >
        <ListItemIcon>
          <Checkbox disabled={visitExplorePage <= 0} checked={true} color='info' />
        </ListItemIcon>
        <ListItemText primary='Visit an explore page'
          primaryTypographyProps={{
            color: 'rgba(0, 0, 0, 0.6)'
          }}
        />
      </ListItem>
      <ListItem >
        <ListItemIcon>
          <Checkbox disabled={copyFund <= 0} checked={true} color='info' />
        </ListItemIcon>
        <ListItemText primary='Try copy some fund'
          primaryTypographyProps={{
            color: 'rgba(0, 0, 0, 0.6)'
          }} />
      </ListItem>

      <ListItem >
        <ListItemIcon>
          <Checkbox disabled={visitPortfolio <= 0} checked={true} color='info' />
        </ListItemIcon>
        <ListItemText primary='Check your portfolio'
          primaryTypographyProps={{
            color: 'rgba(0, 0, 0, 0.6)'
          }} />
      </ListItem>
    </>
  )
  const manager = () => (
    <>
      <ListItem >
        <ListItemText primary='Manager'
          primaryTypographyProps={{
            color: 'rgba(0, 0, 0, 0.6)'
          }} />
      </ListItem>
      <ListItem >
        <ListItemIcon>
          <Checkbox disabled={createFund <= 0} checked={true} color='info' />
        </ListItemIcon>
        <ListItemText primary={`Create your fund`}
          primaryTypographyProps={{
            color: 'rgba(0, 0, 0, 0.6)'
          }} />
      </ListItem>
      <ListItem >
        <ListItemIcon>
          <Checkbox disabled={placeOrder <= 0} checked={true} color='info' />
        </ListItemIcon>
        <ListItemText primary='Let’s trade'
          primaryTypographyProps={{
            color: 'rgba(0, 0, 0, 0.6)'
          }} />
      </ListItem>

      <ListItem >
        <ListItemIcon>
          <Checkbox disabled={visitFundDashboard <= 0} checked={true} color='info' />
        </ListItemIcon>
        <ListItemText primary='Check your dashboard'
          primaryTypographyProps={{
            color: 'rgba(0, 0, 0, 0.6)'
          }} />
      </ListItem>


    </>
  )
  const bigwin = () => (
    <>
      <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.1)' }} />
      <ListItem >
        <ListItemText primary='Bigwin'
          primaryTypographyProps={{
            color: 'rgba(0, 0, 0, 0.6)'
          }} />
      </ListItem>
      <ListItem >
        <ListItemText secondary='BigExplore more for a bigger reward !!!win'
          secondaryTypographyProps={{
            color: 'rgba(0, 0, 0, 0.6)'
          }} />
      </ListItem>
    </>
  )
  const onSubmit = () => {
    dispatch(submitReward({
      walletAddress: form.walletAddress,
      telegramId: form.telegramId,
      twitterAccount: form.twitterAccount
    }))
    dispatch(submitBasicReward())


  }

  const onFormChanged = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })

  }
  const inputForm = () => (
    <>
      <form onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}>
        <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.1)' }} />
        <ListItem>
          <ListItemText
            primary='Wallet Address (BSC)'
            secondary={
              <TextField
                name='walletAddress'
                required
                fullWidth
                color='secondary'
                variant='filled'
                InputProps={{
                  style: {
                    color: 'black'
                  }
                }}
                style={{
                  color: 'green',
                  backgroundColor: 'rgba(0, 0, 0, 0.06)'
                }}
                onChange={onFormChanged}
              />
            }
            primaryTypographyProps={{
              color: 'rgba(0, 0, 0, 0.6)'
            }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary='Telegram ID'
            secondary={
              <TextField
                name='telegramId'
                fullWidth
                required
                color='secondary'
                variant='filled'
                InputProps={{
                  style: {
                    color: 'black'
                  }
                }}
                style={{
                  color: 'green',
                  backgroundColor: 'rgba(0, 0, 0, 0.06)'
                }}
                onChange={onFormChanged}
              />
            }
            primaryTypographyProps={{
              color: 'rgba(0, 0, 0, 0.6)'
            }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary='Twitter ID'
            secondary={
              <TextField
                name='twitterAccount'
                required
                fullWidth
                color='secondary'
                variant='filled'
                InputProps={{
                  style: {
                    color: 'black'
                  }
                }}
                style={{
                  color: 'green',
                  backgroundColor: 'rgba(0, 0, 0, 0.06)'
                }}
                onChange={onFormChanged}
              />
            }
            primaryTypographyProps={{
              color: 'rgba(0, 0, 0, 0.6)'
            }}

          />
        </ListItem>
        <ListItem>
          <Button type='submit' fullWidth variant='contained' >SUBMIT</Button>
        </ListItem>
      </form>
    </>
  )

  return (
    <div>
      <Fragment key={anchor}>
        <Fab size='large' aria-label='progress'
          onClick={toggleDrawer(true)}

          style={{
            zIndex: 999,
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 20,
            left: 'auto',
            position: 'fixed',
            color: 'white',
            backgroundColor: '#1976D2'

          }}>
          <CheckBoxOutlinedIcon fontSize='large' />
        </Fab>
        <Drawer
          PaperProps={{
            sx: {
              backgroundColor: "white",
              color: "red",
            }
          }}
          anchor={anchor}
          open={open}

          onClose={toggleDrawer(false)}
        >
          <Box >
            <List>
              {header()}
              <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.1)' }} />
              {investor()}
              {manager()}
              {showBigWin && bigwin()}
              {!!showForm && inputForm()}
            </List>
          </Box>
        </Drawer>
      </Fragment>
    </div >
  )
}
