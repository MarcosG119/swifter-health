import { Button, useTheme } from '@mui/material';
import React, { useEffect, useContext } from 'react';
import { useCreatePatientDataMutation } from 'state/api';
import { Context } from '../index';
import { useAudioRecorder } from 'react-audio-voice-recorder';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

const AudioRecorder = () => {
  const theme = useTheme();
  const [patientObj, setPatientObj] = useContext(Context);
  const [createPatientData] = useCreatePatientDataMutation();
  const recorderControls = useAudioRecorder();

  useEffect(() => {
    if (!recorderControls.recordingBlob) {
      console.log('No recording blob available.');
      return;
    }

    handleStopRecording();

  }, [recorderControls.recordingBlob]);

  const handleStopRecording = async () => {
    console.log('Recording stopped.', recorderControls.recordingBlob);
    await handleCreatePatientData(recorderControls.recordingBlob);
  };

  const handleCreatePatientData = async (blob) => {
    if (!blob) {
      console.error('No audio blob available.');
      return;
    }

    const formData = new FormData();
    formData.append('wavfile', blob, 'recording.wav');

    try {
      const response = await createPatientData(formData);
      if(response && response.data){
        setPatientObj(response.data);
        console.log(patientObj)
      } else {
        console.error('No response data available.')
      }
    } catch (err) {
      console.error('Error creating patient data.', err);
    }
  }

  return (
    <div>
      {/* <VoiceRecorder
        onRecordingComplete={(blob) => handleStopRecording(blob)}
        stopRecording={handleStopRecording}
      /> */}
      <Button 
        onClick={recorderControls.isRecording ? recorderControls.stopRecording : recorderControls.startRecording}
        sx={{
          backgroundColor: theme.palette.secondary.light,
          color: theme.palette.background.alt,
          fontSize: "14px",
          '&:hover': {
            backgroundColor: theme.palette.secondary[500],
            color: '#3c52b2',
          }
        }}
      > 
      <KeyboardVoiceIcon sx={{
          fontSize: "14px",
      }}
      />
        {recorderControls.isRecording ? ' Stop Recording' : ' Start Recording'} 
      </Button>
    </div>
  );
};

export default AudioRecorder;
