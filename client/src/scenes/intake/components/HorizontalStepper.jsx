import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import { useSendPatientDataMutation } from 'state/api';
import { useTheme } from "@mui/material/styles";
import React, { useContext, useEffect } from 'react';
import { Context } from '../index';

const steps = ['Take in patient information', 'Confirm patient information'];

export default function HorizontalLinearStepper() {
  const theme = useTheme();
  const [sendPatientData] = useSendPatientDataMutation();
  const [patientObj, setPatientObj] = useContext(Context);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  useEffect(() => {}, [patientObj]);
  const isStepOptional = (step) => {
    return false;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleFinish = async () => {
    try {
      await sendPatientData(patientObj);
      handleNext();
      setPatientObj({});
    } catch (err) {
      console.error('Error sending patient data.', err);
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box 
      sx={{ width: '50%', 
            margin: "auto",
            padding: "1rem",
      }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography variant="h4" sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished. Thank you for your information. We'll be with you as soon as we can.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button 
              onClick={handleReset}
              sx={{ 
                mr: 1, 
                color: theme.palette.secondary.main,
              }}
            >
              Reset
            </Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {activeStep === 0 && <StepOne />}
          {activeStep === 1 && <StepTwo />}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ 
                mr: 1, 
                color: theme.palette.secondary.main,
              }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            
              {activeStep === steps.length - 1 ? 
              <Button 
                disabled={!patientObj.Name}
                onClick={handleFinish}
                sx={{ 
                  mr: 1, 
                  color: theme.palette.secondary.main,
                }}
              >
                Finish
              </Button> : 
                <Button 
                  onClick={handleNext}
                  sx={{ 
                    mr: 1, 
                    color: theme.palette.secondary.main,
                  }}
                >
                  Next
                </Button>}
            
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}