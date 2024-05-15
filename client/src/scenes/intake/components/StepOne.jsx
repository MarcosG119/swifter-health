import React from 'react'
import Header from 'components/Header'
import { Typography } from '@mui/material'
import AudioRecorder from 'scenes/intake/components/AudioRecorder';

const StepOne = () => {
  return (
    <>
      <Header title="Welcome to the Regional Medical Center Emergency Room" />
      <Typography variant="h4">
        Let's get started by taking in some basic information about the patient. When you're ready, press the record button and please give the following information:
        <ul>
          <li>Full Name</li>
          <li>Age</li>
          <li>Ethnicity</li>
          <li>Height</li>
          <li>Weight</li>
          <li>Gender</li>
          <li>Any symptoms you are feeling</li>
        </ul>
      </Typography>
      <AudioRecorder />
    </>
  )
}

export default StepOne