import React from 'react'
import { useState ,useEffect } from 'react'
import { styled } from '@mui/system'
import FavoriteIcon from '@mui/icons-material/Favorite'
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Divider,
  Avatar,
  Box,
  CardHeader,
  IconButton,
  CardMedia,
  Skeleton,
} from '@mui/material'


import { Fund } from '../../state/types'
import { getCandidate } from '../../services/web3'




export type Props = {
  fund: Fund,
  onClickInvest: (f: Fund) => void
  onClickExit: (f: Fund) => void
}

export const CandidateCard = ({ fund, onClickInvest, onClickExit }: Props): JSX.Element => {
  const [loading,setLoading] = useState(true)
  const [isFavorite, setFavorite] = useState(false)
 


  useEffect(() => {
    void loadCandidate()
  }, [])

  const loadCandidate = async ()=>{
    
   const  result = await getCandidate(1)
   setLoading(false)
  
  }

  function toggleFavorite(isFavorite: boolean) {
    const toggleValue = !isFavorite
    setFavorite(toggleValue)
  }

  const FundCard = styled('div', {
    shouldForwardProp: (prop) => prop !== "favorite",
  })<{ favorite?: boolean; }>(({ favorite }) => (
    {
      position: 'relative',
      color: '#434343',
      boxSizing: 'initial',
      margin: '20px',
      background: '#01203D',
      boxShadow: '1px 1px 10px rgba(113, 99, 203, 0.5)',
      borderRadius: 10,

      '&::before': {
        position: 'absolute',
        top: '-0.5rem',
        left: '6.0rem',
        content: '\'\'',
        background: '#421C0D',
        height: '14px',
        width: '13px',
        transform: 'rotate(45deg)'
      },
      '&::after': {
        position: 'absolute',
        content: '\'\'',
        top: '-11px',
        left: '1.5rem',
        padding: '0.5rem',
        width: '4rem',
        background: '#B1740F',
        color: 'white',
        textAlign: 'center',
        fontFamily: '\'Roboto\', sans-serif',
        boxShadow: '4px 4px 15px rgba(26, 35, 126, 0.2)',
        height: '40px',
        fontSize: '10px'
      },
      '&::hover': {
        background: '#082746',
        boxShadow: '1.02px 1.02px 10.2px 3px rgba(240, 118, 69, 0.7)',
        borderRadius: '10.2px'
      },
      '& .camp-score': {
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontSize: '30px',
        fontWeight: 'bold',
        lineHeight: '40px',
      },
      '& .camp-score-label': {
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontSize: '10px',
        top: '-5px',
        position: 'relative'
      },
      '& Card': {
        width: 345
      },

      '& .wrap-camp-score': {
        position: 'absolute',
        zIndex: 1,
        left: '1.5rem',
        top: '-0.7rem',
        width: '5rem',
        textAlign: 'center'
      },

      '& .wrap-favorite': {
        position: 'relative',
        background: '#C4C4C4',
        height: '142px'
      },

      '& .wrap-cover': {
        position: 'absolute',
        // // background: '#C4C4C4',
        // height: '142px',

        top: '0rem',
        left: '0rem',
        right: '0rem',
        bottom: '0rem',
        width: '5rem',

      },
      '& .cover': {
        position: 'absolute',
        top: '0rem',
        left: '0rem',
        right: '0rem',
        bottom: '0rem',
        background: '#C4C4C4',
        // height: '500px',
        width: '15rem',


      },

      '& .favorite-color': {
        backgroundColor: '#ffffff', color: favorite ? '#ff0000' : '#C4C4C4'
      },

      '& .fund-avatar': {
        position: 'absolute', top: '132px', left: '28px'
      },

      '& .fund-content': {
        marginTop: '40px'
      },

      '& .fund-content-row': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
      },

      '& .wrap-action': {
        justifyContent: 'space-between',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingBottom: '20px'
      }

    })
  )

  return (
    <FundCard favorite={isFavorite}>
      <Card raised >
        <Box component="span" className='wrap-camp-score'>
          <Typography variant="body1" className="camp-score">
            {((fund.campScore.consistency))}
          </Typography>
          <Typography variant="body1" className="camp-score-label">
            หมายเลข
          </Typography>
        </Box>
        {/* <CardHeader className='wrap-favorite'
          action={
            <IconButton aria-label="add to favorites" component="span" className="favorite-color"
              onClick={() => {
                toggleFavorite(isFavorite)
              }}
            >
              <FavoriteIcon />
            </IconButton>
          }
        // title={<Box className='wrap-cover'  >
        //   <img src={whaleHunter as string} className='cover' />
        // </Box>}
        >

        </CardHeader> */}
        <CardMedia
          component="img"
          height="400"
          image={fund.profile.picUri}
          alt="green iguana"
        >
        </CardMedia>
        {/* <Avatar alt="Remy Sharp" src={fund.profile.picUri} className="fund-avatar" /> */}
        <CardContent className="fund-content" >
          <Box className='fund-content-row'>
            <Box>
              <Typography noWrap variant="h6" color="text">
                {fund.profile.name}
              </Typography>
              <Typography noWrap variant="subtitle2" color="primary">
                {fund.tags}
              </Typography>
            </Box>
          </Box>
          <Divider />

          {/* <Box className='fund-content-row'>
          {loading?<Skeleton animation="wave" width='50%' height={40} />: 
          <Typography noWrap variant="h6" color="text">
            {score} คะแนน
            </Typography> }
          </Box> */}
        </CardContent>
        <CardActions className='wrap-action' >
       
            <Typography>{fund.campScore.return} คะแนน</Typography>
         
        </CardActions>
      </Card>
    </FundCard>)
}
