import React, { useContext, useEffect } from 'react';
import { Context } from '../index';
import { FormControl, Stack, TextField, Typography } from '@mui/material';
import AudioRecorder from 'scenes/intake/components/AudioRecorder';


const StepTwo = () => {
  const [patientObj, setPatientObj] = useContext(Context);

  useEffect(() => {
    // Update the TextField values when patientObj changes
    updateTextFieldValues();
  }, [patientObj]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPatientObj((prev) => ({ ...prev, [id]: value }));
  };

  const updateTextFieldValues = () => {
    // Loop through each TextField and update its value from patientObj
    const textFields = document.querySelectorAll('input[type="text"], textarea, input[type="number"]');
    textFields.forEach((textField) => {
      const id = textField.id;
      if (id && patientObj[id]) {
        textField.value = patientObj[id];
      }
    });
  };

  return (
    
    <Stack spacing={2}>
      <Typography variant="h4">Confirm your information below. If you wish to speak again, use the record button below.</Typography>
      <FormControl>
        <Stack spacing={2}>
        <TextField id="Name" label="Name" variant="outlined" defaultValue={patientObj.Name} onChange={handleChange} required/>
        <TextField id="Age" label="Age" variant="outlined" defaultValue={patientObj.Age} onChange={handleChange} required/>
        <TextField id="Ethnicity" label="Ethnicity" variant="outlined" defaultValue={patientObj.Ethnicity} onChange={handleChange} required />
        <TextField id="Height" label="Height" variant="outlined" defaultValue={patientObj.Height} onChange={handleChange} required type="number" />
        <TextField id="Weight" label="Weight" variant="outlined" defaultValue={patientObj.Weight} onChange={handleChange} type="number" required />
        <TextField id="Gender" label="Gender" variant="outlined" defaultValue={patientObj.Gender} onChange={handleChange} required />
        <TextField id="Symptoms" label="Symptoms" variant="outlined" defaultValue={patientObj.Symptoms} onChange={handleChange} required multiline />
        </Stack>
      </FormControl>
      <AudioRecorder />
      
    </Stack>
  )
}

export default StepTwo