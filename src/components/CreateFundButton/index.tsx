import { Button } from '@mui/material'
import { styled } from '@mui/system'
import React from 'react'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined'

type Props = {
  onClick: () => void
}

const CreateFundBtn = styled(Button)({
  height: 120,
  color: '#ffffff',
  borderColor: '#ffffff',
  borderStyle: 'dashed',
  flexDirection: 'column',
})
export const CreateFundButton = ({ onClick }: Props): JSX.Element => {
  return (
    <CreateFundBtn
      variant="outlined"
      color="primary"
      onClick={onClick}
    >
      Create Fund
      <AddCircleOutlinedIcon fontSize='large' />
    </CreateFundBtn>
  )
}
