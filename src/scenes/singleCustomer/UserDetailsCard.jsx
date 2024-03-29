import { useTheme } from "@emotion/react";
import { Card, CardContent, Typography } from "@mui/material";
import React, { useState } from "react";

const UserDetailsCard = ({ id, name, email, cnicNumber, role, gender }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        maxWidth: 545,
        minWidth: 545,
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 28 }}
          color={theme.palette.secondary[400]}
          gutterBottom
        >
          User Details
        </Typography>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[400]}
          gutterBottom
        ></Typography>
        <Typography sx={{ mt: "1.5rem" }} color={theme.palette.secondary[400]}>
          Id: {id}
        </Typography>

        <Typography sx={{ mt: "1.5rem" }} color={theme.palette.secondary[400]}>
          Username: {name}
        </Typography>

        <Typography color={theme.palette.secondary[400]}>
          Email: {email}
        </Typography>

        <Typography color={theme.palette.secondary[400]}>
          Role: {role}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default UserDetailsCard;
