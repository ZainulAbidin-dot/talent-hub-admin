import React, { useState } from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/OverviewChart";
import {
  useGetCustomersQuery,
  useGetDashboardQuery,
  useGetRapidRidesQuery,
  useGetReportsQuery,
  useGetSharedRidesQuery,
} from "state/api";
import StatBox from "components/StatBox";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const { data: customers, isLoading: isLoadingCustomers } =
    useGetCustomersQuery("jobseeker");

  const { data: company, isLoading: isLoadingCompany } =
    useGetCustomersQuery("company");

  const columns = [
    {
      field: "profilePic",
      headerName: "Profile Pic",
      flex: 0.5,
      renderCell: (params) => {
        return (
          <>
            <Avatar src={params.value} />
          </>
        );
      },
    },
    {
      field: "_id",
      headerName: "ID",
      flex: 0.5,
      editable: true,
    },
    {
      field: "username",
      headerName: "Username",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.5,
    },
  ];

  let customersData =
    customers?.data?.map((element) => ({
      ...element,
      _id: element.id,
    })) || [];

  const totalJobseeker = customers?.data?.length;
  const totalCompany = company?.data?.length;
  const totalRapidRides = 10;
  const totalSharedRides = 10;
  const totalReports = 20;
  let totalRapidRidesFare = 100;
  let totalSharedRidesFare = 200;

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      {customersData.length > 0 &&
      totalJobseeker != null &&
      totalRapidRides != null &&
      totalSharedRides != null &&
      totalReports != null &&
      totalRapidRidesFare != null &&
      totalSharedRidesFare != null ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="160px"
          gap="20px"
          sx={{
            "& > div": {
              gridColumn: isNonMediumScreens ? undefined : "span 12",
            },
          }}
        >
          {/* ROW 1 */}
          <StatBox
            title="Total Jobseekers"
            value={customers && totalJobseeker}
            increase="+14%"
            description="Since last month"
            icon={
              <PersonAdd
                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
              />
            }
          />
          <StatBox
            title="Total Companies"
            value={company && totalCompany}
            increase="+21%"
            description="Since last month"
            icon={
              <PersonAdd
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
            <OverviewChart view="sales" isDashboard={true} />
          </Box>

          <StatBox
            title="Total Jobs"
            value={totalSharedRides}
            increase="+43%"
            description="Since last month"
            icon={
              <AdminPanelSettingsOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
              />
            }
          />

          <StatBox
            title="Total Posts"
            value={totalRapidRides}
            increase="+5%"
            description="Since last month"
            icon={
              <TrendingUpOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
              />
            }
          />
          {/* ROW 2 */}
          <Box
            gridColumn="span 8"
            gridRow="span 3"
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
              loading={
                isLoadingCustomers ||
                customersData === undefined ||
                customersData.length === 0
              }
              getRowId={(row) => row._id}
              rows={customersData || []}
              columns={columns}
            />
          </Box>
          <Box
            gridColumn="span 4"
            gridRow="span 3"
            backgroundColor={theme.palette.background.alt}
            p="1.5rem"
            borderRadius="0.55rem"
          >
            <Typography
              variant="h6"
              sx={{ color: theme.palette.secondary[100] }}
            >
              Sales Overview
            </Typography>
            <BreakdownChart
              totalRapidRidesFare={totalCompany}
              totalSharedRidesFare={totalJobseeker}
              isDashboard={true}
            />
            <Typography
              p="0 0.6rem"
              fontSize="0.8rem"
              sx={{ color: theme.palette.secondary[200] }}
            >
              Breakdown of Jobseekers and Companies in total.
            </Typography>
          </Box>
        </Box>
      ) : (
        <>Loading ... </>
      )}
    </Box>
  );
};

export default Dashboard;
