import { Card, Grid } from '@mui/material'
import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'

export const Candidate = (): JSX.Element => {
  const dispatch = useDispatch()


  return <div className='container'>
    <Grid container>
      <Card></Card>

    </Grid>
  </div>
}
