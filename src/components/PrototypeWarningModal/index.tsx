import React, { useState } from 'react'
import { Modal, Box, Typography, Button } from '@mui/material'

import logo from '../../assets/camp_demo_logo.png'

export const PrototypeWarningModal = (): JSX.Element => {
  const [consent, setCosent] = useState<false | true>(false)

  return (
    <Modal
      open={!consent}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '36rem',
        boxShadow: 24,
        backgroundColor: '#0B2C4D',
        p: 4,
        borderRadius: '10px',
        textAlign: 'center',
      }}>
        <img src={logo as string} width='143px'/>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      This is a CAMP application prototype. It only displays the design features of our application.
      The purpose of this prototype is to give our early adopters to test and experience
      how user-friendly our app will become.
      You can also provide feedback to assist us in improving our product. Thank you:)
        </Typography>
        <Button
          variant="contained"
          sx={{ margin: '2rem', textTransform: 'capitalize' }}
          onClick= {()=> {
            setCosent(!consent)
          }}>
          <Typography>I love the prototype</Typography>
        </Button>
      </Box>
    </Modal>
  )
}
