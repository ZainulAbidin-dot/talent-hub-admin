import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthToken, setPathName, setUserId } from "state";
import axios from "axios";
import { useState } from "react";
import { IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import { SettingsOutlined } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://pirayo.com/">
        Talent Hub
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl2, setAnchorEl2] = useState(null);
  const isOpen2 = Boolean(anchorEl2);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    await axios
      .post(`http://127.0.0.1:8000/api/v1/auth/login`, {
        email: data.get("email"),
        password: data.get("password"),
      })
      .then((res) => {
        alert(`Token ${res.data.data.accessToken}`);

        localStorage.setItem("fullName", "Admin");
        localStorage.setItem("roles", "admin");
        localStorage.setItem("baseUrl", "http://127.0.0.1:8000/api/v1");
        dispatch(setUserId(res.data.data.user.id));
        dispatch(setAuthToken(res.data.data.token));
        localStorage.setItem("token", res.data.data.accessToken);
        dispatch(setPathName("dashboard"));
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                // autoComplete="number"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                id="password"
                // autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
