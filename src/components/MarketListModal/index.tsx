import React, { useState, useEffect } from 'react'
import {
  Avatar,
  List,
  ListItemText,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  Typography,
  Input,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material'
import NumberFormat from 'react-number-format'
import SearchIcon from '@mui/icons-material/Search'


export type Market = {
  ticker: string;
  name: string;
  price?: number;
  img?: string;
}

export type Props = {
  open: boolean;
  onClose: () => void;
  markets: Market[];
  onSelectMarket: (market: Market) => void
}

export const MarketListModal = ({ open, onClose, markets = [], onSelectMarket }: Props): JSX.Element => {

  const [filteredList, setFilteredList] = useState(markets)

  const onSearch = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value

    if (value === '') {
      setFilteredList(markets)
      return
    }

    setFilteredList(markets.filter((token) => token.ticker.toLowerCase().includes(value.toLowerCase())))
  }
  useEffect(() => {
    setFilteredList(markets)
  }, [markets])

  return (
    <Dialog
      maxWidth='xs'
      open={open}
      onClose={onClose}
      scroll='paper'
      PaperProps={{
        style: {
          borderRadius: '10px',
          minHeight: '500px',
          maxHeight: '600px',
        }
      }}
      BackdropProps={{ style: { backgroundColor: 'rgba(244, 238, 255, 0.6)' } }}
    >
      <DialogTitle style={{
        backgroundColor: '#1F222C',

      }}>
        <Typography variant='h6' >
          Select Token
        </Typography>
        <Input
          placeholder='Search token name or paste address'
          fullWidth
          size='medium'
          onChange={onSearch}
          sx={{
            borderRadius: '3px',
            backgroundColor: '#49546C',
            marginTop: '10px',
            border: 'none',
            height: '64px',
            p: 1,
          }}
          startAdornment={<InputAdornment position="start">
            <SearchIcon style={{ color: 'white' }} />

          </InputAdornment>}
        />
      </DialogTitle>
      <DialogContent

        style={{
          height: '100vh',
          backgroundColor: '#49546C',
          padding: 0,
          borderWidth: 0,
        }}
      >
        < DialogContentText>
          <List sx={{
            minWidth: '360px',
            maxWidth: '420px',
          }}>
            {filteredList && filteredList.map((token, index) =>
              <ListItem
                key={`token_${index}`}
                disableGutters
                button
                secondaryAction={
                  < Typography sx={{ pr: 2 }}>
                    {token.price}
                  </Typography>
                }
              >
                <ListItemButton
                  onClick={() => onSelectMarket(token)}
                >
                  <ListItemAvatar>
                    <Avatar style={{ height: '45px', width: '45px', }}
                      src={token.img}
                    >
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={token.ticker} secondary={token.name} />
                </ListItemButton>
              </ListItem>,
            )}
          </List>
        </DialogContentText>
      </DialogContent >
      <DialogActions>
      </DialogActions>
    </Dialog >
  )
}

