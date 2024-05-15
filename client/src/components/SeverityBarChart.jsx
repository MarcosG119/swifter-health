import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { Box, useTheme } from '@mui/material';

const SeverityBarChart = ({ patients }) => {
  const theme = useTheme();

  if(!patients){
    return null
  }


  const severityCounts = patients.reduce((counts, patient) => {
    const severity = patient.severity;
    if (!counts[severity]) {
      counts[severity] = 0;
    }
    counts[severity]++;
    return counts;
  }, {});

  const severityCountsArray = Object.keys(severityCounts).map(severity => ({
    _severity: severity,
    count: severityCounts[severity]
  }));

  console.log(severityCountsArray);

  return (
    <Box
      height="300px"
      width={undefined}
      minHeight="100px"
      minWidth="325px"
      position="relative"
    >
      <ResponsiveBar
        data={severityCountsArray}
        keys={[
            'count'
        ]}
        indexBy="_severity"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.15}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: theme.palette.secondary[200],
              },
            },
            legend: {
              text: {
                fill: theme.palette.secondary[200],
              },
            },
            ticks: {
              line: {
                stroke: theme.palette.secondary[200],
                strokeWidth: 1,
              },
              text: {
                fill: theme.palette.secondary[200],
              },
            },
          },
          legends: {
            text: {
              fill: theme.palette.secondary[200],
            },
          },
          tooltip: {
            container: {
              color: theme.palette.primary.main,
            },
          },
        }}
        colors={{ scheme: 'yellow_orange_red' }}
        colorBy="indexValue"
        borderWidth={2}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Severity Level',
            legendPosition: 'middle',
            legendOffset: 32,
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Number of Patients',
            legendPosition: 'middle',
            legendOffset: -40,
            truncateTickAt: 0
        }}
        enableLabel={false}
        labelSkipHeight={13}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        role="application"
        ariaLabel="Bar chart showing the number of patients in each severity level"
        barAriaLabel={e=>e.id+": "+e.formattedValue+" per severity level: "+e.indexValue}
    />
    </Box>
  )
}

export default SeverityBarChart