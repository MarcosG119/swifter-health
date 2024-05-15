import React from 'react';
import { FormControl, Stack, TextField, Typography } from '@mui/material';
import AudioRecorder from 'components/AudioRecorder';

const StepTwo = () => {
  return (
    
    <Stack spacing={2}>
      <Typography variant="h4">Confirm your information below. If you wish to speak again, use the record button below.</Typography>
      <FormControl>
        <Stack spacing={2}>
        <TextField id="name" label="Name" variant="outlined" defaultValue={"Marcos"} required/>
        <TextField id="age" label="Age" variant="outlined" defaultValue={"30"} required/>
        <TextField id="ethnicity" label="Ethnicity" variant="outlined" defaultValue={"Unknown"} required />
        <TextField id="height" label="Height" variant="outlined" defaultValue={"170"} required type="number" />
        <TextField id="weight" label="Weight" variant="outlined" defaultValue={"70"} required type="number" />
        <TextField id="gender" label="Gender" variant="outlined" defaultValue={"Male"} required />
        <TextField id="symptoms" label="Symptoms" variant="outlined" defaultValue={["bloody nose", "cough","fever"]} required multiline />
        </Stack>
      </FormControl>

      <AudioRecorder />
      
    </Stack>
  )
}

export default StepTwo