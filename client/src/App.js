import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Reviews from "scenes/reviews";
import SingleCustomer from "scenes/singleCustomer";
import Customers from "scenes/customers";
import Transactions from "scenes/transactions";
import LiveRides from "scenes/liveRides";
import Overview from "scenes/overview";
import Daily from "scenes/daily";
import Monthly from "scenes/monthly";
import Breakdown from "scenes/breakdown";
import SharedRides from "scenes/sharedRides";
import RapidRides from "scenes/rapidRides";
import SingleRide from 'scenes/singleRide';

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/drivers" element={<Customers userType={"Drivers"} role={"driver"} />} />
              <Route path="/passengers" element={<Customers userType={"Passengers"} role={"passenger"} />} />
              <Route path="/single-customer/:id" element={<SingleCustomer />} />
              <Route path="/single-ride/:id" element={<SingleRide />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/live-rides" element={<LiveRides />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/breakdown" element={<Breakdown />} />
              <Route path="/shared-rides" element={<SharedRides />} />
              <Route path="/rapid-rides" element={<RapidRides />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
