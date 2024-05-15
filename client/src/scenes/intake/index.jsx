import { Box, useTheme } from '@mui/material'
import Header from 'components/Header';
import React, { useState, createContext } from 'react';
import HorizontalLinearStepper from './components/HorizontalStepper';

export const Context = createContext();

const Intake = () => {
  const theme = useTheme();
  const [patientObj, setPatientObj] = useState({});

  return (<Context.Provider value={[patientObj, setPatientObj]}>
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
    </Context.Provider>
  )
}

export default Intake