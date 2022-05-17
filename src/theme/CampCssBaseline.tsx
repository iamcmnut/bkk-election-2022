import * as React from 'react'
import GlobalStyles from '@mui/material/GlobalStyles'

import CampBackgroundImage from '../assets/bg-camp-main.png'

export const CampCssBaseline = (): JSX.Element => {
  return (
    <React.Fragment>
      <GlobalStyles styles={{
        '*::-webkit-scrollbar': {
          width: '0.4em'
        },
        '*::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
         // backgroundColor: '#01203D',
          borderRadius: '15px',
        },
        body: {
        //  backgroundImage: `url(${CampBackgroundImage as string})`,
          //backgroundRepeat: 'no-repeat',
          //backgroundSize: 'cover',
          //color: 'white',
          fontFamily: '\'Lexend Deca\', sans-serif',
          margin: 0,
          fontWeight: 400,
        }
      }} />
    </React.Fragment>
  )
}
