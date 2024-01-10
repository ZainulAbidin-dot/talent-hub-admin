import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import SingleCustomer from "scenes/singleCustomer";
import Customers from "scenes/customers";
import Breakdown from "scenes/breakdown";
import Login from 'scenes/login';
import Test from 'scenes/tests';
import SingleTest from 'scenes/singleTest';
import Post from 'scenes/posts';
import SinglePost from 'scenes/singlePost';
import { setAuthToken } from 'state';

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/">
              <Route element={<GuestRoute />}>
                <Route path="/login" element={<Login />} />
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/companies" element={<Customers userType={"Companies"} roleForPage={"company"} />} />
                  <Route path="/jobseekers" element={<Customers userType={"Jobseekers"} roleForPage={"jobseeker"} />} />
                  <Route path="/single-customer/:id" element={<SingleCustomer />} />
                  <Route path="/jobs" element={<Test />} />
                  <Route path='/single-test/:id' element={<SingleTest />} />
                  <Route path="/posts" element={<Post />} />
                  <Route path='/single-post/:id' element={<SinglePost />} />
                  <Route path="/breakdown" element={<Breakdown />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

function GuestRoute() {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.global.authToken);
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  const tokenFromLocalStorage = localStorage.getItem("token");
  if (tokenFromLocalStorage) {
    dispatch(setAuthToken(tokenFromLocalStorage));

    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}

function ProtectedRoute() {
  const dispatch = useDispatch()
  let token = useSelector((state) => state.global.authToken);
  if (!token) {
    token = localStorage.getItem("token");

    if (!token) {
      return <Navigate to="/login" replace />;
    }

    dispatch(setAuthToken(token));
  }

  return <Outlet />
}

export default App;
