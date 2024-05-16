import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  Traffic,
  Person,
  AirlineSeatFlat,
  HourglassBottom,
} from "@mui/icons-material";
import {
  Box,
  useTheme,
  useMediaQuery,
  Typography
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
// import OverviewChart from "components/OverviewChart";
// import { useGetDashboardQuery } from "state/api";
import { useGetPatientsQuery } from "state/api";
import SeverityBarChart from "components/SeverityBarChart";
import StatBox from "components/StatBox";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetPatientsQuery();
  console.log(isLoading)
  //console.log(patientData);

  const columns = [
    {
      field: "_id",
      headerName: "Patient Id",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "age",
      headerName: "Age",
      flex: 0.3,
    },
    {
      field:"weight",
      headerName:"Weight",
      flex: 0.3,
    },
    {
      field: "severity",
      headerName: "Severity Level",
      flex: 0.4,
    },
    {
      field: "symptoms",
      headerName: "Symptoms",
      flex: 1,
    },
    {
      field: "tests",
      headerName: "Suggested Tests",
      flex: 1,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Total Patients Today"
          //value={data && data.totalCustomers}
          value={data ? data.length : 0}
          subValue="12 in the past hour"
          //description="Since last month"
          icon={
            <Person
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Beds Available"
          //value={data && data.todayStats.totalSales}
          value={102}
          subValue="out of 400 total beds"
          //description="total beds"
          icon={
            <AirlineSeatFlat
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <Typography 
            color={theme.palette.secondary[100]}
            variant="h6"
          >
            # of Patients Waiting by Severity
          </Typography>
          {/* We want to put a bar chart here visually displaying severity */}
          {data ? <SeverityBarChart patients={data} /> : <>Loading...</>}
        </Box>
        <StatBox
          title="Average Wait Time"
          //value={data && data.thisMonthStats.totalSales}
          value="1h 15m"
          subValue="Longest: 3h 45m"
          // description="Since last month"
          icon={
            <HourglassBottom
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Patients in Queue"
          //value={data && data.yearlySalesTotal}
          value={52}
          subValue="5 New Arrivals"
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        {/* ROW 2 */}
        <Box
          gridColumn="span 12"
          gridRow="span 4"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={(data) || []}
            columns={columns}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
