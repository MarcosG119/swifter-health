import { Box, useTheme } from '@mui/material'
import Header from 'components/Header';
import React from 'react'
import HorizontalLinearStepper from './HorizontalStepper';

const Intake = () => {
  const theme = useTheme();
  return (<>
      <Box m="1.5rem 2.5rem">
        <Header title="Intake" subtitle="Get new patient information"/>
      </Box>
      <Box
        backgroundColor={theme.palette.background.alt}
        borderRadius="0.55rem"
        p="1rem"
        m="1.5rem 2.5rem"
      >
        <HorizontalLinearStepper />
      </Box>
    </>
  )
}

export default Intake